package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2017/2/24.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FeignInvocationException extends CloudException {
    private static final Logger logger = LoggerFactory.getLogger(FeignInvocationException.class);

    protected int httpStatus;

    protected String code;

    public FeignInvocationException(int httpStatus, String code, String message) {
        super(message);
        this.httpStatus = httpStatus;
        this.code = code;
    }

    public int getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(int httpStatus) {
        this.httpStatus = httpStatus;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
