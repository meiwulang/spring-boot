package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/11/29.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CloudException extends RuntimeException {
    private static final Logger logger = LoggerFactory.getLogger(CloudException.class);

    public CloudException(String message, Throwable cause) {
        super(message, cause);
    }

    public CloudException(String message) {
        super(message);
    }
}
