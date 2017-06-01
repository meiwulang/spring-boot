package cn.evun.sweet.framework.core.mvc.filter;

/**
 * Created by zlbbq on 16/6/3.
 */


import cn.evun.sweet.framework.common.tracer.ProcessContext;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.cloud.CloudApplication;
import cn.evun.sweet.framework.core.cloud.CloudConstants;
import cn.evun.sweet.framework.core.monitor.ApplicationPerformanceMetrics;
import cn.evun.sweet.framework.core.mvc.BusinessException;
import com.codahale.metrics.Timer;
import org.apache.catalina.connector.RequestFacade;
import org.apache.catalina.connector.ResponseFacade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HttpRequestTraceFilter extends SweetFilter {
    private static final Logger logger = LoggerFactory.getLogger(HttpRequestTraceFilter.class);

    private SessionUserFetcher sessionUserFetcher;

    private ApplicationInfo applicationInfo;

    private CloudApplication cloudApplication;

    private ApplicationPerformanceMetrics applicationPerformanceMetrics;

    private RequestStatistic requestStatistic;

    private static final String[] STATIC_RESOURCE_SUFFIX = {
            ".ico", ".jpg", ".png", ".gif", ".swf", ".html", ".js", ".css", ".swf"
    };

    public HttpRequestTraceFilter(ApplicationInfo applicationInfo, SessionUserFetcher sessionUserFetcher, RequestStatistic requestStatistic) {
        this.applicationInfo = applicationInfo;
        this.sessionUserFetcher = sessionUserFetcher;
        this.requestStatistic = requestStatistic;
        if (this.applicationInfo instanceof CloudApplication) {
            cloudApplication = (CloudApplication) applicationInfo;
        }
        this.applicationPerformanceMetrics = this.applicationInfo.getApplicationPerformanceMetrics();
    }

    private static boolean isStaticResource(String uri) {
        for (String suffix : STATIC_RESOURCE_SUFFIX) {
            if (uri.endsWith(suffix)) {
                return true;
            }
        }
        return false;
    }

    private long getRequestContentLength(HttpServletRequest request) {
        if (request instanceof RequestFacade) {
            request.getContentLengthLong();
        }
        return 0;
    }

    //TODO 通过反射去调用以支持不同的容器, 因为目前主要使用的是Tomcat, 先支持Tomcat再说
    private long getResponseContentLength(HttpServletResponse response) {
        if (response instanceof ResponseFacade) {
            return ((ResponseFacade) response).getContentWritten();
        }
        return 0;
    }

    @Override
    public void doFilterInternal(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String uri = httpRequest.getRequestURI();
        if (isStaticResource(uri)) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        Timer.Context requestContext = this.applicationPerformanceMetrics.onRequestStart(getRequestContentLength(httpRequest));
        boolean success = true;
        //获取当前线程的process tracer, 如果HTTP HEADER中有"trace-id", 则将当前线程的tracer的traceId设置成header中的值
        ThreadLocalProcessTracer tracer;
        String traceId = this.getTraceIdFromRequestHeader(httpRequest);
        if (StringUtils.hasText(traceId)) {
            tracer = ThreadLocalProcessTracer.get(traceId);
        } else {
            tracer = ThreadLocalProcessTracer.get();
        }
        //set tracer attributes
        tracer.setAttribute("application", applicationInfo.getIdentifier());
        tracer.setRootAttribute("uri", uri);
        tracer.setRootAttribute("method", httpRequest.getMethod().toLowerCase());
        tracer.setRootAttribute("sessionId", httpRequest.getSession().getId());
        tracer.setRootAttribute("cloudServiceFrom", getCloudServiceFrom(httpRequest));
        tracer.setRootAttribute("cloudServiceFromIndex", getCloudServiceFromIndex(httpRequest));
        httpRequest.setAttribute(Constants.HttpRequestTrace.REQUEST_ATTRIBUTE_TRACE_ID, tracer.getTraceId());
        this.setHeaders(httpRequest, httpResponse, tracer);
        boolean userIdSet = false;
        String userId = this.sessionUserFetcher.getUserId(httpRequest);
        if (StringUtils.hasText(userId)) {
            tracer.setRootAttribute("user", userId);
            userIdSet = true;
        }

        tracer.beginTrace();

        ProcessContext requestCtx = tracer.join(ProcessContext.Type.Controller, uri);
        requestStatistic.increaseRequestCount();
        try {
            filterChain.doFilter(servletRequest, servletResponse);
        } catch (Exception e) {
            if (e.getCause() instanceof BusinessException) {
                tracer.setRootAttribute("is-business-error", true);
                tracer.setRootAttribute("error", getErrorMessage((BusinessException) (e.getCause())));
                success = true;     //BusinessException按成功处理
            } else {
                if (e.getCause() != null) {
                    if ("org.apache.shiro.authz.UnauthorizedException".equals(e.getCause().getClass().getName())) {
                        httpResponse.setStatus(HttpServletResponse.SC_OK);
                        tracer.disableThisTraceLog();
                    }
                } else {
                    httpResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                }
                String errorMessage = e.getCause() != null ? e.getCause().getMessage() : e.getMessage();
                tracer.setRootAttribute("error", errorMessage);
                success = false;
            }
            throw e;
        } finally {
            if (!userIdSet) {
                userId = this.sessionUserFetcher.getUserId(httpRequest);
                if (StringUtils.hasText(userId)) {
                    tracer.setRootAttribute("user", userId);
                }
            }
            if (!success) {
                tracer.setRootAttribute("status", httpResponse.getStatus());
            } else {
                tracer.setRootAttribute("status", HttpStatus.OK.value());
            }
            requestCtx.stop();
            tracer.stopTrace();
            int status = httpResponse.getStatus();
            // 40x 通常表示请求错误, 不打印日志跟踪
            if (needLog(httpRequest, status)) {
                tracer.log("REQUEST TRACE");
            }
            applicationPerformanceMetrics.onRequestFinish(requestContext, success, getResponseContentLength(httpResponse));
            requestStatistic.decreaseRequestCount();
            //clean
            ThreadLocalProcessTracer.clean();
        }
    }

    //只打印200和500且请求中没有明确标识出关闭请求日志的情况
    private boolean needLog(HttpServletRequest request, int status) {
        return status == HttpStatus.OK.value() || status == HttpStatus.INTERNAL_SERVER_ERROR.value();
    }

    private String getTraceIdFromRequestHeader(HttpServletRequest request) {
        return request.getHeader(Constants.HttpRequestTrace.HEADER_TRACE_ID);
    }

    private String getCloudServiceFrom(HttpServletRequest request) {
        return request.getHeader(CloudConstants.HEADER_CLOUD_SERVICE_FROM);
    }

    private String getCloudServiceFromIndex(HttpServletRequest request) {
        return request.getHeader(CloudConstants.HEADER_CLOUD_SERVICE_FROM_INDEX);
    }

    private String getErrorMessage(BusinessException businessException) {
        return businessException.response().getMessage();
    }

    private void setHeaders(HttpServletRequest request, HttpServletResponse response, ThreadLocalProcessTracer tracer) {
        response.setHeader(Constants.HttpRequestTrace.HEADER_TRACE_ID, tracer.getTraceId());
        response.setHeader(Constants.HttpRequestTrace.HEADER_APP, this.applicationInfo.getAppName());
        response.setHeader(Constants.HttpRequestTrace.HEADER_APP_ID, this.applicationInfo.getAppId());
    }
}
