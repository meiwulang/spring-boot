package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/6/2.
 */


public class RedisKeyNamespace {
//    private static final Logger logger = LoggerFactory.getLogger(RedisKeyNamespace.class);

    protected String[] parts;

    private String prefix;

    public RedisKeyNamespace(String ...parts) {
        if(parts.length == 0) {
            this.parts = new String[0];
        }

        else if(parts.length == 1) {
            this.parts = parts[0].split("\\.");
        }

        else {
            this.parts = parts;
        }

        this.buildPrefix();
    }

    private void buildPrefix() {
        StringBuilder sb = new StringBuilder();
        for(String part : this.parts) {
            sb.append(part).append(":");
        }
        this.prefix = sb.toString();
    }

    public String key(String key) {
        return this.prefix + key;
    }

    public RedisCacheObject cache(String key) {
        return new RedisCacheObject(this.key(key));
    }

    public RedisQueueObject queue(String key) {
        return new RedisQueueObject(this.key(key));
    }

    public RedisTopicObject topic(String key) {
        return new RedisTopicObject(this.key(key));
    }

    public RedisDistributedCounterObject dcounter(String key) {
        return new RedisDistributedCounterObject(this.key(key));
    }

    public RedisDistributedLockObject dlock(String key) {
        return new RedisDistributedLockObject(this.key(key));
    }
}
