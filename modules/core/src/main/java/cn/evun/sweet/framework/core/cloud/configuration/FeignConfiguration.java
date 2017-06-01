package cn.evun.sweet.framework.core.cloud.configuration;

/**
 * Created by zlbbq on 2017/2/20.
 */


import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.cloud.CloudApplication;
import cn.evun.sweet.framework.core.cloud.CloudConstants;
import cn.evun.sweet.framework.core.cloud.FeignDecoderWrapper;
import cn.evun.sweet.framework.core.cloud.interceptor.InvocationInterceptor;
import cn.evun.sweet.framework.core.cloud.interceptor.InvocationInterceptorChain;
import feign.Contract;
import feign.RequestTemplate;
import feign.codec.Decoder;
import feign.codec.Encoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.cloud.netflix.feign.AnnotatedParameterProcessor;
import org.springframework.cloud.netflix.feign.FeignFormatterRegistrar;
import org.springframework.cloud.netflix.feign.support.ResponseEntityDecoder;
import org.springframework.cloud.netflix.feign.support.SpringDecoder;
import org.springframework.cloud.netflix.feign.support.SpringEncoder;
import org.springframework.cloud.netflix.feign.support.SpringMvcContract;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.format.support.DefaultFormattingConversionService;
import org.springframework.format.support.FormattingConversionService;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@ConditionalOnExpression("'${sweet.cloud.enabled:false}'=='true'")
@Configuration
public class FeignConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(FeignConfiguration.class);

    @Autowired
    private ObjectFactory<HttpMessageConverters> messageConverters;
    @Autowired(
            required = false
    )
    private List<AnnotatedParameterProcessor> parameterProcessors = new ArrayList();
    @Autowired(
            required = false
    )
    private List<FeignFormatterRegistrar> feignFormatterRegistrars = new ArrayList();

    @Bean
    @ConditionalOnMissingBean
    public Decoder feignDecoder() {
        return new ResponseEntityDecoder(new SpringDecoder(this.messageConverters));
    }

    @Bean
    @ConditionalOnMissingBean
    public Encoder feignEncoder() {
        return new SpringEncoder(this.messageConverters);
    }

    @Bean
    @ConditionalOnMissingBean
    public Contract feignContract(ConversionService feignConversionService) {
        return new SpringMvcContract(this.parameterProcessors, feignConversionService);
    }

    @Bean
    public FormattingConversionService feignConversionService() {
        DefaultFormattingConversionService conversionService = new DefaultFormattingConversionService();
        Iterator iterator = this.feignFormatterRegistrars.iterator();

        while(iterator.hasNext()) {
            FeignFormatterRegistrar feignFormatterRegistrar = (FeignFormatterRegistrar)iterator.next();
            feignFormatterRegistrar.registerFormatters(conversionService);
        }

        return conversionService;
    }

    @Bean
    public FeignDecoderWrapper feignDecoderWrapper(Decoder decoder) {
        return new FeignDecoderWrapper(decoder);
    }


    @Bean
    public InvocationInterceptor requestTraceInvocationInterceptor(final CloudApplication cloudApplication) {
        return new InvocationInterceptor() {
            @Override
            public void intercept(String cloudServiceName, String url, RequestTemplate requestTemplate, InvocationInterceptorChain chain) {
                ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
                requestTemplate.header(CloudConstants.HEADER_CLOUD_SERVICE_FROM, cloudApplication.getAppName());
                requestTemplate.header(CloudConstants.HEADER_CLOUD_SERVICE_FROM_INDEX, cloudApplication.getAppId());
                requestTemplate.header(CloudConstants.HEADER_CLOUD_SERVICE_TARGET, cloudServiceName);
                requestTemplate.header(Constants.HttpRequestTrace.HEADER_TRACE_ID, tracer.getTraceId());

                chain.next(cloudServiceName, url, requestTemplate);
            }
        };
    }
}
