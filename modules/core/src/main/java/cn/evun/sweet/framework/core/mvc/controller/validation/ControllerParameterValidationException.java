package cn.evun.sweet.framework.core.mvc.controller.validation;

/**
 * Created by zlbbq on 16/6/14.
 */


import java.util.Map;

public class ControllerParameterValidationException extends RuntimeException {
//    private static final Logger logger = LoggerFactory.getLogger(ControllerParameterValidationException.class);

    private Map<String, String> errorInfo;

    public ControllerParameterValidationException(Map<String, String> errorInfo) {
        super("Request parameter validation failed!");
        this.errorInfo = errorInfo;
    }

    public Map<String, String> getErrorInfo() {
        return this.errorInfo;
    }
}
