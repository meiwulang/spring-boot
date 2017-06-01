package cn.evun.sweet.framework.core.cloud.common;

/**
 * Created by zlbbq on 2016/12/8.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CloudZNodePattern {
    public static final Logger logger = LoggerFactory.getLogger(CloudZNodePattern.class);

    /**
     * 该节点写入的数据类型为Map<String, ConfigMetadata>, 表示应用配置元数据
     */
    public static final String ZNODE_INSTANCE_CONFIGURATION_METADATA = "/applications/${appName}/instances/${appId}/metadata";

    /**
     * 该节点写入的数据类型为Properties, 表示应用实例配置, 该配置优先级高于ZNODE_APPLICATION_CONFIGURATION_CURRENT_VERSION定义的配置
     */
    public static final String ZNODE_INSTANCE_CONFIGURATION = "/applications/${appName}/instances/${appId}/configuration";

    /**
     * 该节点写入的数据类型为List<CloudResource>, 表示开放资源
     */
    public static final String ZNODE_INSTANCE_CLOUD_RESOURCES_GLOBAL = "/applications/${appName}/instances/${appId}/resources/global";

    /**
     * 该节点写入的数据类型为List<CloudResource>, 表示私有资源
     */
    public static final String ZNODE_INSTANCE_CLOUD_RESOURCES_SYSTEM = "/applications/${appName}/instances/${appId}/resources/system";

    /**
     * 该节点写入的数据类型为CloudApplication, 表示云应用实例信息
     */
    public static final String ZNODE_INSTANCE_INFORMATION = "/applications/${appName}/instances/${appId}/information";

    /**
     * 该节点写入的数据类型为CloudApplication, 表示云应用实例的不同服务状态, 此ZNode为临时ZNode
     */
    public static final String ZNODE_INSTANCE_STATE = "/realms/${appName}/${appId}";

    /**
     * 该节点写入的数据类型为CloudApplicationRuntimeData, 表示云应用实例的运行时数据, 这些数据通常由管理平台修改（如负载均衡权重）
     * */
    public static final String ZNODE_INSTANCE_RUNTIME_DATA = "/realms/${appName}/${appId}/runtime-data";

    /**
     * 从该节点读取的数据类型为Properties, 此节点不一定存在, 应向下获取一个最近版本的配置项
     */
    public static final String ZNODE_APPLICATION_CONFIGURATION_CURRENT_VERSION = "/applications/${appName}/configuration/${appVersion}";

    /**
     * 此节点在ZNODE_APPLICATION_CONFIGURATION_CURRENT_VERSION不存在时, 枚举应用配置历史版本
     */
    public static final String ZNODE_APPLICATION_CONFIGURATION_ALL_VERSIONS = "/applications/${appName}/configuration";

    /**
     * 该节点写入数据类型为ApplicationPerformanceMetrics
     */
    public static final String ZNODE_INSTANCE_PERFORMANCE = "/applications/${appName}/instances/${appId}/performance";

    /**
     * 该节点写入数据类型为List<ApplicationReference>, 表示实例所依赖的服务
     */
    public static final String ZNODE_INSTANCE_DEPENDENCIES = "/applications/${appName}/instances/${appId}/dependencies";

    /**
     * 该节点下的都是服务实例实时状态数据
     * */
    public static final String ZNODE_REALMS = "/realms";
}
