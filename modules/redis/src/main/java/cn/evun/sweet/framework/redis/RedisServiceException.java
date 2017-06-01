package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/26.
 */


import org.springframework.dao.DataAccessException;

public class RedisServiceException extends DataAccessException {
//    private static final Logger logger = LoggerFactory.getLogger(RedisServiceException.class);

    public RedisServiceException(Throwable cause) {
        this(cause.getMessage(), cause);
    }

    public RedisServiceException(String msg) {
        super(msg);
    }

    public RedisServiceException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
