package cn.evun.sweet.framework.redis.monitor;

/**
 * Created by zlbbq on 16/5/31.
 */


import cn.evun.sweet.framework.redis.DefaultRedisService;
import cn.evun.sweet.framework.redis.RedisQueueObject;
import com.codahale.metrics.Counter;
import com.codahale.metrics.Gauge;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;

public class RedisQueueMetrics {
//    private static final Logger logger = LoggerFactory.getLogger(RedisQueueMetrics.class);

    /**
     * 队列监控指标:
     * 1. push: timer
     * 2. pop: timer
     * 3. handler: timer
     * 4. handler error: counter
     * 5. remaining: gauge
     * */

    protected RedisServiceMetrics redisServiceMetrics;

    protected RedisQueueObject queue;

    protected Timer pushTimer;

    protected Counter pushErrorCounter;

    protected Timer popTimer;

    protected Counter popErrorCounter;

    protected Timer handlerTimer;

    protected Counter handlerErrorCounter;

    protected Gauge<Long> remaining;

    protected boolean initialized = false;

    public RedisQueueMetrics(RedisServiceMetrics redisServiceMetrics, RedisQueueObject queue) {
        this.redisServiceMetrics = redisServiceMetrics;
        this.queue = queue;
    }

    protected void initialize() {
        this.pushTimer = this.redisServiceMetrics.metricRegistry.timer(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.queue.getName(), "push"));
        this.pushErrorCounter = this.redisServiceMetrics.metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.queue.getName(), "push.error"));
        this.popTimer = this.redisServiceMetrics.metricRegistry.timer(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.queue.getName(), "pop"));
        this.popErrorCounter = this.redisServiceMetrics.metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.queue.getName(), "pop.error"));
        this.handlerTimer = this.redisServiceMetrics.metricRegistry.timer(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.queue.getName(), "handle"));
        this.handlerErrorCounter = this.redisServiceMetrics.metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.queue.getName(), "handle.error"));
        this.remaining = this.redisServiceMetrics.metricRegistry.register(MetricRegistry.name(DefaultRedisService.class, this.redisServiceMetrics.redisService.getName(), "queue", this.queue.getName(), "remaining"), new Gauge<Long>() {
            public Long getValue() {
                return redisServiceMetrics.redisService.llen(queue);
            }
        });

        this.initialized = true;
    }

    public boolean isInitialized() {
        return this.initialized;
    }
}
