package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/6/1.
 */


import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.Subscription;

public class RedisSubscriptionWrapper {
//    private static final Logger logger = LoggerFactory.getLogger(RedisSubscriptionWrapper.class);

    private RedisConnection connection;

    public RedisSubscriptionWrapper() {}

    public RedisSubscriptionWrapper(RedisConnection connection) {
        wrapSubscribedConnection(connection);
    }

    public void wrapSubscribedConnection(RedisConnection connection) {
        this.connection = connection;
    }

    public Subscription getSubscription() {
        return this.connection != null ? this.connection.getSubscription() : null;
    }
}
