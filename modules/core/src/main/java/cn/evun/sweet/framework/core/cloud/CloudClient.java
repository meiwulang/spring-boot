package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/12/5.
 */


import cn.evun.sweet.framework.common.serialize.SerializeException;
import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.cfg.ConfigMetadata;
import cn.evun.sweet.framework.core.cloud.common.model.JointInfo;
import cn.evun.sweet.framework.core.cloud.common.model.JointRequest;
import cn.evun.sweet.framework.core.cloud.common.model.JointResponse;
import cn.evun.sweet.framework.core.cloud.common.model.message.APMLogMessage;
import cn.evun.sweet.framework.core.cloud.common.model.message.RequestTraceLogMessage;
import cn.evun.sweet.framework.core.cloud.lookup.AbstractClientSideServiceLookup;
import cn.evun.sweet.framework.core.cloud.lookup.CloudServiceLookup;
import cn.evun.sweet.framework.core.cloud.lookup.WeightRandomClientSideServiceLookup;
import cn.evun.sweet.framework.core.cloud.resource.CloudResource;
import cn.evun.sweet.framework.core.cloud.resource.CloudResourceScanner;
import cn.evun.sweet.framework.core.monitor.ApplicationPerformanceMetrics;
import org.apache.zookeeper.*;
import org.apache.zookeeper.data.ACL;
import org.apache.zookeeper.data.Id;
import org.apache.zookeeper.data.Stat;
import org.apache.zookeeper.server.auth.DigestAuthenticationProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JsonMessageConverter;
import org.springframework.context.ApplicationContext;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

import static cn.evun.sweet.framework.core.cloud.common.CloudZNodePattern.*;

public class CloudClient {
    private static final Logger logger = LoggerFactory.getLogger(CloudClient.class);

    private static JSONSerializer jsonSerializer = new JSONSerializer();

    private static final int ZOOKEEPER_TIMEOUT = 10000;

    private CloudApplication cloudApplication;

    private CloudResourceScanner cloudResourceRegister;

    private CloudZKAccessor cloudZKAccessor;

    private CloudLogMQAccessor cloudLogMQAccessor;

    private JointInfo cloudJointInfo;

    private CloudServiceLookup cloudServiceLookup;

    private int exportedResourceNums = 0;

    //正在同步服务状态
    private boolean syncingRealms = false;

    public CloudClient(CloudApplication cloudApplication) {
        this.cloudApplication = cloudApplication;
        this.cloudResourceRegister = new CloudResourceScanner();
        this.cloudZKAccessor = new CloudZKAccessor();
        this.cloudLogMQAccessor = new CloudLogMQAccessor();
    }

    public void connect() {
        connect2CloudJoint();
        this.createCloudServiceLookup();
        this.cloudZKAccessor.initialize();
        if (this.cloudJointInfo.isMqLogEnabled()) {
            this.cloudLogMQAccessor.initialize();
        }
        startSyncRealmThread();
    }

    private void startSyncRealmThread() {
        new Thread(new SyncServicesStateTask()).start();
    }

    private void syncRealms() {
        if (this.cloudServiceLookup instanceof AbstractClientSideServiceLookup) {
            if (this.syncingRealms) {
                return;
            }
            this.syncingRealms = true;
            try {
                long start = System.currentTimeMillis();
                logger.debug("正在同步云服务状态...");
                List<ApplicationInfo> cloudApplicationInstances = this.cloudZKAccessor.getRunningApplicationInstances();
                ((AbstractClientSideServiceLookup) cloudServiceLookup).setServices(cloudApplicationInstances);
                if (this.cloudServiceLookup instanceof WeightRandomClientSideServiceLookup) {
                    //从ZK读取所有云服务权重信息并设置到WeightRandomClientSideServiceLookup
                    ((WeightRandomClientSideServiceLookup) (this.cloudServiceLookup)).setApplicationWeights(this.cloudZKAccessor.getRunningApplicationInstancesLBWeights());
                }
                if (logger.isDebugEnabled()) {
                    StringBuffer sb = new StringBuffer("\n云服务列表:\n");
                    for (ApplicationInfo app : cloudApplicationInstances) {
                        sb.append("==>").append(app.toString(true)).append("\n");
                    }
                    logger.debug(sb.toString());
                }
                logger.info("同步云服务状态成功, 耗时[" + (System.currentTimeMillis() - start) + "]毫秒");
            } finally {
                this.syncingRealms = false;
            }
        }
    }

