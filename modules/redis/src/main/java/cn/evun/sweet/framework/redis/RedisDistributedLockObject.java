package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/23.
 */


public class RedisDistributedLockObject extends RedisKeyBindingObject {
//    private static final Logger logger = LoggerFactory.getLogger(RedisDistributedLockObject.class);

    private long selfReleaseExpired;

    private static final long DEFAULT_EXPIRED = 0L;

    private static final String DLOCK_PREFIX = "sweet:dlock:";

    public RedisDistributedLockObject(String name) {
        this(name, DEFAULT_EXPIRED);
    }

    public RedisDistributedLockObject(String name, long expired/*in seconds*/) {
        super(name, DLOCK_PREFIX);
        this.selfReleaseExpired = expired;
    }

    public long getSelfReleaseExpired() {
        return selfReleaseExpired;
    }

    public void setSelfReleaseExpired(long selfReleaseExpired) {
        this.selfReleaseExpired = selfReleaseExpired;
    }
}
