package cn.evun.sweet.framework.core;

import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.core.cfg.ConfigItem;
import cn.evun.sweet.framework.core.cfg.ConfigMetadata;
import cn.evun.sweet.framework.core.cloud.CloudApplication;
import cn.evun.sweet.framework.core.cloud.CloudConstants;
import cn.evun.sweet.framework.core.module.ModuleConstants;
import cn.evun.sweet.framework.core.module.ModuleLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.autoconfigure.ConfigurationPropertiesRebinderAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.SimpleCommandLinePropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.util.StringUtils;

import java.io.*;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.URL;
import java.util.*;


/**
 * Created by zlbbq on 16/5/3.
 */

@ComponentScan({"cn.evun.sweet.framework", "${sweet.app.basePackages:}", "${" + ModuleConstants.LAUNCH_ARG_CODE_PACKAGES + ":}"})
@SpringBootApplication(exclude = {
        ConfigurationPropertiesRebinderAutoConfiguration.class
})
public class SweetApplicationEntry {
    private static Logger logger = LoggerFactory.getLogger(SweetApplicationEntry.class);

    static ConfigurableApplicationContext applicationContext = null;

    private static ApplicationInfo applicationInfo;

    private static final String CLASSPATH_CONFIG_RESOURCE_NAME = "application.properties";

    private static final String CONFIG_ENTRY = "config.entry";

    public static void main(String args[]) throws Exception {
        Properties applicationProperties = detectApplicationProperties(args);
        applicationInfo.setRuntimeConfiguration(applicationProperties);     //这里要重构, applicationInfo在方法里被赋值了, 太难看!
        SortedMap<String, String> props = new TreeMap<>();
        Set<Object> configItems = applicationProperties.keySet();
        StringBuffer sb = new StringBuffer("Sweet应用配置列表\n");
        for (Object s : configItems) {
            props.put(s.toString(), applicationProperties.getProperty(s.toString()));
        }
        Set<String> sortedConfigItems = props.keySet();
        for (Object s : sortedConfigItems) {
            sb.append(s.toString()).append("=").append(applicationProperties.getProperty(s.toString())).append("\n");
        }
        logger.info(sb.toString());
        args = convert2LaunchArgs(applicationProperties);
        SpringApplication application = new SpringApplication(SweetApplicationEntry.class);
        applicationContext = application.run(args);
        logger.info("应用" + applicationInfo.toString() + "启动成功");
    }

    private static Properties detectApplicationProperties(String[] args) throws Exception {
        SimpleCommandLinePropertySource simpleCommandLinePropertySource = new SimpleCommandLinePropertySource(args);
        String configFilePath = null;
        if (StringUtils.hasText(System.getProperty(CONFIG_ENTRY))) {
            configFilePath = System.getProperty(CONFIG_ENTRY);
        } else if (simpleCommandLinePropertySource.containsProperty(CONFIG_ENTRY)) {
            configFilePath = simpleCommandLinePropertySource.getProperty(CONFIG_ENTRY);
        }
        Properties applicationConfiguration = new Properties();
        Properties cloudConfiguration = null;
        Properties commandLineConfiguration = null;
        Properties fileConfiguration = null;
        Properties metadataDefaultConfiguration = null;
        Properties moduleConfiguration = null;
        Properties topLevelConfiguration = new Properties();
        //支持从java -D及启动参数指定入口配置文件, 该特性支持从文件系统加载配置文件
        //java -Dconfig.entry=./application.properties -jar xxxxx.jar
        //java -jar xxxxx.jar --config.entry=./application.properties
        applicationInfo = collectApplicationInfo(topLevelConfiguration, configFilePath);
        ModuleLoader moduleLoader = new ModuleLoader();
        moduleConfiguration = moduleLoader.scanModules();
        applicationInfo.setConfigMetadataMap(collectConfigMetadata());
        if (applicationInfo instanceof CloudApplication) {
            //TODO  fixme hack
            fileConfiguration = compatibleV1ConfigurationRules(applicationInfo.getAppName(), applicationInfo.getAppVersion());
            metadataDefaultConfiguration = applicationInfo.exportDefaultConfigAsProperties();
            cloudConfiguration = loadCloudConfigurations((CloudApplication) applicationInfo);
        } else {
            //非云端模式时兼容1.x版本的配置读取
            fileConfiguration = compatibleV1ConfigurationRules(applicationInfo.getAppName(), applicationInfo.getAppId());
            metadataDefaultConfiguration = applicationInfo.exportDefaultConfigAsProperties();
        }
        //取得命令行配置
        String[] commandLineConfigItems = simpleCommandLinePropertySource.getPropertyNames();
        commandLineConfiguration = new Properties();
        for (String commandLineConfigItem : commandLineConfigItems) {
            commandLineConfiguration.setProperty(commandLineConfigItem, simpleCommandLinePropertySource.getProperty(commandLineConfigItem));
        }
        //配置文件优先级从低到高为:
        // 元数据默认配置
        // Classpath或本地文件配置
        // 命令行配置
        // 云端配置
        // 模块配置
        // 顶级配置(应用名称, ID, 服务端口)
        applicationConfiguration = mergeConfig(applicationConfiguration, metadataDefaultConfiguration);
        applicationConfiguration = mergeConfig(applicationConfiguration, fileConfiguration);
        applicationConfiguration = mergeConfig(applicationConfiguration, commandLineConfiguration);
        applicationConfiguration = mergeConfig(applicationConfiguration, cloudConfiguration);
        applicationConfiguration = mergeConfig(applicationConfiguration, moduleConfiguration);
        applicationConfiguration = mergeConfig(applicationConfiguration, topLevelConfiguration);
        //设置ContextPath
        applicationInfo.setAppContextPath(applicationConfiguration.getProperty("server.context-path", "/"));
        return applicationConfiguration;
    }

