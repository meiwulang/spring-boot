package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/24.
 */
public interface RedisDistributedLockService {
    boolean lock(RedisDistributedLockObject dlock);

    void unlock(RedisDistributedLockObject dlock);
}
