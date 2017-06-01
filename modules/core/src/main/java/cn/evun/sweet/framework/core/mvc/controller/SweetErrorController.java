package cn.evun.sweet.framework.core.mvc.controller;

/**
 * Created by zlbbq on 16/5/5.
 */

import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.mvc.error.ErrorHandler;
import cn.evun.sweet.framework.core.mvc.error.chain.ChainedErrorHandler;
import cn.evun.sweet.framework.core.mvc.error.chain.ChainedErrorHandlerSelector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.DispatcherServlet;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Method;

@ConditionalOnExpression("'${sweet.framework.core.mvc.error.handle:true}'=='true'")
@Controller
@ApiIgnore
public class SweetErrorController implements ErrorController {

    private static final Logger logger = LoggerFactory.getLogger(SweetErrorController.class);

    @Value("${sweet.framework.core.mvc.error.handler.outputStackTrace:false}")
    private boolean outputStackTrace;

    @Autowired(required = false)
    private ErrorHandler errorHandler;

    @Autowired(required = false)
    private ChainedErrorHandler[] chainedErrorHandlers;

    @Autowired(required = false)
    private ChainedErrorHandlerSelector chainedErrorHandlerSelector;

    private boolean isChainedErrorHandlerBuilt = false;

    private static final String PATH = "/error";

    private void buildChainedErrorHandlers() {
        if(!this.isChainedErrorHandlerBuilt) {
            synchronized (SweetErrorController.class) {
                //获取到锁后再次确认有没有被初始化
                if(this.isChainedErrorHandlerBuilt) {
                    return ;
                }
                if (this.chainedErrorHandlers == null) {
                    this.chainedErrorHandlers = new ChainedErrorHandler[0];
                }

                if (this.chainedErrorHandlerSelector == null) {
                    this.chainedErrorHandlerSelector = new ChainedErrorHandlerSelector.Default();
                }

                this.chainedErrorHandlers = this.chainedErrorHandlerSelector.select(this.chainedErrorHandlers);
                this.isChainedErrorHandlerBuilt = true;
            }
        }
    }

    @RequestMapping(value = PATH)
    public String error(HttpServletRequest request, HttpServletResponse response) throws Exception {
        this.buildChainedErrorHandlers();

        int httpStatus = response.getStatus();

        Throwable t = null;
        Object err = request.getAttribute(DispatcherServlet.EXCEPTION_ATTRIBUTE);
        if (err instanceof Throwable) {
            t = (Throwable) err;
        } else {
            //Fixme : Spring Boot Hack, 这样取错误我也是醉了
            err = request.getAttribute("org.springframework.boot.autoconfigure.web.DefaultErrorAttributes.ERROR");
            if (err instanceof Throwable) {
                t = (Throwable) err;
            }
            else {
                err = request.getAttribute("javax.servlet.error.exception");
                if (err instanceof Throwable) {
                    t = (Throwable) err;
                }
            }
        }

        if (t != null) {
            ThreadLocalProcessTracer tracer = null;
            String traceId = (String)request.getAttribute(Constants.HttpRequestTrace.REQUEST_ATTRIBUTE_TRACE_ID);
            if(StringUtils.hasText(traceId)) {
                tracer = ThreadLocalProcessTracer.get(traceId);             //此traceId已经在RequestTraceFilter中被clear, 目的是为了实现logger打印requestId
            }
            boolean handledByChainedHandler = false;
            for(ChainedErrorHandler chainedErrorHandler : this.chainedErrorHandlers) {
                if(chainedErrorHandler.isTarget(t)) {
                    logger.debug("ERROR [" + t.getClass().getName() + "] will be handled by ChainedErrorHandler[" + chainedErrorHandler.getName() + "]");
                    try {
                        chainedErrorHandler.handleError(t, request, response);
                    }catch(Exception e) {
                        logger.error(e.getMessage(), e);
                    }
                    handledByChainedHandler = true;
                    break;
                }
            }

            if (!handledByChainedHandler && this.errorHandler != null) {
                try {
                    Method m = this.errorHandler.getClass().getMethod("handleError", t.getClass(), HttpServletRequest.class, HttpServletResponse.class);
                    m.invoke(this.errorHandler, t, request, response);
                } catch (NoSuchMethodException e) {
                    this.errorHandler.handleError(t, request, response);
                }
            } else {
                this.outputErrorStack(t, request, response);
            }

            try {
                //只有在没有被任何ChainedErrorHandler处理且Response Status Code为500的情况才会打印异常栈
                if(!handledByChainedHandler) {
                    if (response.getStatus() == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                        logger.error(t.getMessage(), t);
                    } else {
                        logger.error(t.getMessage());
                    }
                }
            } finally {
                if (tracer != null) {
                    ThreadLocalProcessTracer.clean();
                }
            }

            return null;
        }

        // 404错误处理
        if(httpStatus == HttpStatus.NOT_FOUND.value()) {
            if(this.errorHandler != null) {
                this.errorHandler.handle404(request, response);
            }
            else {
                this.output404(request, response);
            }
            return null;
        }

        return null;
    }


    public String getErrorPath() {
        return PATH;
    }

    private void outputErrorStack(Throwable t, HttpServletRequest request, HttpServletResponse response) throws Exception {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        pw.println("<h1>ERROR - " + HttpStatus.INTERNAL_SERVER_ERROR.value() + " - " + request.getRequestURI() +"</h1>");
        if(outputStackTrace) {
            pw.println("<pre>");
            t.printStackTrace(pw);
            pw.println("</pre>");
        }
        byte[] data = StringUtils.getBytes(sw.toString());
        response.setContentType("text/html;charset=utf-8");
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.setContentLength(data.length);
        response.getOutputStream().write(data);
        sw.close();
    }

    public void output404(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String uri = (String)request.getAttribute("javax.servlet.error.request_uri");
        StringBuffer output = new StringBuffer("<h1>Resource Not Found -> ");
        output.append(uri).append("</h1>");
        byte []data = StringUtils.getBytes(output.toString());
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setContentType("text/html;charset=utf-8");
        response.setContentLength(data.length);
        response.getOutputStream().write(data);
    }
}
