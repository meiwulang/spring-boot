package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/15.
 */


import cn.evun.sweet.framework.core.rest.TracableRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfiguration {
    @Value("${sweet.framework.core.rest.invocation.connectTimeout:3000}")
    private int restTemplateConnectTimeout;

    @Value("${sweet.framework.core.rest.invocation.readTimeout:-1}")
    private int restTemplateReadTimeout;

    @Value("${sweet.framework.core.rest.invocation.warning.limit:2000}")
    private int slowRestInvocationLimit;

    @Bean
    public ClientHttpRequestFactory clientHttpRequestFactory() {
        SimpleClientHttpRequestFactory simpleClientHttpRequestFactory = new SimpleClientHttpRequestFactory();
        simpleClientHttpRequestFactory.setConnectTimeout(restTemplateConnectTimeout);
        simpleClientHttpRequestFactory.setReadTimeout(restTemplateReadTimeout);
        return simpleClientHttpRequestFactory;
    }

    @Autowired
    @Bean
    public RestTemplate restTemplate(ClientHttpRequestFactory clientHttpRequestFactory) {
        TracableRestTemplate restTemplate = new TracableRestTemplate(clientHttpRequestFactory);
        restTemplate.setSlowInvocationLimit(slowRestInvocationLimit);
        return restTemplate;
    }
}
