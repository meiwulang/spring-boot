package cn.evun.sweet.framework.redis.monitor;

/**
 * Created by zlbbq on 16/5/31.
 */


import cn.evun.sweet.framework.redis.DefaultRedisService;
import cn.evun.sweet.framework.redis.RedisTopicObject;
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;

public class RedisTopicMetrics {
//    private static final Logger logger = LoggerFactory.getLogger(RedisTopicMetrics.class);

    /**
     * 队列监控指标:
     * 1. push: timer
     * 2. pop: timer
     * 3. process: timer
     * 4. process error: counter
     * */

    protected RedisServiceMetrics redisServiceMetrics;

    protected RedisTopicObject topic;

    protected Timer publishTimer;

    protected Counter publishErrorCounter;

    protected Counter receivedCounter;

    protected Timer handlerTimer;

    protected Counter handlerErrorCounter;

    protected boolean initialized = false;

    public RedisTopicMetrics(RedisServiceMetrics redisServiceMetrics, RedisTopicObject topic) {
        this.redisServiceMetrics = redisServiceMetrics;
        this.topic = topic;
    }

    public void initialize() {
        this.publishTimer = this.redisServiceMetrics.metricRegistry.timer(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "topic", this.topic.getName(), "publish"));
        this.publishErrorCounter = this.redisServiceMetrics.metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "topic", this.topic.getName(), "publish.error"));
        this.receivedCounter = this.redisServiceMetrics.metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "topic", this.topic.getName(), "received"));
        this.handlerTimer = this.redisServiceMetrics.metricRegistry.timer(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.topic.getName(), "handle"));
        this.handlerErrorCounter = this.redisServiceMetrics.metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.topic.getName(), "handle.error"));
        this.initialized = true;
    }

    public boolean isInitialized() {
        return this.initialized;
    }
}
