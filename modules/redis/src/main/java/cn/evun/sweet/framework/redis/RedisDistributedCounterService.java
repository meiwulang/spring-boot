package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/24.
 */
public interface RedisDistributedCounterService {
    long getCurrent(RedisDistributedCounterObject instance);

    long increase(RedisDistributedCounterObject dcounter, int val);

    long decrease(RedisDistributedCounterObject dcounter, int val);

    void delete(RedisDistributedCounterObject dcounter);
}