    //从云配置中心读取配置
    private static Properties loadCloudConfigurations(CloudApplication cloudApplication) throws Exception {
        return cloudApplication.loadApplicationConfiguration();
    }

    private static String[] convert2LaunchArgs(Properties properties) {
        String[] ret = new String[properties.size()];
        Set<Object> keys = properties.keySet();
        int idx = 0;
        for (Object key : keys) {
            String cfgValue = properties.get(key).toString();
            if (StringUtils.hasText(cfgValue)) {
                String arg = "--" + key.toString() + "=" + cfgValue;
                ret[idx++] = arg;
            } else {
                ret[idx++] = "";
            }
        }
        return ret;
    }

    private static Map<String, ConfigMetadata> collectConfigMetadata() throws Exception {
        Map<String, ConfigMetadata> configMetadataMap = new HashMap<>();
        JSONSerializer jsonSerializer = new JSONSerializer();
        PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = pathMatchingResourcePatternResolver.getResources("classpath*:META-INF/sweet-config-metadata*.json");
        for (Resource resource : resources) {
            String resourcePath;
            URL path = resource.getURL();
            if (path == null) {
                resourcePath = resource.getFilename();
            } else {
                resourcePath = path.getPath();
            }
            logger.info("正在从[" + resourcePath + "]读取模块配置元数据...");
            InputStream is = resource.getInputStream();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int nRead;
            while ((nRead = is.read(buffer)) > 0) {
                baos.write(buffer, 0, nRead);
                baos.flush();
            }
            ConfigMetadata configMetadata = jsonSerializer.deserialize(baos.toByteArray(), ConfigMetadata.class);
            putConfigMetadata(configMetadataMap, configMetadata);
            is.close();
            baos.close();
        }
        return configMetadataMap;
    }

    private static void putConfigMetadata(Map<String, ConfigMetadata> configMetadataMap, ConfigMetadata configMetadata) {
        String groupName = configMetadata.getGroup();
        if (!configMetadataMap.containsKey(groupName)) {
            configMetadataMap.put(groupName, configMetadata);
            return;
        }

        ConfigMetadata exists = configMetadataMap.get(groupName);
        for (ConfigItem item : configMetadata.getItems()) {
            exists.addItem(item);
        }
    }

    private static String getSweetFrameworkCoreVersion() throws Exception {
        String version = "unknown";
        PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = pathMatchingResourcePatternResolver.getResources("classpath*:META-INF/maven/cn.evun.sweet.framework/sweet-framework-core/pom.properties");
        if (resources.length == 1) {
            Properties properties = new Properties();
            properties.load(resources[0].getInputStream());
            version = properties.getProperty("version");
        }
        return version;
    }

    private static String getApplicationVersion(String appName) throws Exception {
        String version = "0.0.0";
        //支持从启动命令读取应用版本号(建议在测试阶段使用)
        if (StringUtils.hasText(System.getProperty("version"))) {
            return System.getProperty("version");
        }
        PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = pathMatchingResourcePatternResolver.getResources("classpath:META-INF/maven/**/" + appName + "/pom.properties");
        if (resources.length == 1) {
            Properties properties = new Properties();
            properties.load(resources[0].getInputStream());
            version = properties.getProperty("version");
        } else {
            System.err.println("读取应用(" + appName + ")版本号失败, 设置为默认版本 => [0.0.0]. 要解决此问题, 请确认spring.application.name与artifactId一致.");
        }

        if (StringUtils.hasText(version)) {
            //去掉-SNAPSHOT, -RELEASE, -Alpha等版本标识
            int idx = version.indexOf("-");
            if (idx > 0) {
                version = version.substring(0, idx);
            }
        }

        return version;
    }

