package cn.evun.sweet.framework.common.serialize;

/**
 * Created by zlbbq on 16/5/12.
 */

public class SerializeException extends RuntimeException {

    public SerializeException(String message) {
        super(message);
    }

    public SerializeException(String message, Throwable e) {
        super(message, e);
    }

}
