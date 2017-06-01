package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/11/30.
 */


import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.cloud.interceptor.InvocationInterceptor;
import cn.evun.sweet.framework.core.cloud.interceptor.InvocationInterceptorChain;
import cn.evun.sweet.framework.core.cloud.interceptor.InvocationInterceptorSelector;
import cn.evun.sweet.framework.core.cloud.logging.CloudServiceInvocationLogger;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import feign.*;
import feign.codec.Encoder;
import feign.codec.ErrorDecoder;
import feign.hystrix.HystrixFeign;
import feign.slf4j.Slf4jLogger;
import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;

public class CloudServiceClientProxyFactoryBean implements FactoryBean<Object>, ApplicationContextAware {
    private static final Logger logger = LoggerFactory.getLogger(CloudServiceClientProxyFactoryBean.class);

    private String cloudServiceClassName;

    private String cloudServiceName;

    private String cloudServiceVersion;

    private Class cloudServiceClientClazz;

    private CloudApplication cloudApplication;

    private Environment environment;

    private ApplicationContext applicationContext;

    private Encoder feignEncoder;

    private FeignDecoderWrapper feignDecoderWrapper;

    private Contract feignContract;

    @Autowired(required = false)
    private CloudServiceInvocationLogger[] cloudServiceInvocationLoggers;

    @Autowired(required = false)
    private InvocationInterceptor[] interceptors;

    @Autowired(required = false)
    private InvocationInterceptorSelector invocationInterceptorSelector;

    private ISerializer jsonSerializer = new JSONSerializer();

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    protected void initializeDependencies() {
        feignEncoder = this.applicationContext.getBean(Encoder.class);
        feignContract = this.applicationContext.getBean(Contract.class);
        feignDecoderWrapper = this.applicationContext.getBean(FeignDecoderWrapper.class);
        feignDecoderWrapper.setCloudServiceInvocationLoggers(this.cloudServiceInvocationLoggers);
    }

    protected void initializeInterceptors() {
        if(this.invocationInterceptorSelector == null) {
            this.invocationInterceptorSelector = new InvocationInterceptorSelector.Default();
        }
        this.interceptors = this.invocationInterceptorSelector.select(this.interceptors);
    }

    @Override
    public Object getObject() throws Exception {
        this.initializeDependencies();
        this.initializeInterceptors();
        return HystrixFeign.builder()
                .decoder(feignDecoderWrapper.getDecoder())
                .encoder(feignEncoder)
                .contract(feignContract)
                .errorDecoder(new ErrorDecoder() {
                    @Override
                    public Exception decode(String methodKey, Response response) {
                        if (response.status() != HttpStatus.SC_NOT_FOUND) {
                            //这里记录响应日志
                            Collection<String> targetHeader = response.headers().get(Constants.HttpRequestTrace.HEADER_TRACE_ID);
                            if (targetHeader.size() == 1) {
                                //调用的服务是Sweet框架做的, 尝试解析json错误
                                Collection<String> contentTypes = response.headers().get(HttpHeaders.CONTENT_TYPE);
                                if (contentTypes.size() == 1 && MediaType.APPLICATION_JSON_UTF8.equals(MediaType.valueOf(contentTypes.iterator().next()))) {
                                    InputStream inputStream = null;
                                    try {
                                        inputStream = response.body().asInputStream();
                                        APIResponse apiResponse = jsonSerializer.deserialize(Util.toByteArray(inputStream), APIResponse.class);
                                        return new FeignInvocationException(response.status(), apiResponse.getCode(), apiResponse.getMessage());
                                    } catch (Exception e) {
                                        logger.error(e.getMessage(), e);
                                    } finally {
                                        if (inputStream != null) {
                                            try {
                                                inputStream.close();
                                            } catch (IOException e) {
                                                ; //handled
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return new ErrorDecoder.Default().decode(methodKey, response);
                    }
                })
                .logger(new Slf4jLogger(CloudServiceClientProxyFactoryBean.class))
                .requestInterceptor(new RequestInterceptor() {
                    @Override
                    public void apply(RequestTemplate requestTemplate) {
                        ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
                        InvocationInterceptorChain interceptorChain = new InvocationInterceptorChain(interceptors);
                        interceptorChain.next(cloudServiceName, requestTemplate.url(), requestTemplate);
                        //记录请求日志
                        logRequest(requestTemplate.url(), cloudServiceName, tracer.getTraceId());
                    }
                })
                .options(new Request.Options(5000, 3000))
                .target(new LoadBalanceSupportCloudServiceTarget(this.cloudServiceClientClazz));
    }

    @Override
    public Class<?> getObjectType() {
        return this.cloudServiceClientClazz;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    public String getCloudServiceClassName() {
        return cloudServiceClassName;
    }

    public void setCloudServiceClassName(String cloudServiceClassName) {
        this.cloudServiceClassName = cloudServiceClassName;
        try {
            this.cloudServiceClientClazz = Class.forName(cloudServiceClassName);
        } catch (ClassNotFoundException e) {
            throw new CloudException("未找到云服务接口: " + cloudServiceClassName, e);
        }
    }

    public String getCloudServiceName() {
        return cloudServiceName;
    }

    public void setCloudServiceName(String cloudServiceName) {
        this.cloudServiceName = cloudServiceName;
    }

    private String lookupService() {
        return this.cloudApplication.getCloudClient().getCloudServiceLookup().lookupService(this.cloudServiceName, this.cloudServiceVersion);
    }

    public CloudApplication getCloudApplication() {
        return cloudApplication;
    }

    public void setCloudApplication(CloudApplication cloudApplication) {
        this.cloudApplication = cloudApplication;
    }

    public String getCloudServiceVersion() {
        return cloudServiceVersion;
    }

    public void setCloudServiceVersion(String cloudServiceVersion) {
        this.cloudServiceVersion = cloudServiceVersion;
    }

    public Environment getEnvironment() {
        return environment;
    }

    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    private void logRequest(String url, String targetApp, String traceId) {
        if (this.cloudServiceInvocationLoggers != null) {
            for (CloudServiceInvocationLogger cloudServiceInvocationLogger : this.cloudServiceInvocationLoggers) {
                try {
                    cloudServiceInvocationLogger.logRequest(url, this.cloudApplication.getAppName(), this.cloudApplication.getAppId(), targetApp, traceId);
                } catch (Exception e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
    }

    private void logResponse(String traceId, String targetApp, String targetAppId, boolean success, Throwable error) {
        if (this.cloudServiceInvocationLoggers != null) {
            for (CloudServiceInvocationLogger cloudServiceInvocationLogger : this.cloudServiceInvocationLoggers) {
                try {
                    cloudServiceInvocationLogger.logResponse(traceId, targetApp, targetAppId, success, error);
                } catch (Exception e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
    }

    private class LoadBalanceSupportCloudServiceTarget implements Target {
        private Class type;

        public LoadBalanceSupportCloudServiceTarget(Class type) {
            this.type = type;
        }

        @Override
        public Class type() {
            return this.type;
        }

        @Override
        public String name() {
            return cloudServiceName;
        }

        @Override
        public String url() {
            return lookupService();
        }

        @Override
        public Request apply(RequestTemplate input) {
            if (input.url().indexOf("http") != 0) {
                input.insert(0, this.url());
            }

            return input.request();
        }
    }
}
