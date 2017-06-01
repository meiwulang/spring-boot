package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/23.
 */


public class RedisCacheObject extends RedisKeyBindingObject {
//    private static final Logger logger = LoggerFactory.getLogger(RedisCacheObject.class);

    private static final String CACHE_PREFIX = "sweet:cache:";

    public RedisCacheObject(String name) {
        super(name, CACHE_PREFIX);
    }
}
