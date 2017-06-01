package cn.evun.sweet.framework.core.cloud.configuration;

/**
 * Created by zlbbq on 2016/11/28.
 */


import cn.evun.sweet.framework.core.cloud.CloudApplication;
import cn.evun.sweet.framework.core.cloud.CloudEndpoint;
import cn.evun.sweet.framework.core.cloud.logging.CloudServiceInvocationLogger;
import cn.evun.sweet.framework.core.cloud.logging.Slf4jLogger;
import cn.evun.sweet.framework.core.cloud.lookup.CloudServiceLookup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@ConditionalOnExpression("'${sweet.cloud.enabled:false}'=='true'")
@Configuration
//@Import({CloudEndpoint.class})
//@EnableHystrix
public class CloudConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(CloudConfiguration.class);

    @Bean
    public CloudApplication cloudApplication() {
        return CloudApplication.getInstance();
    }

    @Bean
    public CloudServiceLookup cloudServiceLookup(CloudApplication cloudApplication) {
        return cloudApplication.getCloudClient().getCloudServiceLookup();
    }

    @Bean
    @ConditionalOnMissingBean(CloudServiceInvocationLogger.class)
    public CloudServiceInvocationLogger defaultCloudServiceInvocationLogger() {
        return new Slf4jLogger();
    }
}
