package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/15.
 */


import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.ConstructorArgumentValues;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.util.StringUtils;
import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * api doc -- springfox swagger configuration
 */

@ConditionalOnExpression("'${sweet.framework.core.http.restful.doc:true}'=='true'")
@Configuration
@EnableSwagger2
@Import({BeanValidatorPluginsConfiguration.class})
public class SwaggerConfiguration implements BeanDefinitionRegistryPostProcessor, EnvironmentAware {
//    private final Logger logger = LoggerFactory.getLogger(SwaggerConfiguration.class);

    private String docGroups;

    @Override
    public void setEnvironment(Environment environment) {
        this.docGroups = environment.getProperty("sweet.framework.core.http.restful.doc.api.groups", "");
    }

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry beanDefinitionRegistry) throws BeansException {
        this.docGroups = "所有接口:/.*;" + this.docGroups;
        if (StringUtils.hasText(this.docGroups)) {
            String[] parts = this.docGroups.split(";");
            for (String part : parts) {
                if (!StringUtils.hasText(part)) {
                    continue;
                }
                GenericBeanDefinition beanDefinition = new GenericBeanDefinition();
                String[] groupInfo = part.split(":");
                String groupName = groupInfo[0];
                String groupPattern;
                if (groupInfo.length > 1) {
                    groupPattern = groupInfo[1];
                } else {
                    //根据group名称生成一个组, 自动包含这个组名下所有的接口
                    groupPattern = groupName.endsWith("/") ? (groupName + ".*") : (groupName + "/.*");
                }
                beanDefinition.setBeanClass(SwaggerDocketFactory.class);
                ConstructorArgumentValues constructorArgumentValues = new ConstructorArgumentValues();
                constructorArgumentValues.addGenericArgumentValue(groupName);
                constructorArgumentValues.addGenericArgumentValue(groupPattern);
                beanDefinition.setConstructorArgumentValues(constructorArgumentValues);
                beanDefinitionRegistry.registerBeanDefinition("swaggerSpringfoxDocket" + (groupName.hashCode()), beanDefinition);
            }
        }
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
    }
}
