package cn.evun.sweet.framework.core.module;

/**
 * Created by zlbbq on 2016/12/15.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static cn.evun.sweet.framework.core.module.ModuleConstants.*;

/**
 * Sweet模块定义在META-INF/sweet-module*.properties
 */

public class ModuleLoader {
    private static final Logger logger = LoggerFactory.getLogger(ModuleLoader.class);

    private List<String> codePackages;

    private List<String> daoPackages;

    private List<String> mapperLocations;

    private List<String> typeAliasPackages;

    private List<String> cloudClientPackages;

    public ModuleLoader() {
        codePackages = new ArrayList<>();
        daoPackages = new ArrayList<>();
        mapperLocations = new ArrayList<>();
        typeAliasPackages = new ArrayList<>();
        cloudClientPackages = new ArrayList<>();
    }

    public Properties scanModules() throws IOException {
        PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = pathMatchingResourcePatternResolver.getResources(ModuleConstants.MODULE_DEFINITION_RESOURCES);
        for (Resource resource : resources) {
            Properties properties = new Properties();
            InputStream is = null;
            try {
                String resourcePath;
                URL path = resource.getURL();
                if (path == null) {
                    resourcePath = resource.getFilename();
                } else {
                    resourcePath = path.getPath();
                }
                logger.info("正在加载Sweet模块定义[" + resourcePath + "]...");
                is = resource.getInputStream();
                if (is != null) {
                    properties.load(is);
                }
                codePackages.add(properties.getProperty(ModuleConstants.CONFIG_ITEM_CODE_PACKAGE));
                daoPackages.add(properties.getProperty(ModuleConstants.CONFIG_ITEM_DAO_PACKAGE));
                cloudClientPackages.add(properties.getProperty(ModuleConstants.CONFIG_ITEM_CLOUD_CLIENT_PACKAGE));
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
            } finally {
                is.close();
            }
        }

        Properties ret = new Properties();
        ret.setProperty(LAUNCH_ARG_CODE_PACKAGES, getModuleCodePackages());
        ret.setProperty(LAUNCH_ARG_DAO_PACKAGES, getModuleDaoPackages());
        ret.setProperty(LAUNCH_ARG_CLOUD_CLIENT_PACKAGES, getModuleCloudClientPackages());
        logger.info("**模块代码包** => " + getModuleCodePackages());
        logger.info("**模块DAO包** => " + getModuleDaoPackages());
        logger.info("**模块云服务客户端API包** => " + getModuleCloudClientPackages());
        logger.info("**模块SQL Mapper文件(约定) = > classpath*:sql-mappers/**/*.xml");
        return ret;
    }

    private String getModuleCodePackages() {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < codePackages.size(); i++) {
            if (StringUtils.hasText(codePackages.get(i))) {
                if (i < codePackages.size() - 1) {
                    sb.append(codePackages.get(i)).append(",");
                } else {
                    sb.append(codePackages.get(i));
                }
            }
        }
        return sb.toString();
    }

    private String getModuleDaoPackages() {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < daoPackages.size(); i++) {
            if (StringUtils.hasText(daoPackages.get(i))) {
                if (i < daoPackages.size() - 1) {
                    sb.append(daoPackages.get(i)).append(",");
                } else {
                    sb.append(daoPackages.get(i));
                }
            }
        }
        return sb.toString();
    }

    private String getModuleCloudClientPackages() {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < cloudClientPackages.size(); i++) {
            if (StringUtils.hasText(cloudClientPackages.get(i))) {
                if (i < cloudClientPackages.size() - 1) {
                    sb.append(cloudClientPackages.get(i)).append(",");
                } else {
                    sb.append(cloudClientPackages.get(i));
                }
            }
        }
        return sb.toString();
    }
}
