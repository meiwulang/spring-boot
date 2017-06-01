package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/11/29.
 */


import cn.evun.sweet.framework.core.cloud.annotation.CloudServiceClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.AnnotatedBeanDefinition;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanDefinitionHolder;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.annotation.AnnotationBeanNameGenerator;
import org.springframework.context.annotation.ClassPathBeanDefinitionScanner;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.core.env.Environment;
import org.springframework.core.type.filter.AnnotationTypeFilter;

import java.util.Set;

public class CloudServiceClientScanner extends ClassPathBeanDefinitionScanner {
    private static final Logger logger = LoggerFactory.getLogger(CloudServiceClientScanner.class);

    private CloudApplication cloudApplication;

    private Environment environment;

    public CloudServiceClientScanner(CloudApplication cloudApplication, BeanDefinitionRegistry beanDefinitionRegistry, Environment environment) {
        super(beanDefinitionRegistry, false);
        this.cloudApplication = cloudApplication;
        this.environment = environment;
        this.setBeanNameGenerator(new CloudServiceProxyBeanNameGenerator());
        this.initFilters();
    }

    private void initFilters() {
        this.addIncludeFilter(new AnnotationTypeFilter(CloudServiceClient.class));
    }

    @Override
    public Set<BeanDefinitionHolder> doScan(String... basePackages) {
        return super.doScan(basePackages);
    }

    protected boolean isCandidateComponent(AnnotatedBeanDefinition beanDefinition) {
        boolean isCandidate = beanDefinition.getMetadata().isInterface() && beanDefinition.getMetadata().isIndependent();
        if(isCandidate && this.getRegistry() instanceof ConfigurableListableBeanFactory) {
            //如果本地找到CloudServiceClient的相应实现, 则不生成代理, 直接使用本地实现
            try {
                Class clazz = Class.forName(beanDefinition.getBeanClassName());
                String [] beanNames = ((ConfigurableListableBeanFactory)(this.getRegistry())).getBeanNamesForType(clazz);
                if(beanNames.length > 0) {
                    logger.info("远程接口[" + beanDefinition.getBeanClassName() + "]定义了本地实现, 不再创建远程代理, 使用本地实现");
                    isCandidate = false;
                }
            }catch (ClassNotFoundException e) {
                //handled
                isCandidate = false;
            }
        }
        return isCandidate;
    }

    @Override
    protected boolean checkCandidate(String beanName, BeanDefinition beanDefinition) throws IllegalStateException {
        if(beanName.equals("cloudServiceProxy_" + this.cloudApplication.getAppName())) {
            return false;
        }
        return true;
    }

    @Override
    protected void registerBeanDefinition(BeanDefinitionHolder definitionHolder, BeanDefinitionRegistry registry) {
        String beanName = definitionHolder.getBeanName();
        String className = definitionHolder.getBeanDefinition().getBeanClassName();
        GenericBeanDefinition genericBeanDefinition = (GenericBeanDefinition) definitionHolder.getBeanDefinition();
        genericBeanDefinition.setBeanClass(CloudServiceClientProxyFactoryBean.class);
        genericBeanDefinition.getPropertyValues().add("cloudServiceClassName", className);
        genericBeanDefinition.getPropertyValues().add("cloudApplication", cloudApplication);
        genericBeanDefinition.getPropertyValues().add("environment", environment);
        try {
            CloudServiceClient cloudServiceClientAnnotation = AnnotationUtils.findAnnotation(Class.forName(className), CloudServiceClient.class);
            genericBeanDefinition.getPropertyValues().add("cloudServiceName", cloudServiceClientAnnotation.value());
            genericBeanDefinition.getPropertyValues().add("cloudServiceVersion", cloudServiceClientAnnotation.version());
            cloudApplication.addCloudServiceReference(cloudServiceClientAnnotation.value(), cloudServiceClientAnnotation.version());
        }catch(Exception e) {
            throw new CloudException(e.getMessage(), e);
        }
        super.registerBeanDefinition(definitionHolder, registry);
    }

    private static class CloudServiceProxyBeanNameGenerator extends AnnotationBeanNameGenerator {
        @Override
        public String generateBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
            String beanName = null;
            try {
                Class proxyInterface = Class.forName(definition.getBeanClassName());
                CloudServiceClient cloudServiceClientAnnotation = AnnotationUtils.findAnnotation(proxyInterface, CloudServiceClient.class);
                beanName = proxyInterface.getName() + "_" + cloudServiceClientAnnotation.value();
            }catch(Exception e) {
                throw new CloudException(e.getMessage(), e);
            }
            return "cloudServiceProxy_" + beanName;
        }
    }
}
