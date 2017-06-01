package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/22.
 */


import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.mvc.security.CSRFDefenceFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

@ConditionalOnExpression("'${sweet.framework.core.http.defence.csrf}'=='true'")
@Configuration
public class CSRFDefenceConfiguration {
//    private static final Logger logger = LoggerFactory.getLogger(CSRFDefenceConfiguration.class);

    @Value("${sweet.framework.core.mvc.dynamic-resource.pattern:/api/*}")
    private String dynamicResourcePattern;

    /************************************ CSRF Defence *************************************/
    @Bean
    public FilterRegistrationBean csrfDefenceFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(CSRFDefenceFilter());
        registration.addUrlPatterns(dynamicResourcePattern);
        registration.setName("csrfDefenceFilter");
        registration.setOrder(Constants.FilterOrderGroups.SECURITY_FILTER + 1);
        return registration;
    }

    @Bean
    public Filter CSRFDefenceFilter() {
        return new CSRFDefenceFilter();
    }
}
