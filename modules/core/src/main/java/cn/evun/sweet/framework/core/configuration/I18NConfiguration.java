package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/9/28.
 */


import cn.evun.sweet.framework.core.mvc.ErrorTable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.io.IOException;
import java.util.Locale;

@Configuration
@ConditionalOnExpression("'${sweet.framework.core.i18n.enabled:true}'=='true'")
public class I18NConfiguration implements ApplicationListener<ContextRefreshedEvent> {
    private static final Logger logger = LoggerFactory.getLogger(I18NConfiguration.class);

    @Value("${sweet.framework.core.i18n.resources.baseName:i18n/messages}")
    private String baseName;

    @Value("${sweet.framework.core.i18n.resources.encoding:utf-8}")
    private String encoding;

    @Value("${sweet.framework.core.i18n.defaultLocale:zh_CN}")
    private String defaultLocale;

    @Value("${sweet.framework.core.i18n.locale.param:lang}")
    private String param;

    @Value("${sweet.framework.core.mvc.api.i18n.basename:classpath*:i18n/api}")
    private String apiI18NBaseNames;

    @Value("${sweet.framework.core.mvc.api.i18n.locale:zh_CN}")
    private String apiI18nLocale;

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource ms = new ResourceBundleMessageSource();
        ms.setBasename(baseName);
        ms.setDefaultEncoding(encoding);
        ms.setCacheSeconds(-1);
        return ms;
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(new Locale(defaultLocale));
        return slr;
    }

    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName(param);
        return lci;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        try {
            ErrorTable.init(apiI18NBaseNames, apiI18nLocale);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
    }
}
