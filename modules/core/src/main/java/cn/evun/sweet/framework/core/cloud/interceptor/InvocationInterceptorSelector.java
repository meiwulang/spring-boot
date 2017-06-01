package cn.evun.sweet.framework.core.cloud.interceptor;

/**
 * Created by zlbbq on 2017/3/28.
 */
public interface InvocationInterceptorSelector {
    InvocationInterceptor[] select(InvocationInterceptor[] source);

    class Default implements InvocationInterceptorSelector {
        @Override
        public InvocationInterceptor[] select(InvocationInterceptor[] source) {
            return source;
        }
    }
}
