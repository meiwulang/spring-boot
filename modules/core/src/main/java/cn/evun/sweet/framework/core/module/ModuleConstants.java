package cn.evun.sweet.framework.core.module;

/**
 * Created by zlbbq on 2016/12/15.
 */
public interface ModuleConstants {

    String MODULE_DEFINITION_RESOURCES = "classpath*:META-INF/sweet-module*.properties";

    String CONFIG_ITEM_CODE_PACKAGE = "sweet.module.code.basePackages";

    String CONFIG_ITEM_DAO_PACKAGE = "sweet.module.dao.basePackages";

    String LAUNCH_ARG_CODE_PACKAGES = "sweet.modules.basePackages";

    String LAUNCH_ARG_DAO_PACKAGES = "sweet.modules.daoPackages";

    String CONFIG_ITEM_CLOUD_CLIENT_PACKAGE = "sweet.module.cloudClient.packages";

    String LAUNCH_ARG_CLOUD_CLIENT_PACKAGES = "sweet.modules.cloudClient.packages";
}
