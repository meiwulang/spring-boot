package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/24.
 */
public interface RedisCacheService {

    void set(String key, Object value);

    void set(String key, Object value, long expire);

    String[] keys(String pattern);

    String get(String key);

    boolean exists(String key);

    <T> T get(String key, Class<T> tpl);

    void delete(String... keys);

    void expire(String key, long expire);
}
