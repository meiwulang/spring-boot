package cn.evun.sweet.framework.redis;

import java.util.concurrent.ExecutorService;

/**
 * Created by zlbbq on 16/5/24.
 */
public interface RedisTopicService {
    boolean publish(RedisTopicObject topic, Object data);

    @Deprecated
    /**
     * 这个方法不能处理连接断开的情况, 请使用返回Thread的重载方法, 并在外部使用Watch线程监控返回的线程存活情况
     * */
    void subscribe(RedisTopicObject topic, Class tpl, RedisSubscriptionWrapper subscriptionWrapper, RedisMessageListener l);

    Thread subscribe(RedisTopicObject topic, Class tpl, RedisSubscriptionWrapper subscriptionWrapper, RedisMessageListener l, ExecutorService threadPool);

    void unsubscribe(RedisTopicObject topic, RedisSubscriptionWrapper subscriptionWrapper);
}
