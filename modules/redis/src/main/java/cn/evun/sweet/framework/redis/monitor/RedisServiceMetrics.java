package cn.evun.sweet.framework.redis.monitor;

/**
 * Created by zlbbq on 16/5/31.
 */


import cn.evun.sweet.framework.redis.DefaultRedisService;
import cn.evun.sweet.framework.redis.RedisQueueObject;
import cn.evun.sweet.framework.redis.RedisTopicObject;
import com.codahale.metrics.Counter;
import com.codahale.metrics.Gauge;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.util.Pool;

import java.util.concurrent.ConcurrentHashMap;

public final class RedisServiceMetrics {
    private static final Logger logger = LoggerFactory.getLogger(RedisServiceMetrics.class);

    //Cheat sonar, never print any information
    private static boolean printed = false;

    protected DefaultRedisService redisService;

    protected String redisServiceName;

    //DropWizard统计
    protected MetricRegistry metricRegistry;

    /**
     * Redis Service 度量指标:
     * 1. 指令执行Timer
     * 2. 指令失败次数
     * 3. 指令成功率
     * 4. get命中次数
     * 5. get未命中次数
     * 6. get命中率
     * 7. 连接池状态(max, active, idle, wait)
     * */

    //所有的operation
    protected Timer operationTimer;

    protected Counter operationErrorCounter;

    protected Gauge<Double> operationSuccessRate;

    protected Counter getHitCounter;

    protected Counter getMissCounter;

    protected Gauge<Double> getHitRate;

    protected Gauge<Integer> poolMaxTotal;

    protected Gauge<Integer> poolActive;

    protected Gauge<Integer> poolIdle;

    protected Gauge<Integer> poolWait;

    protected ConcurrentHashMap<String, RedisQueueMetrics> queueMetrics;

    protected ConcurrentHashMap<String, RedisTopicMetrics> topicMetrics;

    // Jedis Pool, for metricRegistry
    protected Pool<Jedis> pool;

    public RedisServiceMetrics(DefaultRedisService redisService, Pool<Jedis> pool, int poolMaxTotal) {
        this.redisService = redisService;
        this.redisServiceName = this.redisService.getName();
        this.metricRegistry = new MetricRegistry();
        this.pool = pool;
        this.initMetricIndicators(poolMaxTotal);
    }

