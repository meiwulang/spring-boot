package cn.evun.sweet.framework.core.mvc.error;

/**
 * Created by zlbbq on 16/6/14.
 */


import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.cloud.FeignInvocationException;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import cn.evun.sweet.framework.core.mvc.BusinessException;
import cn.evun.sweet.framework.core.mvc.controller.validation.ControllerParameterValidationException;
import com.netflix.hystrix.exception.HystrixRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MissingServletRequestParameterException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Map;
import java.util.Set;

public class DefaultErrorHandler implements ErrorHandler {
    private static final Logger logger = LoggerFactory.getLogger(DefaultErrorHandler.class);

    private static JSONSerializer jsonSerializer = new JSONSerializer();

    private boolean outputStackTrace = false;

    public DefaultErrorHandler() {
        this(false);
    }

    public DefaultErrorHandler(boolean outputStackTrace) {
        this.outputStackTrace = outputStackTrace;
    }

    public void handle404(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String uri = (String) request.getAttribute("javax.servlet.error.request_uri");
        StringBuffer output = new StringBuffer("<h1>Resource Not Found -> ");
        output.append(uri).append("</h1>");
        byte[] data = StringUtils.getBytes(output.toString());
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setContentType("text/html;charset=utf-8");
        response.setContentLength(data.length);
        response.getOutputStream().write(data);
    }

    public void handleError(Throwable t, HttpServletRequest request, HttpServletResponse response) throws Exception {
        APIResponse apiResponse = new APIResponse(APIResponse.FAIL, t.getClass().getName(), this.getErrorDetailInfo(t));
        this.outputAPIResponse(apiResponse, request, response);
    }

    public void handleError(BindException bindException, HttpServletRequest request, HttpServletResponse response) throws Exception {
        BindingResult bindingResult = bindException.getBindingResult();
        APIResponse apiResponse = APIResponse.fail(bindingResult);
        this.outputAPIResponse(apiResponse, request, response);
    }

    public void handleError(ControllerParameterValidationException validationException, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, String> errorInfo = validationException.getErrorInfo();
        StringBuffer sErrorInfo = new StringBuffer();
        if(errorInfo != null) {
            Set<String> keys = errorInfo.keySet();
            for(String key : keys) {
                sErrorInfo.append(key).append(":").append(errorInfo.get(key)).append("\n");
            }
        }
        APIResponse apiResponse = new APIResponse(APIResponse.VALIDATION_FAIL, null, sErrorInfo.toString());
        this.outputAPIResponse(apiResponse, request, response, HttpStatus.BAD_REQUEST.value());
    }

    public void handleError(MissingServletRequestParameterException missingServletRequestParameterException, HttpServletRequest request, HttpServletResponse response) throws Exception {
        APIResponse apiResponse = new APIResponse(APIResponse.BAD_PARAMETER, null, this.getErrorDetailInfo(missingServletRequestParameterException));
        this.outputAPIResponse(apiResponse, request, response);
    }

    public void handleError(BusinessException businessException, HttpServletRequest request, HttpServletResponse response) throws Exception {
        APIResponse apiResponse = APIResponse.fail(businessException.getMessage());
        this.outputAPIResponse(apiResponse, request, response);
    }

    public void handleError(HystrixRuntimeException hystrixRuntimeException, HttpServletRequest request, HttpServletResponse response) throws Exception {
        APIResponse apiResponse;
        //向上传递错误, 此错误来源类: CloudServiceClientProxyFactoryBean#getObject()
        if(hystrixRuntimeException.getCause() instanceof FeignInvocationException) {
            response.setStatus(((FeignInvocationException) hystrixRuntimeException.getCause()).getHttpStatus());
            apiResponse = new APIResponse(((FeignInvocationException) hystrixRuntimeException.getCause()).getCode(), null, hystrixRuntimeException.getCause().getMessage());
        }
        else {
            apiResponse = APIResponse.withCodeAndMessageArgs(APIResponse.RPC_FAIL, hystrixRuntimeException.getMessage());
        }
        this.outputAPIResponse(apiResponse, request, response);
    }

    protected String getErrorDetailInfo(Throwable t) throws Exception {
        String errorMessage = t.getMessage();
        if (this.outputStackTrace) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            t.printStackTrace(pw);
            errorMessage = sw.toString();
            sw.close();
        }
        return errorMessage;
    }

    protected void outputAPIResponse(APIResponse apiResponse, HttpServletRequest request, HttpServletResponse response) throws Exception {
        this.outputAPIResponse(apiResponse, request, response, response.getStatus());
    }

    protected void outputAPIResponse(APIResponse apiResponse, HttpServletRequest request, HttpServletResponse response, int httpStatus) throws Exception {
        logger.debug("output request [{}] error with json representation ", request.getRequestURI());
        byte[] data = jsonSerializer.serialize(apiResponse);
        response.setStatus(httpStatus);
        response.setContentType("application/json;charset=utf-8");
        response.setContentLength(data.length);
        response.getOutputStream().write(data);
    }
}
