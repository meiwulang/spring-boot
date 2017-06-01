package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/24.
 */


public class RedisTopicObject extends RedisKeyBindingObject {
//    private static final Logger logger = LoggerFactory.getLogger(RedisTopicObject.class);

    private static final String REDIS_TOPIC_PREFIX = "sweet:topic:";

    public RedisTopicObject(String name) {
        super(name, REDIS_TOPIC_PREFIX);
    }

}
