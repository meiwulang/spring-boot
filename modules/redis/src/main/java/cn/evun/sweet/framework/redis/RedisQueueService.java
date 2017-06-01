package cn.evun.sweet.framework.redis;

import java.util.concurrent.ExecutorService;

/**
 * Created by zlbbq on 16/5/24.
 */


public interface RedisQueueService {
    long llen(RedisQueueObject queue);

    long push(RedisQueueObject queue, Object msg);

    <T> T pop(RedisQueueObject queue, Class<T> tpl);

    ExecutorService listen(RedisQueueObject queue, Class tpl, int concurrent, RedisMessageListener l);

}
