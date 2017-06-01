package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/22.
 */


import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.mvc.security.XSSDefenceFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

@ConditionalOnExpression("'${sweet.framework.core.http.defence.xss:true}'=='true'")
@Configuration
public class XSSDefenceConfiguration {
//    private static final Logger logger = LoggerFactory.getLogger(XSSDefenceConfiguration.class);

    @Value("${sweet.framework.core.mvc.dynamic-resource.pattern:/api/*}")
    private String dynamicResourcePattern;

    /******************************* XSS & SQL Injection Defence ********************************/
    @Bean
    public FilterRegistrationBean xssDefenceFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(XSSDefenceFilter());
        registration.addUrlPatterns(dynamicResourcePattern);
        registration.setName("xssDefenceFilter");
        registration.setOrder(Constants.FilterOrderGroups.SECURITY_FILTER + 2);
        return registration;
    }

    @Bean
    public Filter XSSDefenceFilter() {
        return new XSSDefenceFilter();
    }
}
