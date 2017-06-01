package cn.evun.sweet.framework.core.rest;

/**
 * Created by zlbbq on 16/6/23.
 */


import cn.evun.sweet.framework.common.tracer.ProcessContext;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.core.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.util.List;

public class TracableRestTemplate extends RestTemplate {
    private static final Logger logger = LoggerFactory.getLogger(TracableRestTemplate.class);

    private int slowInvocationLimit = -1;

    public TracableRestTemplate() {
        super();
        this.registerTraceInterceptor(this.getInterceptors());
    }

    public TracableRestTemplate(ClientHttpRequestFactory requestFactory) {
        super(requestFactory);
        this.registerTraceInterceptor(this.getInterceptors());
    }

    @Override
    protected <T> T doExecute(URI url, HttpMethod method, RequestCallback requestCallback, ResponseExtractor<T> responseExtractor) throws RestClientException {
        return super.doExecute(url, method, requestCallback, responseExtractor);
    }

    public void setInterceptor(List<ClientHttpRequestInterceptor> interceptorList) {
        if(!this.hasTraceInterceptor(interceptorList)) {
            this.registerTraceInterceptor(interceptorList);
        }
    }

    private boolean hasTraceInterceptor(List<ClientHttpRequestInterceptor> interceptorList) {
        for(ClientHttpRequestInterceptor interceptor : interceptorList) {
            if(interceptor instanceof PutTraceId2HttpHeaderInterceptor) {
                return true;
            }
        }
        return false;
    }

    private void registerTraceInterceptor(List<ClientHttpRequestInterceptor> interceptorList) {
        interceptorList.add(new PutTraceId2HttpHeaderInterceptor());
    }

    public void setSlowInvocationLimit(int limit) {
        this.slowInvocationLimit = limit;
    }

    public int getSlowInvocationLimit() {
        return this.slowInvocationLimit;
    }

    private class PutTraceId2HttpHeaderInterceptor implements ClientHttpRequestInterceptor {
        public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
            ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
            String requestId = tracer.getTraceId();
            httpRequest.getHeaders().set(Constants.HttpRequestTrace.HEADER_TRACE_ID, requestId);
            String url = httpRequest.getURI().toURL().toString();
            ProcessContext requestCtx = tracer.join(ProcessContext.Type.RestTemplate, url);
            requestCtx.setAttribute("url", url);
            ClientHttpResponse response = null;
            try {
                response = clientHttpRequestExecution.execute(httpRequest, bytes);
                requestCtx.setAttribute("status", response.getStatusCode().value());
            }catch(IOException e) {
                requestCtx.setAttribute("error", true);
                throw e;
            }
            finally {
                requestCtx.stop();
                if(slowInvocationLimit > 0 && requestCtx.costInMills() > slowInvocationLimit) {
                    logger.warn("Slow rest api, cost [{}]ms, url -> [{}]", requestCtx.costInMills(), url);
                }
            }
            return response;
        }
    }
}
