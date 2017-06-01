package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/22.
 */


import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.mvc.filter.SwaggerDocumentationFilter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

@ConditionalOnExpression("'${sweet.framework.core.http.restful.doc:true}'=='false'")
@Configuration
public class SwaggerDisabledConfiguration {
//    private static final Logger logger = LoggerFactory.getLogger(SwaggerDisabledConfiguration.class);

    /************************************ Swagger UI Filter(response 404 on swagger documentation disabled) *************************************/

    @Bean
    public FilterRegistrationBean swaggerEnabledRegistration() {
        // swagger的界面: /swagger-ui.html 看Swagger的文档, 它是写死的
        final String SWAGGER_DOCUMENTATION_URI = "/swagger-ui.html";
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(getSwaggerDocumentationFilter());
        registration.addUrlPatterns(SWAGGER_DOCUMENTATION_URI);
        registration.setName("swaggerDocumentationFilter");
        registration.setOrder(Constants.FilterOrderGroups.TOP_FILTER + 1);
        return registration;
    }

    @Bean
    public Filter getSwaggerDocumentationFilter() {
        return new SwaggerDocumentationFilter();
    }
}
