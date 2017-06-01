package cn.evun.sweet.framework.storage;

/**
 * Created by zlbbq on 2017/3/14.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StorageException extends RuntimeException {
    private static final Logger logger = LoggerFactory.getLogger(StorageException.class);

    private StorageException(Throwable cause) {
        super(cause);
    }

    private StorageException(String message) {
        super(message);
    }

    public static StorageException wrap(Throwable cause) {
        return new StorageException(cause);
    }

    public static StorageException create(String message) {
        return new StorageException(message);
    }
}
