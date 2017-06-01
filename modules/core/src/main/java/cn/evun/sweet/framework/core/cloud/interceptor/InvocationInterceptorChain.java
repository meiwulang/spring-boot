package cn.evun.sweet.framework.core.cloud.interceptor;

/**
 * Created by zlbbq on 2017/3/28.
 */


import feign.RequestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class InvocationInterceptorChain {
    private static final Logger logger = LoggerFactory.getLogger(InvocationInterceptorChain.class);

    protected InvocationInterceptor[] interceptors;

    protected int index;

    public InvocationInterceptorChain(InvocationInterceptor[] interceptors) {
        this.interceptors = interceptors;
        this.index = 0;
    }

    public void next(String cloudServiceName, String url, RequestTemplate requestTemplate) {
        if(this.interceptors != null && this.index < this.interceptors.length) {
            this.interceptors[this.index++].intercept(cloudServiceName, url, requestTemplate, this);
        }
    }
}
