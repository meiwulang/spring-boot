package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/3.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.monitor.DaoTraceInterceptor;
import cn.evun.sweet.framework.core.monitor.RequestTraceServiceLayerAspect;
import cn.evun.sweet.framework.core.mvc.filter.HttpRequestTraceFilter;
import cn.evun.sweet.framework.core.mvc.filter.RequestStatistic;
import cn.evun.sweet.framework.core.mvc.filter.SessionUserFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.Properties;

@ConditionalOnExpression("'${sweet.framework.core.http.request.trace:true}'=='true'")
@Configuration
public class RequestTraceConfiguration {
//    private static final Logger logger = LoggerFactory.getLogger(RequestTraceConfiguration.class);

    @Value("${sweet.framework.core.mvc.dynamic-resource.pattern:/*}")
    private String dynamicResourcePattern;

    @Autowired
    private ApplicationInfo applicationInfo;

    @Autowired
    private RequestStatistic requestStatistic;

    @Bean
    public FilterRegistrationBean httpRequestTraceFilterRegistration(@Qualifier("httpRequestTraceFilter") Filter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(filter);
        registration.addUrlPatterns(dynamicResourcePattern);
        registration.setName("httpRequestTraceFilter");
        registration.setOrder(Constants.FilterOrderGroups.TRACE_FILTER + 1);
        return registration;
    }

    @Bean
    @Qualifier("httpRequestTraceFilter")
    public Filter httpRequestTraceFilter(SessionUserFetcher sessionUserFetcher) {
        return new HttpRequestTraceFilter(applicationInfo, sessionUserFetcher, requestStatistic);
    }

    @Bean
    public RequestTraceServiceLayerAspect requestTraceAspect() {
        return new RequestTraceServiceLayerAspect();
    }

    @Bean
    public DaoTraceInterceptor daoTraceInterceptor() {
        DaoTraceInterceptor daoTraceInterceptor = new DaoTraceInterceptor();
        daoTraceInterceptor.setProperties(new Properties());
        return daoTraceInterceptor;
    }
}
