package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/23.
 */


public class RedisDistributedCounterObject extends RedisKeyBindingObject {
//    private static final Logger logger = LoggerFactory.getLogger(RedisDistributedCounterObject.class);

    private static final String DCOUNTER_PREFIX = "sweet:dcounter:";

    public RedisDistributedCounterObject(String name) {
        super(name, DCOUNTER_PREFIX);
    }
}
