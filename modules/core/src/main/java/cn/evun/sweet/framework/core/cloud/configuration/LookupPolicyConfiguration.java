package cn.evun.sweet.framework.core.cloud.configuration;

/**
 * Created by zlbbq on 2017/3/21.
 */


import cn.evun.sweet.framework.core.cloud.lookup.AbstractClientSideServiceLookup;
import cn.evun.sweet.framework.core.cloud.lookup.CloudServiceLookup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnExpression("'${sweet.cloud.enabled:false}'=='true'")
public class LookupPolicyConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(LookupPolicyConfiguration.class);

    @Value("${sweet.cloud.service.client.native-service-first.policy:disabled}")
    private String nativeServiceFirstEnabled;

    @Bean
    public NativeServiceFirstLookupPolicyConfigurer nativeServiceFirstLookupPolicyConfigurer(CloudServiceLookup cloudServiceLookup) {
        return new NativeServiceFirstLookupPolicyConfigurer().config(cloudServiceLookup, "enabled".equalsIgnoreCase(nativeServiceFirstEnabled));
    }

    public static class NativeServiceFirstLookupPolicyConfigurer {

        public NativeServiceFirstLookupPolicyConfigurer() {
        }

        NativeServiceFirstLookupPolicyConfigurer config(CloudServiceLookup cloudServiceLookup, boolean nativeServiceFirstEnabled) {
            if (cloudServiceLookup instanceof AbstractClientSideServiceLookup) {
                ((AbstractClientSideServiceLookup) cloudServiceLookup).setNativeServiceFirstEnabled(nativeServiceFirstEnabled);
            }
            return this;
        }
    }
}
