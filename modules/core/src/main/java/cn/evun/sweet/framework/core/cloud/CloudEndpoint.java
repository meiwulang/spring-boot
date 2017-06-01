package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/11/29.
 */


import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.module.ModuleConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.type.AnnotationMetadata;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class CloudEndpoint implements ResourceLoaderAware, BeanDefinitionRegistryPostProcessor, ApplicationListener<ContextRefreshedEvent>, EnvironmentAware, ServletContextListener {
    private static final Logger logger = LoggerFactory.getLogger(cn.evun.sweet.framework.core.cloud.configuration.CloudConfiguration.class);

    private static CloudApplication cloudApplication = CloudApplication.getInstance();


    private ResourceLoader resourceLoader;

    private String scanPackages;

    private Environment environment;

    public CloudEndpoint() {
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        //启动中: 向应用中心注册应用资源
        cloudApplication.getCloudClient().registerApplicationResources(contextRefreshedEvent.getApplicationContext());
        //启动成功: 向应用中心报告服务处于运行状态
        cloudApplication.getCloudClient().activateApplication();
    }

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry beanDefinitionRegistry) throws BeansException {
        if (StringUtils.hasText(this.scanPackages)) {
            CloudServiceClientScanner cloudServiceClientScanner = new CloudServiceClientScanner(cloudApplication, beanDefinitionRegistry, environment);
            cloudServiceClientScanner.setResourceLoader(resourceLoader);
            cloudServiceClientScanner.doScan(this.scanPackages.split(","));
        }
        //向配置中心上报应用配置元数据
        cloudApplication.getCloudClient().reportApplicationConfigurationMetadata();
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
    }

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        //钝化应用
        cloudApplication.getCloudClient().passivateApplication();
    }

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
        this.setScanPackages();
    }

    private void setScanPackages() {
        this.scanPackages = environment.resolvePlaceholders("${sweet.cloud.service.client.packages:}");
        String modulesCloudClientPackage = environment.getProperty(ModuleConstants.LAUNCH_ARG_CLOUD_CLIENT_PACKAGES);
        String comma = ",";
        if ((!StringUtils.hasText(this.scanPackages)) || this.scanPackages.endsWith(",")) {
            comma = "";
        }
        if (StringUtils.hasText(modulesCloudClientPackage) && !("null".equals(modulesCloudClientPackage))) {
            this.scanPackages = this.scanPackages + comma + modulesCloudClientPackage;
        }
    }
}
