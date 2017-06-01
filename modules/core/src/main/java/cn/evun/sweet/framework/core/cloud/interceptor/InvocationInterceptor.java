package cn.evun.sweet.framework.core.cloud.interceptor;

import feign.RequestTemplate;

/**
 * Created by zlbbq on 2017/3/28.
 */
public interface InvocationInterceptor {
    void intercept(String cloudServiceName, String url, RequestTemplate requestTemplate, InvocationInterceptorChain chain);
}