    //TODO 根据云配置(JointInfo),实现不同的服务查找模式
    private void createCloudServiceLookup() {
        this.cloudServiceLookup = new WeightRandomClientSideServiceLookup();
        if (this.cloudServiceLookup instanceof AbstractClientSideServiceLookup) {
            ((AbstractClientSideServiceLookup) this.cloudServiceLookup).setApplicationInfo(cloudApplication);
        }
    }

    public CloudServiceLookup getCloudServiceLookup() {
        return cloudServiceLookup;
    }

    private void connect2CloudJoint() {
        //TODO 从Joint Url获取Zookeeper的访问地址和网关地址pattern
        RestTemplate restTemplate = new RestTemplate();
        try {
            JointResponse jointResponse = restTemplate.postForObject(cloudApplication.getCloudJointUrl(), new JointRequest(cloudApplication).toRestTemplateParameters(), JointResponse.class);
            if (jointResponse.isSuccess()) {
                cloudJointInfo = jointResponse.getData();
                logger.info("连接到Sweet云[" + cloudApplication.getCloudJointUrl() + "]成功");
            } else {
                throw new Exception(jointResponse.getMessage());
            }
        } catch (Exception e) {
            throw new CloudException("连接到Sweet云失败, 原因: " + e.getMessage(), e);
        }
    }

    public String getCloudGatewayUrl() {
        return this.cloudJointInfo.getGatewayUrl();
    }

    public Properties getApplicationConfiguration() {
        Properties sharedConfiguration = null;
        Properties zkConfiguration = cloudZKAccessor.readInstanceConfiguration();
        if (cloudJointInfo != null) {
            sharedConfiguration = cloudJointInfo.getCloudSharedConfigurations();
            if (sharedConfiguration != null && sharedConfiguration.keySet().size() > 0) {
                SortedMap<String, String> props = new TreeMap<>();
                Set<Object> configItems = sharedConfiguration.keySet();
                StringBuffer sb = new StringBuffer("=====================平台共享配置=====================\n");
                for (Object s : configItems) {
                    props.put(s.toString(), sharedConfiguration.getProperty(s.toString()));
                }
                Set<String> sortedConfigItems = props.keySet();
                for (Object s : sortedConfigItems) {
                    sb.append(s.toString()).append("=").append(sharedConfiguration.getProperty(s.toString())).append("\n");
                }
                logger.info(sb.toString());
                return mergeProperties(sharedConfiguration, zkConfiguration);   //Zookeeper的优先级要高于平台共享配置
            }
        }
        return zkConfiguration;
    }

    private Properties mergeProperties(Properties src, Properties overwrite) {
        Properties ret = new Properties();
        if (src != null) {
            Enumeration keyEnum = src.keys();
            while (keyEnum.hasMoreElements()) {
                String key = keyEnum.nextElement().toString();
                ret.put(key, src.getProperty(key));
            }
        }

        if (overwrite != null) {
            Enumeration keyEnum = overwrite.keys();
            while (keyEnum.hasMoreElements()) {
                String key = keyEnum.nextElement().toString();
                if (ret.containsKey(key)) {
                    logger.warn("平台共享配置项[" + key + "]已被Zookeeper配置项覆盖, 实际值为[" + overwrite.getProperty(key) + "]");
                }
                ret.put(key, overwrite.getProperty(key));
            }
        }

        return ret;
    }

    public void registerApplication() {
        this.cloudApplication.setState(CloudApplication.State.Starting);
        logger.info("正在注册应用[" + this.cloudApplication.toString() + "], 服务状态已变更为[" + CloudApplication.State.Starting + "]状态");
        cloudZKAccessor.writeInstanceState(this.cloudApplication);
    }

    public void registerApplicationResources(ApplicationContext applicationContext) {
        List<CloudResource> cloudResources = this.cloudResourceRegister.scan(applicationContext);
        exportedResourceNums = cloudResources.size();
        if (exportedResourceNums > 0) {
            cloudZKAccessor.writeInstanceResources(cloudResources);
        } else {
            logger.info("云应用" + this.cloudApplication.toString(true) + "没有暴露任何服务接口");
        }
    }

    public void reportApplicationConfigurationMetadata() {
        cloudZKAccessor.writeInstanceConfigurationMetadata(cloudApplication.getConfigMetadataMap());
    }

