package cn.evun.sweet.framework.core.mvc;

/**
 * Created by zlbbq on 16/6/13.
 */


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

public class APIResponse<T> {
    private static final Logger logger = LoggerFactory.getLogger(APIResponse.class);

    public static final String NOT_INITIALIZED = "not-initialized";

    public static final String SUCCESS = "success";

    public static final String FAIL = "fail";

    public static final String VALIDATION_FAIL = "validation-fail";

    public static final String BAD_PARAMETER = "bad-parameter";

    public static final String UNAUTHORIZED = "unauthorized";

    public static final String USER_NOT_LOGIN = "user-not-login";

    public static final String RPC_FAIL = "rpc-fail";

    protected String code;

    protected T data;

    protected String message;

    public APIResponse() {
        this(NOT_INITIALIZED, null, null);
    }

    public APIResponse(String code) {
        this(code, null, null);
    }

    public APIResponse(String code, T data) {
        this(code, data, null);
    }

    public APIResponse(String code, T data, String message) {
        this.code = code;
        this.data = data;
        if (message == null) {
            this.message = ErrorTable.convertCode2LocaleMessage(code);
        } else {
            this.message = message;
        }
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @JsonIgnore
    public boolean isSuccess() {
        return SUCCESS.equals(this.getCode());
    }

    public static <T> APIResponse<T> success(T data) {
        return new APIResponse(SUCCESS, data);
    }

    public static APIResponse success() {
        return success(null);
    }

    public static boolean isSuccess(APIResponse apiResponse) {
        if (apiResponse == null) {
            return false;
        }

        return apiResponse.isSuccess();
    }

    public static APIResponse fail(String message) {
        return new APIResponse(FAIL, null, message);
    }

    public static APIResponse fail(Throwable t) {
        return fail(t.getMessage());
    }

    public static APIResponse widthCode(String code) {
        return new APIResponse(code);
    }

    public static <T> APIResponse<T> widthCode(String code, T data) {
        return new APIResponse<>(code, data);
    }

    public static APIResponse withCodeAndMessageArgs(String code, String... args) {
        APIResponse ret = widthCode(code, null);
        try {
            ret.setMessage(MessageFormat.format(ret.getMessage(), args));
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return ret;
    }

    public static APIResponse<BindingResult> fail(BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        for (FieldError error : bindingResult.getFieldErrors()) {
            errorMap.put(error.getField(), error.getDefaultMessage());
        }
        return new APIResponse(VALIDATION_FAIL, errorMap);
    }

    public static APIResponse response(String code) {
        return new APIResponse(code);
    }

    public static <T> APIResponse<T> response(String code, T data) {
        return new APIResponse(code, data);
    }

    public static void assertSuccess(APIResponse apiResponse) {
        if(!isSuccess(apiResponse)) {
            throw BusinessException.fromAPIResponse(apiResponse);
        }
    }
}
