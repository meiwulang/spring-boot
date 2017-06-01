package cn.evun.sweet.framework.core.cloud.configuration;

/**
 * Created by zlbbq on 2017/3/28.
 */


import cn.evun.sweet.framework.core.cloud.CloudEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ConditionalOnExpression("'${sweet.cloud.enabled:false}'=='true'")
public class CloudEndpointConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(CloudEndpointConfiguration.class);

    @Bean
    public CloudEndpoint cloudEndpoint() {
        return new CloudEndpoint();
    }
}
