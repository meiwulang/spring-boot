package cn.evun.sweet.framework.redis;

import org.springframework.data.redis.core.RedisTemplate;

/**
 * Created by zlbbq on 16/5/24.
 */
public interface RedisServiceFacade extends RedisCacheService, RedisQueueService, RedisTopicService, RedisDistributedCounterService, RedisDistributedLockService {
    String getName();

    RedisTemplate getRedisTemplate();
}
