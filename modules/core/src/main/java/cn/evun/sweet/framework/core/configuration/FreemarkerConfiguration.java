package cn.evun.sweet.framework.core.configuration;
/**
 * @author ruanrj
 * @description
 * @create 2017-01-12.
 */

import cn.evun.sweet.framework.core.mvc.freemarker.FreemarkerDirectiveConfigurer;
import cn.evun.sweet.framework.core.mvc.freemarker.SweetFreemarkerConfigurer;
import freemarker.cache.TemplateLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerProperties;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactory;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Properties;

@Configuration
@ConditionalOnExpression("'${spring.freemarker.enabled:true}'=='true'")
@EnableConfigurationProperties({FreeMarkerProperties.class})
@AutoConfigureAfter({WebMvcAutoConfiguration.class})
@AutoConfigureBefore({FreeMarkerAutoConfiguration.class})
public class FreemarkerConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(FreemarkerConfiguration.class);

    @Autowired
    private FreeMarkerProperties properties;

    @Autowired(required = false)
    private FreemarkerDirectiveConfigurer freemarkerDirectiveConfigurer;

    @Value("${sweet.framework.core.freemarker.auto-escape-enabled:false}")
    private boolean autoEscapeEnabled;

    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer configurer = new SweetFreemarkerConfigurer(properties.getTemplateLoaderPath()[0], autoEscapeEnabled);
        this.applyProperties(configurer);
        if (freemarkerDirectiveConfigurer != null) {
            configurer.setFreemarkerVariables(freemarkerDirectiveConfigurer.getSupportedDirectives());
        }
        return configurer;
    }

    private void applyProperties(FreeMarkerConfigurationFactory factory) {
        factory.setTemplateLoaderPaths(this.properties.getTemplateLoaderPath());
        factory.setPreferFileSystemAccess(this.properties.isPreferFileSystemAccess());
        factory.setDefaultEncoding(this.properties.getCharsetName());
        Properties settings = new Properties();
        settings.putAll(this.properties.getSettings());
        factory.setFreemarkerSettings(settings);
    }
}