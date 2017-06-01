package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/23.
 */
public interface RedisMessageListener {
    void onMessage(RedisKeyBindingObject source, Object message);
}