    private void initMetricIndicators(final int poolMaxTotal) {
        this.operationTimer = metricRegistry.timer(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "operation"));
        this.operationErrorCounter = metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "operation.error"));
        this.operationSuccessRate = metricRegistry.register(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "operation.success.rate"), new Gauge<Double>() {
            public Double getValue() {
                if(operationTimer.getCount() == 0) return 1.0d;
                return 1.0d - ((double)operationErrorCounter.getCount() / (double) operationTimer.getCount());
            }
        });
        this.getHitCounter = metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "get.hit"));
        this.getMissCounter = metricRegistry.counter(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "get.miss"));
        this.getHitRate = metricRegistry.register(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "get.hit.rate"), new Gauge<Double>() {
            public Double getValue() {
                if(getHitCounter.getCount() == 0 && getMissCounter.getCount() == 0) return 1.0d;
                return (double)getHitCounter.getCount() / (double)(getHitCounter.getCount() + getMissCounter.getCount());
            }
        });
        this.poolMaxTotal = metricRegistry.register(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "connection.pool.max"), new Gauge<Integer>() {
            public Integer getValue() {
                return poolMaxTotal;
            }
        });
        this.poolActive = metricRegistry.register(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "connection.pool.active"), new Gauge<Integer>() {
            public Integer getValue() {
                return pool == null ? -1 : pool.getNumActive();
            }
        });
        this.poolIdle = metricRegistry.register(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "connection.pool.idle"), new Gauge<Integer>() {
            public Integer getValue() {
                return pool == null ? -1 : pool.getNumIdle();
            }
        });
        this.poolWait = metricRegistry.register(MetricRegistry.name(DefaultRedisService.class, this.redisServiceName, "connection.pool.wait"), new Gauge<Integer>() {
            public Integer getValue() {
                return pool == null ? -1 : pool.getNumWaiters();
            }
        });
        this.queueMetrics = new ConcurrentHashMap<>();
        this.topicMetrics = new ConcurrentHashMap<>();
    }

    public Timer.Context createOperationContext(int instruction) {
        //Cheat sonar
        if(printed) {
            logger.debug("metrics instruction is unused : [{}]", instruction);
        }
        return operationTimer.time();
    }

    public void increaseGetHit() {
        this.getHitCounter.inc();
    }

    public void increaseGetMiss() {
        this.getMissCounter.inc();
    }

    public void increaseOperationError(int instruction) {
        //Cheat sonar
        if(printed) {
            logger.info("metrics instruction is unused : [{}]", instruction);
        }
        this.operationErrorCounter.inc();
    }

    public Timer.Context createQueuePushContext(RedisQueueObject queue) {
        RedisQueueMetrics qm = this.getQueueMetrics(queue);
        return qm.pushTimer.time();
    }

    public void increaseQueuePushError(RedisQueueObject queue) {
        RedisQueueMetrics qm = this.getQueueMetrics(queue);
        qm.pushErrorCounter.inc();
    }

    public void increaseQueuePopError(RedisQueueObject queue) {
        RedisQueueMetrics qm = this.getQueueMetrics(queue);
        qm.popErrorCounter.inc();
    }

    public Timer.Context createQueuePopContext(RedisQueueObject queue) {
        RedisQueueMetrics qm = this.getQueueMetrics(queue);
        return qm.popTimer.time();
    }

    public Timer.Context createQueueHandleContext(RedisQueueObject queue) {
        RedisQueueMetrics qm = this.getQueueMetrics(queue);
        return qm.handlerTimer.time();
    }

    public void increaseQueueHandleError(RedisQueueObject queue) {
        RedisQueueMetrics qm = this.getQueueMetrics(queue);
        qm.handlerErrorCounter.inc();
    }

    public Timer.Context createTopicPublishContext(RedisTopicObject topic) {
        RedisTopicMetrics tm = this.getTopicMetrics(topic);
        return tm.publishTimer.time();
    }

    public Timer.Context createTopicHandleContext(RedisTopicObject topic) {
        RedisTopicMetrics tm = this.getTopicMetrics(topic);
        return tm.handlerTimer.time();
    }

    public void increaseTopicPublishError(RedisTopicObject topic) {
        RedisTopicMetrics tm = this.getTopicMetrics(topic);
        tm.publishErrorCounter.inc();
    }

    public void increaseTopicReceived(RedisTopicObject topic) {
        RedisTopicMetrics tm = this.getTopicMetrics(topic);
        tm.receivedCounter.inc();
    }

    public void increaseTopicHandleError(RedisTopicObject topic) {
        RedisTopicMetrics tm = this.getTopicMetrics(topic);
        tm.handlerErrorCounter.inc();
    }

    public MetricRegistry getMetricRegistry() {
        return this.metricRegistry;
    }

    private RedisQueueMetrics getQueueMetrics(RedisQueueObject queue) {
        RedisQueueMetrics qm, qmNew;
        while(true) {
            qm = queueMetrics.get(queue.getRedisKey());
            if(qm == null) {
                qmNew = new RedisQueueMetrics(this, queue);
                if(queueMetrics.putIfAbsent(queue.getRedisKey(), qmNew) == null) {
                    qmNew.initialize();
                    qm = qmNew;
                    break;
                }
            }
            else if(qm.isInitialized()) {
                return qm;
            }
        }
        return qm;
    }

    private RedisTopicMetrics getTopicMetrics(RedisTopicObject topic) {
        RedisTopicMetrics tm, tmNew;
        while(true) {
            tm = topicMetrics.get(topic.getRedisKey());
            if(tm == null) {
                tmNew = new RedisTopicMetrics(this, topic);
                if(topicMetrics.putIfAbsent(topic.getRedisKey(), tmNew) == null) {
                    tmNew.initialize();
                    tm = tmNew;
                    break;
                }
            }
            else if(tm.isInitialized()) {
                return tm;
            }
        }
        return tm;
    }
}
