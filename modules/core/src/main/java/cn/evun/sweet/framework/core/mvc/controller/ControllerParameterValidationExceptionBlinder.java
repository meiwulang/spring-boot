package cn.evun.sweet.framework.core.mvc.controller;

/**
 * Created by zlbbq on 16/6/14.
 */


import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import cn.evun.sweet.framework.core.mvc.controller.validation.ControllerParameterValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.NativeWebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//@ControllerAdvice
/**
 * 这个类的功能已经由DefaultErrorHandler#handleError(ControllerParameterValidationException validationException, HttpServletRequest request, HttpServletResponse response)实现了
 * 2.1.1以后不再使用
 * */
@Deprecated
public class ControllerParameterValidationExceptionBlinder {
//    private static final Logger logger = LoggerFactory.getLogger(ControllerParameterValidationExceptionBlinder.class);

    private static JSONSerializer jsonSerializer = new JSONSerializer();

    @ExceptionHandler(ControllerParameterValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String processControllerParameterValidationException(NativeWebRequest request, ControllerParameterValidationException validationException) throws Exception {
        APIResponse apiResponse = new APIResponse(APIResponse.VALIDATION_FAIL, validationException.getErrorInfo());
        HttpServletRequest httpServletRequest = (HttpServletRequest)(request.getNativeRequest());
        HttpServletResponse httpServletResponse = (HttpServletResponse)(request.getNativeResponse());
        this.outputAPIResponse(apiResponse, httpServletResponse, HttpStatus.BAD_REQUEST.value());
        return null;
    }

    protected void outputAPIResponse(APIResponse apiResponse, HttpServletResponse response, int httpStatus) throws Exception {
        byte[] data = jsonSerializer.serialize(apiResponse);
        response.setStatus(httpStatus);
        response.setContentType("application/json;charset=utf-8");
        response.setContentLength(data.length);
        response.getOutputStream().write(data);
    }
}