    public void activateApplication() {
        cloudZKAccessor.writeInstanceInformation();
        cloudZKAccessor.writeApplicationDependencies();
        this.cloudApplication.setState(CloudApplication.State.Running);
        logger.info("应用[" + this.cloudApplication.toString() + "]服务状态已变更为[" + CloudApplication.State.Running + "]状态");
        cloudZKAccessor.writeInstanceState(this.cloudApplication);
    }

    public void passivateApplication() {
        this.cloudApplication.setState(CloudApplication.State.Halt);
        logger.info("应用[" + this.cloudApplication.toString() + "]服务状态已变更为[" + CloudApplication.State.Halt + "]状态");
        cloudZKAccessor.writeInstanceState(this.cloudApplication);
    }

    public void writeApplicationPerformanceMetrics() {
        cloudZKAccessor.writeApplicationPerformance(this.cloudApplication.getApplicationPerformanceMetrics());
    }

    public void writeApplicationPerformanceMetricsLog() {
        logger.debug("写入云端APM监控队列 ");
        APMLogMessage apmLogMessage = new APMLogMessage(this.cloudApplication);
        if (this.cloudJointInfo.isMqLogEnabled()) {
            cloudLogMQAccessor.writeAPMLog(apmLogMessage);
        } else {
            try {
                logger.info("APM Log -> " + jsonSerializer.serialize2JSON(apmLogMessage));
            } catch (SerializeException e) {
                logger.error(e.getMessage(), e);
            }
        }
    }

    private class CloudZKAccessor {
        private ZooKeeper zooKeeper;

        private String instanceConfigurationMetadataPath;

        private String instanceConfigurationPath;

        private String instanceGlobalResourcePath;

        private String instanceSystemResourcePath;

        private String instanceInformationPath;

        private String instanceStatePath;

        private String applicationCurrentConfigurationPath;

        private String applicationAllConfigurationPath;

        private String instancePerformancePath;

        private String instanceDependenciesPath;

        CloudZKAccessor() {
            instanceConfigurationMetadataPath = applyCurrentApplicationInfo(ZNODE_INSTANCE_CONFIGURATION_METADATA);
            instanceConfigurationPath = applyCurrentApplicationInfo(ZNODE_INSTANCE_CONFIGURATION);
            instanceGlobalResourcePath = applyCurrentApplicationInfo(ZNODE_INSTANCE_CLOUD_RESOURCES_GLOBAL);
            instanceSystemResourcePath = applyCurrentApplicationInfo(ZNODE_INSTANCE_CLOUD_RESOURCES_SYSTEM);
            instanceInformationPath = applyCurrentApplicationInfo(ZNODE_INSTANCE_INFORMATION);
            instanceStatePath = applyCurrentApplicationInfo(ZNODE_INSTANCE_STATE);
            applicationCurrentConfigurationPath = applyCurrentApplicationInfo(ZNODE_APPLICATION_CONFIGURATION_CURRENT_VERSION);
            applicationAllConfigurationPath = applyCurrentApplicationInfo(ZNODE_APPLICATION_CONFIGURATION_ALL_VERSIONS);
            instancePerformancePath = applyCurrentApplicationInfo(ZNODE_INSTANCE_PERFORMANCE);
            instanceDependenciesPath = applyCurrentApplicationInfo(ZNODE_INSTANCE_DEPENDENCIES);
        }

        private void initialize() {
            try {
                this.zooKeeper = new ZooKeeper(cloudJointInfo.getZk().getZkConnectionString(), ZOOKEEPER_TIMEOUT, new ZKWatcher());
                this.zooKeeper.addAuthInfo("digest", cloudJointInfo.getZk().getZkDigestAuthString().getBytes());
            } catch (IOException e) {
                throw new CloudException("连接到云端服务中心失败, 请与云管理员联系");
            }
        }

        private void destroyConnection() {
            try {
                this.zooKeeper.close();
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
            } finally {
                this.zooKeeper = null;
                logger.info("云平台连接已关闭");
            }
        }