    private static String getLocalIP() throws Exception {
        String sysIpProps = System.getProperty("local.ip");
        if (StringUtils.hasText(sysIpProps)) {
            return sysIpProps;
        }
        InetAddress address = null;
        Enumeration<NetworkInterface> allNetInterfaces = NetworkInterface.getNetworkInterfaces();
        while (allNetInterfaces.hasMoreElements()) {
            NetworkInterface netInterface = allNetInterfaces.nextElement();
            Enumeration<InetAddress> addresses = netInterface.getInetAddresses();
            while (addresses.hasMoreElements()) {
                InetAddress addr = addresses.nextElement();
                if (!addr.isLoopbackAddress() && addr instanceof Inet4Address) {
                    return addr.getHostAddress();
                }
            }
        }
        throw new Exception("获取本地IP地址失败, 请确认网卡配置正确");

//        try {
//            return InetAddress.getLocalHost().getHostAddress();
//        }catch(Exception e) {
//            byte []addr = InetAddress.getLocalHost().getAddress();
//            StringBuffer sb = new StringBuffer();
//            sb.append((int)addr[0]).append(".").append((int)addr[1]).append(".").append((int)addr[2]).append(".").append((int)addr[3]);
//            return sb.toString();
//        }
    }

    private static ApplicationInfo collectApplicationInfo(Properties topLevelConfiguration, String configFile) throws Exception {
        Properties properties = new Properties();
        InputStream is = null;
        if (StringUtils.hasText(configFile)) {
            File fsConfigFile = new File(configFile);
            logger.info("***NOTE*** : {}", "正在使用本地配置文件 -> " + fsConfigFile.getCanonicalPath());
            if (!fsConfigFile.exists()) {
                logger.error("找不到本地配置文件 -> " + fsConfigFile.getCanonicalPath());
                System.exit(-1);
            }
            is = new FileInputStream(fsConfigFile);
        } else {
            ClassPathResource classPathResource = new ClassPathResource(CLASSPATH_CONFIG_RESOURCE_NAME);
            is = classPathResource.getInputStream();
        }
        try {
            properties.load(is);
            String isCloudEnabled = properties.getProperty("sweet.cloud.enabled", "false");
            boolean isCloudMode = false;
            if (Boolean.valueOf(isCloudEnabled)) {
                applicationInfo = CloudApplication.getInstance();
                isCloudMode = true;
            } else {
                applicationInfo = ApplicationInfo.getInstance();
            }
            String appName = properties.getProperty("spring.application.name", "sweet-application");
            //支持从运行时指定"${spring.application.index}"值, 实现一次编译打包可以多次运行实例
            String appIndex = System.getProperty("spring.application.index", properties.getProperty("spring.application.index", "8080"));
            applicationInfo.setAppHost(getLocalIP());
            applicationInfo.setAppName(appName);
            applicationInfo.setAppId(appIndex);
            applicationInfo.setAppVersion(getApplicationVersion(appName));
            int port = Integer.parseInt(appIndex);
            applicationInfo.setAppPort(port);

            topLevelConfiguration.setProperty("spring.application.name", appName);
            topLevelConfiguration.setProperty("spring.application.index", appIndex);

            //设置系统属性, 其他模块中可能会直接使用
            System.setProperty("spring.application.name", appName);
            System.setProperty("spring.application.index", appIndex);

            //禁用管理HTTP服务, 这可能会导致应用问题
            topLevelConfiguration.setProperty("management.port", "-1");

            if (isCloudMode) {
                //强制云应用程序的服务端口号与应用的index一致, 这样从运维角度看比较清晰
                CloudApplication cloudApplication = (CloudApplication) (applicationInfo);
                topLevelConfiguration.setProperty("server.port", appIndex);
                String cloudJointUrl = properties.getProperty(CloudConstants.JOINT_SERVICE_URL_KEY, CloudConstants.DEFAULT_JOINT_SERVICE_URL);
                cloudApplication.setCloudJointUrl(cloudJointUrl);

                String cloudTicket = properties.getProperty("sweet.cloud.ticket");
                if (!StringUtils.hasText(cloudTicket)) {
                    throw new Exception("Can not connect to sweet cloud, TICKET is required");
                } else {
                    cloudApplication.setCloudTicket(cloudTicket);
                }

                //读取应用分层信息, TODO: 在配置文件中配置死还是可收由云端配置?
                String layer = properties.getProperty("sweet.cloud.layer", "Business");
                cloudApplication.setLayer(CloudApplication.Layer.fromString(layer));

                cloudApplication.connect2Cloud();
            }
            applicationInfo.setSweetFrameworkVersion(getSweetFrameworkCoreVersion());
        } catch (Exception e) {
            throw e;
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (Exception e) {
                    ;
                }
            }
        }
        return applicationInfo;
    }

    //兼容1.x版本读取配置的规则, 但是原来定义的app.name, app.id需要从application.properties中定义为spring boot的标准: spring.application.name和spring.application.index
    private static Properties compatibleV1ConfigurationRules(String appName, String appId) {
        Properties extraConfigurations = new Properties();
        //配置文件加载路径,优先级从低到高(优先级高的覆盖优先级低的)
        String configResources[] = {
                "classpath:/application.properties",
                "classpath:/${app.name}.properties",
                "classpath:/${app.name}-${app.profile}.properties",
                "classpath:/${app.name}-${app.id}-${app.profile}.properties",
                "file:./etc/${app.name}.properties",
                "file:./etc/${app.name}-${app.profile}.properties",
                "file:./etc/${app.name}-${app.id}-${app.profile}.properties",
        };
        String appProfile = System.getProperty("app.profile");

        //如果设定了系统环境变量"sweet-profile", 则将默认profile设置成系统环境变量中定义的profile, 否则强制校验两个profile一致以防止在错误的环境下启动程序
        String profileOfSystem = System.getenv("sweet-profile");
        if (StringUtils.hasText(profileOfSystem)) {
            if (!StringUtils.hasText(appProfile)) {
                appProfile = profileOfSystem;
                logger.info("**Application profile was set to system profile [" + profileOfSystem + "]");
            } else if (!(profileOfSystem.equals(appProfile))) {
                logger.warn("**WARNNING** System profile [" + profileOfSystem + "] does not equals to application profile [" + appProfile + "], please check your system and application runtime environment");
            }
        }

        appProfile = StringUtils.hasText(appProfile) ? appProfile : Constants.ApplicationProfiles.DEVELOPMENT;

        for (String s : configResources) {
            s = s.replaceAll("\\$\\{app\\.name\\}", appName).replaceAll("\\$\\{app\\.id\\}", appId).replaceAll("\\$\\{app\\.profile\\}", appProfile).replaceAll("classpath\\:", "");
            if (s.startsWith("file:")) {
                loadConfigurationFromFile(extraConfigurations, s.substring(5));
            } else {
                loadConfigurationFromClassPath(extraConfigurations, s);
            }
        }

        return extraConfigurations;
    }

    //从配置文件加载配置项,放入java -D,实现配置文件按优先级覆盖
    private static void loadConfigurationFromClassPath(Properties extraConfigurations, String resource) {
        InputStream is = SweetApplicationEntry.class.getResourceAsStream(resource);
        try {
            if (is != null) {
                System.out.println("**INFO** Loading configuration from classpath resource [classpath:" + resource + "]");
                Properties props = new Properties();
                props.load(is);
                Iterator<Object> iterator = props.keySet().iterator();
                while (iterator.hasNext()) {
                    String key = (String) iterator.next();
                    extraConfigurations.put(key, props.get(key));
                }
            }
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
    }

    //从文件系统读取配置文件
    private static void loadConfigurationFromFile(Properties extraConfigurations, String file) {
        FileInputStream fis = null;
        try {
            File f = new File(file);
            fis = new FileInputStream(f);
            logger.info("**INFO** Loading configuration from file system [" + f.getCanonicalPath() + "]");
            Properties props = new Properties();
            props.load(fis);
            Iterator<Object> iterator = props.keySet().iterator();
            while (iterator.hasNext()) {
                String key = (String) iterator.next();
                extraConfigurations.put(key, props.get(key));
            }
        } catch (FileNotFoundException e) {
            //handled
            ;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
    }

    //merge properties, dest优先级高
    private static Properties mergeConfig(Properties src, Properties dest) {
        Properties ret = new Properties();
        if (src != null) {
            Enumeration keyEnum = src.keys();
            while (keyEnum.hasMoreElements()) {
                String key = keyEnum.nextElement().toString();
                ret.put(key, src.getProperty(key));
            }
        }

        if (dest != null) {
            Enumeration keyEnum = dest.keys();
            while (keyEnum.hasMoreElements()) {
                String key = keyEnum.nextElement().toString();
                ret.put(key, dest.getProperty(key));
            }
        }

        return ret;
    }
}
