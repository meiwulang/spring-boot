package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 2016/11/28.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.mvc.filter.RequestStatistic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BasicConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(BasicConfiguration.class);

    @Bean
    public ApplicationInfo applicationInfo() throws Exception {
        return ApplicationInfo.getInstance();
    }

    @Bean
    public RequestStatistic requestStatistic(){
        return new RequestStatistic();
    }
}
