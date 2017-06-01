package cn.evun.sweet.framework.core.mvc;

import org.slf4j.Logger;

import java.text.MessageFormat;

/**
 * Created by zlbbq on 16/7/5.
 */


public class BusinessException extends RuntimeException {
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(BusinessException.class);

    protected String errorCode = APIResponse.FAIL;

    protected String[] errorMessageArguments = new String[0];

    protected APIResponse apiResponse;

    protected BusinessException() {
        this("");
    }

    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String[] getErrorMessageArguments() {
        return errorMessageArguments;
    }

    public void setErrorMessageArguments(String[] errorMessageArguments) {
        this.errorMessageArguments = errorMessageArguments;
    }

    public static BusinessException withErrorCode(String errorCode) {
        BusinessException businessException = new BusinessException();
        businessException.errorCode = errorCode;
        return businessException;
    }

    public static BusinessException fromAPIResponse(APIResponse apiResponse) {
        BusinessException businessException = new BusinessException();
        if(apiResponse == null) {
            apiResponse = APIResponse.fail("NULL");
        }
        businessException.apiResponse = apiResponse;
        return businessException;
    }

    public BusinessException withErrorMessageArguments(String... errorMessageArguments) {
        if (errorMessageArguments != null) {
            this.errorMessageArguments = errorMessageArguments;
        }
        return this;
    }

    public APIResponse response() {
        if (this.apiResponse != null) {
            return this.apiResponse;
        }

        APIResponse apiResponse = APIResponse.widthCode(this.getErrorCode());
        if (this.getErrorMessageArguments() != null && this.getErrorMessageArguments().length > 0) {
            try {
                apiResponse.setMessage(MessageFormat.format(apiResponse.getMessage(), this.getErrorMessageArguments()));
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }

        return apiResponse;
    }
}