        List<ApplicationInfo> getRunningApplicationInstances() {
            List<String> apps = null;
            try {
                apps = this.getZooKeeper().getChildren(ZNODE_REALMS, true);
            } catch (KeeperException.NoNodeException e) {
                ;//handled
                return new ArrayList<>();
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
            List<ApplicationInfo> applicationInfos = new ArrayList<>();
            for (String app : apps) {
                if (app.equals(cloudApplication.getAppName())) {
                    //找到自身是没有意义的
                    continue;
                }
                try {
                    List<String> appInstances = this.getZooKeeper().getChildren(ZNODE_REALMS + "/" + app, true);
                    for (String appInstance : appInstances) {
                        try {
                            byte[] data = this.getZooKeeper().getData(ZNODE_REALMS + "/" + app + "/" + appInstance, true, null);
                            if (data != null) {
                                CloudApplication cloudApplication = jsonSerializer.deserialize(data, CloudApplication.class);
                                if (cloudApplication.getState().equals(CloudApplication.State.Running)) {
                                    applicationInfos.add(cloudApplication);
                                }
                            }
                        } catch (Exception e) {
                            logger.error("Read application instance realm data error -> " + e.getMessage());
                        }
                    }
                } catch (KeeperException.NoNodeException e) {
                    ; //handled
                } catch (Exception e) {
                    throw new CloudException(e.getMessage(), e);
                }
            }
            return applicationInfos;
        }

        Map<String, Integer> getRunningApplicationInstancesLBWeights() {
            Map<String, Integer> ret = new HashMap<>();
            List<String> apps = null;
            try {
                apps = this.getZooKeeper().getChildren(ZNODE_REALMS, true);
            } catch (KeeperException.NoNodeException e) {
                ;//handled
                return ret;
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
            for (String app : apps) {
                if (app.equals(cloudApplication.getAppName())) {
                    //找到自身是没有意义的
                    continue;
                }
                try {
                    List<String> appInstances = this.getZooKeeper().getChildren(ZNODE_REALMS + "/" + app, true);
                    for (String appInstance : appInstances) {
                        try {
                            byte[] data = this.getZooKeeper().getData(ZNODE_REALMS + "/" + app + "/" + appInstance + "/runtime-data", true, null);
                            if (data != null) {
                                CloudApplicationRuntimeData runtimeData = jsonSerializer.deserialize(data, CloudApplicationRuntimeData.class);
                                ret.put(ApplicationInfo.getIdentifier(app, appInstance), runtimeData.getLoadBalanceWeight());
                            }
                        } catch (KeeperException.NoNodeException e) {
                            ; //handled
                        } catch (Exception e) {
                            logger.error("Read application instance realm data error -> " + e.getMessage());
                        }
                    }
                } catch (KeeperException.NoNodeException e) {
                    ; //handled
                } catch (Exception e) {
                    throw new CloudException(e.getMessage(), e);
                }
            }
            return ret;
        }

        private String applyCurrentApplicationInfo(String pattern) {
            return pattern.replaceAll("\\$\\{appName\\}", CloudClient.this.cloudApplication.getAppName())
                    .replaceAll("\\$\\{appId\\}", CloudClient.this.cloudApplication.getAppId())
                    .replaceAll("\\$\\{appVersion\\}", CloudClient.this.cloudApplication.getAppVersion());
        }

        private List<ACL> createACL() throws Exception {
            List<ACL> acls = new ArrayList<>();

            Id id = new Id("digest", DigestAuthenticationProvider.generateDigest(cloudJointInfo.getZk().getZkDigestAuthString()));
            ACL acl = new ACL(ZooDefs.Perms.ALL, id);

            acls.add(acl);
            return acls;
        }

        private List<ACL> createSharedReadACL() throws Exception {
            List<ACL> acls = createACL();
            acls.addAll(ZooDefs.Ids.READ_ACL_UNSAFE);
            return acls;
        }

        void writeInstanceConfigurationMetadata(Map<String, ConfigMetadata> configMetadataMap) {
            try {
                byte[] data = jsonSerializer.serialize(configMetadataMap);
                doWrite(instanceConfigurationMetadataPath, data, createACL(), CreateMode.PERSISTENT);
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
        }

        void writeInstanceInformation() {
            try {
                byte[] data = jsonSerializer.serialize(cloudApplication);
                doWrite(instanceInformationPath, data, createACL(), CreateMode.PERSISTENT);
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
        }

        void writeInstanceResources(List<CloudResource> cloudResources) {
            //区分Global和System两种不同的resource
            List<CloudResource> globalResources = new ArrayList<>();
            List<CloudResource> systemResources = new ArrayList<>();
            for (CloudResource cloudResource : cloudResources) {
                if (cloudResource.getScope() == CloudResource.Scope.Global) {
                    globalResources.add(cloudResource);
                } else if (cloudResource.getScope() == CloudResource.Scope.Group) {
                    systemResources.add(cloudResource);
                }
            }
            try {
                byte[] data = jsonSerializer.serialize(systemResources);
                doWrite(instanceSystemResourcePath, data, createACL(), CreateMode.PERSISTENT);

                data = jsonSerializer.serialize(globalResources);
                doWrite(instanceGlobalResourcePath, data, createACL(), CreateMode.PERSISTENT);
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
        }

        void writeInstanceState(CloudApplication cloudApplication) {
            if (exportedResourceNums == 0) {
                return;
            }
            logger.info("正在向云平台写入应用状态...");
            try {
                byte[] data = jsonSerializer.serialize(cloudApplication);
                doWrite(instanceStatePath, data, createSharedReadACL(), CreateMode.EPHEMERAL);
                logger.info("向云平台写入应用状态成功");
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
        }

        Properties readInstanceConfiguration() {
            Properties configuration = new Properties();
            try {
                byte[] data = null;
                //先读取应用“”最匹配”版本的配置
                try {
                    data = this.getZooKeeper().getData(applicationCurrentConfigurationPath, false, null);
                } catch (KeeperException.NoNodeException e) {
                    //NoNodeException is handled
                    ;
                }
                if (data == null) {
                    logger.info("云端没有找到应用[" + cloudApplication.getAppName() + "]完全匹配的配置版本[" + cloudApplication.getAppVersion() + "], 正在查询云端兼容版本");
                    //查询最匹配版本
                    String matchedVersion = findMatchedConfigurationForVersion(cloudApplication.getAppVersion());
                    if (matchedVersion == null) {
                        logger.warn("云端没有找到应用[" + cloudApplication.getAppName() + "][" + cloudApplication.getAppVersion() + "]兼容的配置版本");
                    } else {
                        logger.info("云端找到应用[" + cloudApplication.getAppName() + "][" + cloudApplication.getAppVersion() + "]兼容的配置版本[" + matchedVersion + "]");
                        data = this.getZooKeeper().getData(applicationAllConfigurationPath + "/" + matchedVersion, false, null);
                    }
                }
                if (data != null) {
                    Properties appVersionConfiguration = jsonSerializer.deserialize(data, Properties.class);
                    mergeConfiguration(configuration, appVersionConfiguration);
                }
                //再读取实例特殊配置
                try {
                    data = this.getZooKeeper().getData(instanceConfigurationPath, false, null);
                } catch (KeeperException.NoNodeException e) {
                    //NoNodeException is handled
                    ;
                }
                if (data != null) {
                    Properties instanceConfiguration = jsonSerializer.deserialize(data, Properties.class);
                    mergeConfiguration(configuration, instanceConfiguration);
                }
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
            return configuration;
        }

        //合并Properties, 用src覆盖target
        void mergeConfiguration(Properties target, Properties src) {
            Set<Object> keys = src.keySet();
            for (Object key : keys) {
                target.put(key, src.get(key));
            }
        }

        String findMatchedConfigurationForVersion(String version) throws Exception {
            List<String> versions = null;
            try {
                versions = this.getZooKeeper().getChildren(applicationAllConfigurationPath, false);
            } catch (KeeperException.NoNodeException e) {
                //handled
                ;
                return null;
            }
            versions.add(version);
            //排完序后, 版本号是从小到大的
            Collections.sort(versions, new Comparator<String>() {
                @Override
                public int compare(String o1, String o2) {
                    int idx = o1.indexOf("-");      //trim -SNAPSHOT, -RELEASE等版本后缀
                    if (idx > 0) {
                        o1 = o1.substring(0, idx);
                    }
                    idx = o2.indexOf("-1");
                    if (idx > 0) {
                        o2 = o2.substring(0, idx);
                    }
                    int major1, minor1, patch1;
                    int major2, minor2, patch2;
                    String[] s1 = o1.split(".");
                    String[] s2 = o2.split(".");
                    String[] temp1 = new String[3];
                    String[] temp2 = new String[3];
                    temp1[0] = s1[0];
                    temp1[1] = (s1.length > 1) ? s1[1] : "0";
                    temp1[2] = (s1.length > 2) ? s1[2] : "0";

                    temp2[0] = s2[0];
                    temp2[1] = (s2.length > 1) ? s2[1] : "0";
                    temp2[2] = (s2.length > 2) ? s2[2] : "0";

                    major1 = Integer.parseInt(temp1[0]);
                    minor1 = Integer.parseInt(temp1[1]);
                    patch1 = Integer.parseInt(temp1[2]);

                    major2 = Integer.parseInt(temp2[0]);
                    minor2 = Integer.parseInt(temp2[1]);
                    patch2 = Integer.parseInt(temp2[2]);

                    return (major1 * 100 + minor1 * 10 + patch1) - (major2 * 100 + minor2 * 10 + patch2);
                }
            });
            int idx = versions.indexOf(version);
            if (idx > 0) {
                return versions.get(idx - 1);
            }
            return null;
        }

        void writeApplicationPerformance(ApplicationPerformanceMetrics applicationPerformanceMetrics) {
            try {
                byte[] data = jsonSerializer.serialize(applicationPerformanceMetrics);
                doWrite(instancePerformancePath, data, createACL(), CreateMode.EPHEMERAL);
            } catch (Exception e) {
                logger.error("写入应用APM信息失败 -> " + e.getMessage());
            }
        }

        void writeApplicationDependencies() {
            try {
                byte[] data = jsonSerializer.serialize(cloudApplication.getCloudServiceReferences());
                doWrite(instanceDependenciesPath, data, createACL(), CreateMode.PERSISTENT);
            } catch (Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
        }

        void doWrite(String path, byte[] data, List<ACL> acls, CreateMode createMode) throws Exception {
            boolean exists = true;
            try {
                Stat stat = this.getZooKeeper().exists(path, false);
                if (stat == null) {
                    exists = false;
                }
            } catch (KeeperException.NoNodeException e) {
                exists = false;
            } catch (InterruptedException e) {
                throw e;
            }

            if (exists) {
                //-1 means any version
                this.getZooKeeper().setData(path, data, -1);
            } else {
                String[] parts = path.split("/");
                StringBuffer currentPath = new StringBuffer();
                for (int i = 0; i < parts.length - 1; i++) {
                    String part = parts[i];
                    if (StringUtils.hasText(part)) {
                        currentPath.append("/").append(part);
                        exists = true;
                        try {
                            Stat stat = this.getZooKeeper().exists(currentPath.toString(), false);
                            if (stat == null) {
                                exists = false;
                            }
                        } catch (KeeperException.NoNodeException e) {
                            exists = false;
                        }

                        if (!exists) {
                            //未找到节点, 自动创建
                            this.getZooKeeper().create(currentPath.toString(), new byte[0], acls, CreateMode.PERSISTENT);
                        }
                    }
                }
                this.getZooKeeper().create(path, data, acls, createMode);
            }
        }

        private ZooKeeper getZooKeeper() {
            if (!isZKAccessible()) {
                synchronized (CloudZKAccessor.class) {
                    if (!(isZKAccessible())) {
                        logger.info("正在重新连接到云平台...");
                        initialize();
                        syncRealms();
                        logger.info("重新连接到云平台成功");
                    }
                }
            }
            return this.zooKeeper;
        }

        private boolean isZKAccessible() {
//            return this.zooKeeper != null && this.zooKeeper.getState().isConnected() && this.zooKeeper.getState().isAlive();
            return this.zooKeeper != null;
        }

        private class ZKWatcher implements Watcher {
            @Override
            public void process(WatchedEvent watchedEvent) {
                logger.info("ZooKeeper watched event -> " + watchedEvent.getType().name() + " => " + watchedEvent.getPath() + ", Zookeeper State -> " + watchedEvent.getState().name());
                if (watchedEvent.getPath() != null && watchedEvent.getPath().startsWith(ZNODE_REALMS)) {
                    syncRealms();
                } else if (watchedEvent.getState().equals(Event.KeeperState.SyncConnected)) {
                    cloudZKAccessor.writeInstanceState(cloudApplication);
                    syncRealms();
                } else if (watchedEvent.getState().equals(Event.KeeperState.Expired)) {
                    logger.info("Sweet云平台连接已丢失");
                    destroyConnection();
                }
            }
        }
    }

    private class CloudLogMQAccessor {
        private CachingConnectionFactory connectionFactory;

        private RabbitTemplate rabbitTemplate;

        private RabbitAdmin rabbitAdmin;

        void initialize() {
            connectionFactory = new CachingConnectionFactory();
            //connectionFactory.setHost(host);
            //connectionFactory.setPort(port);
            // This property overrides the host+port properties if not empty.
            connectionFactory.setAddresses(cloudJointInfo.getMq().getConnectionString());
            connectionFactory.setUsername(cloudJointInfo.getMq().getUser());
            connectionFactory.setPassword(cloudJointInfo.getMq().getPassword());
            rabbitTemplate = new RabbitTemplate(connectionFactory);
            rabbitAdmin = new RabbitAdmin(connectionFactory);
            rabbitTemplate.setMessageConverter(new JsonMessageConverter());

            //定义Exchange
            String traceLogQueueName = cloudJointInfo.getMq().getTraceLogQueueName();
            declareExchangeAndQueue(traceLogQueueName, CloudLogMQExchangeType.DIRECT, traceLogQueueName, traceLogQueueName);
            String apmLogQueueName = cloudJointInfo.getMq().getApmLogQueueName();
            declareExchangeAndQueue(apmLogQueueName, CloudLogMQExchangeType.DIRECT, apmLogQueueName, apmLogQueueName);
        }

        void writeRequestTraceLog(RequestTraceLogMessage traceLogMessage) {
            try {
                rabbitTemplate.convertAndSend(cloudJointInfo.getMq().getTraceLogQueueName(), cloudJointInfo.getMq().getTraceLogQueueName(), traceLogMessage);
            } catch (Exception e) {
                logger.error("写入请求跟踪日志失败", e.getMessage());
            }
        }

        void writeAPMLog(APMLogMessage apmLogMessage) {
            try {
                rabbitTemplate.convertAndSend(cloudJointInfo.getMq().getApmLogQueueName(), cloudJointInfo.getMq().getApmLogQueueName(), apmLogMessage);
            } catch (Exception e) {
                logger.error("写入APM日志失败", e.getMessage());
            }
        }

        private void declareExchangeAndQueue(String exchangeName, CloudLogMQExchangeType CloudLogMQExchangeType, String routingKey,
                                             String... queueNames) {
            if (queueNames != null && queueNames.length > 0) {
                for (String queueName : queueNames) {
                    org.springframework.amqp.core.Queue queue = new org.springframework.amqp.core.Queue(queueName);
                    queue.setAdminsThatShouldDeclare(rabbitAdmin);
                    rabbitAdmin.declareQueue(queue);

                    switch (CloudLogMQExchangeType) {
                        case TOPIC:
                            TopicExchange topicExchange = new TopicExchange(exchangeName);
                            rabbitAdmin.declareExchange(topicExchange);
                            rabbitAdmin.declareBinding(BindingBuilder.bind(queue).to(topicExchange).with(routingKey));
                            break;
                        case DIRECT:
                            DirectExchange directExchange = new DirectExchange(exchangeName);
                            rabbitAdmin.declareExchange(directExchange);
                            rabbitAdmin.declareBinding(BindingBuilder.bind(queue).to(directExchange).with(routingKey));
                            break;
                        case FANOUT:
                            FanoutExchange fanoutExchange = new FanoutExchange(exchangeName);
                            rabbitAdmin.declareExchange(fanoutExchange);
                            rabbitAdmin.declareBinding(BindingBuilder.bind(queue).to(fanoutExchange));
                            break;
                        default:
                            FanoutExchange exchange = new FanoutExchange(exchangeName);
                            rabbitAdmin.declareExchange(exchange);
                            rabbitAdmin.declareBinding(BindingBuilder.bind(queue).to(exchange));
                            break;
                    }
                }
            }
        }
    }

    private class SyncServicesStateTask implements Runnable {
        //每1分钟全量同步一次ZK上的服务状态
        private long INTERVAL = 60 * 1000L;

        @Override
        public void run() {
            while (true) {
                try {
                    Thread.sleep(INTERVAL);
                } catch (InterruptedException e) {
                    logger.error(e.getMessage(), e);
                }
                //写入当前应用的状态
                try {
                    syncRealms();
                } catch (Exception e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
    }

    private class KeepAliveTask implements Runnable {
        public void run() {
            while (true) {
                if (cloudZKAccessor.zooKeeper == null) {
                    try {
                        cloudZKAccessor.initialize();
                        syncRealms();
                    } catch (Exception e) {
                        logger.error(e.getMessage(), e);
                    }
                }
                try {
                    Thread.sleep(5000L);
                } catch (InterruptedException e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
    }

    private enum CloudLogMQExchangeType {
        TOPIC, DIRECT, FANOUT
    }
}
