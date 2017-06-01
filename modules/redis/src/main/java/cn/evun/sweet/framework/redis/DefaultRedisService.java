package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/24.
 */


import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.SerializeException;
import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.common.tracer.ProcessContext;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.redis.monitor.RedisServiceMetrics;
import com.codahale.metrics.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.StringUtils;
import redis.clients.jedis.Jedis;
import redis.clients.util.Pool;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.net.SocketTimeoutException;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class DefaultRedisService implements RedisServiceFacade {
    private static final Logger logger = LoggerFactory.getLogger(DefaultRedisService.class);

    //服务名
    private String name;

    // redisTemplate from spring redis integration
    private RedisTemplate redisTemplate;

    // object serializer
    private ISerializer redisSerializer;

    // Jedis Pool, for metricRegistry
    private Pool<Jedis> pool;
    private int poolMaxTotal = -1;

    // 是否启用Cache, Topic, Queue的前缀
    @Deprecated
    private boolean normalizeKeyBindingObjectKeys = false;

    private RedisKeyNamespace keyNamespace = null;

    //DropWizard统计
    private RedisServiceMetrics metrics;

    // 存储字符集
    private String charset = "utf-8";

    public DefaultRedisService(String name) {
        this(name, null);
    }

    public DefaultRedisService(String name, RedisTemplate redisTemplate) {
        this(name, redisTemplate, new JSONSerializer());
    }

    public DefaultRedisService(String name, RedisTemplate redisTemplate, ISerializer serializer) {
        this(name, redisTemplate, serializer, null);
    }


    public DefaultRedisService(String name, RedisTemplate redisTemplate, ISerializer redisSerializer, RedisKeyNamespace keyNamespace) {
        this.setName(name);
        this.setRedisTemplate(redisTemplate);
        this.setRedisSerializer(redisSerializer);
        this.setKeyNamespace(keyNamespace);


        this.initPool4Metrics();
        this.metrics = new RedisServiceMetrics(this, this.pool, this.poolMaxTotal);
    }

    public void setName(String name) {
        if (name == null || !StringUtils.hasLength(name)) {
            name = "defaultRedisService";
        }

        this.name = name;
    }

    public void setKeyNamespace(RedisKeyNamespace keyNamespace) {
        this.keyNamespace = keyNamespace;
    }

    public RedisKeyNamespace getKeyNamespace() {
        return this.keyNamespace;
    }

    @Deprecated
    public boolean isNormalizeKeyBindingObjectKeys() {
        return normalizeKeyBindingObjectKeys;
    }

    @Deprecated
    //注: 此方法在1.1.2版本开始将不再有任何效果
    public void setNormalizeKeyBindingObjectKeys(boolean normalizeKeyBindingObjectKeys) {
        //this.normalizeKeyBindingObjectKeys = normalizeKeyBindingObjectKeys;
        logger.warn("normalizeKeyBindingObjectKeys is Deprecated since version 1.1.2");
    }

    private void initPool4Metrics() {
        try {
            JedisConnectionFactory cf = (JedisConnectionFactory) (this.getRedisTemplate().getConnectionFactory());
            Field poolField = JedisConnectionFactory.class.getDeclaredField("pool");
            poolField.setAccessible(true);
            poolMaxTotal = cf.getPoolConfig().getMaxTotal();
            this.pool = (Pool<Jedis>) poolField.get(cf);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    public String getName() {
        return this.name;
    }

    public void set(String key, Object value) {
        set(key, value, 0L);
    }

    public void set(final String key, final Object value, final long expire) {
        if (value == null) {
            delete(key);
            return;
        }
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.SET);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        final RedisCacheObject cache = new RedisCacheObject(key);
        cache.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        cache.setKeyNamespace(this.keyNamespace);
        try {
            redisTemplate.execute(new RedisCallback() {
                public Long doInRedis(RedisConnection redisConnection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    byte[] val = null;
                    byte[] keyBytes = str2Bytes(cache.getRedisKey());
                    try {
                        val = redisSerializer.serialize(value);
                    } catch (SerializeException e) {
                        throw new RedisServiceException(e);
                    }

                    if (val != null) {
                        redisConnection.set(keyBytes, val);

                        if (expire > 0) {
                            redisConnection.expire(keyBytes, expire);
                        }
                    }

                    return 1L;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.SET);
        }
        ctx.stop();
    }

    public String get(final String key) {
        return get(key, String.class);
    }

    public <T> T get(final String key, final Class<T> tpl) {
        RedisCacheObject cache = new RedisCacheObject(key);
        cache.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        cache.setKeyNamespace(this.keyNamespace);
        return doGet(cache.getRedisKey(), tpl);
    }

    private <T> T doGet(final String key, final Class<T> tpl) {
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.GET);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        T ret = null;
        try {
            ret = (T) redisTemplate.execute(new RedisCallback() {
                public Object doInRedis(RedisConnection redisConnection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    byte[] value = redisConnection.get(str2Bytes(key));
                    if (value != null) {
                        try {
                            T realValue = redisSerializer.deserialize(value, tpl);
                            metrics.increaseGetHit();
                            return realValue;
                        } catch (SerializeException e) {
                            throw new RedisServiceException(e);
                        }
                    }
                    metrics.increaseGetMiss();
                    return null;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.GET);
        }
        ctx.stop();
        return ret;
    }

    public String[] keys(final String pattern) {
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.KEYS);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        final RedisCacheObject cache = new RedisCacheObject(pattern);
        cache.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        cache.setKeyNamespace(this.keyNamespace);
        String[] ret = null;
        try {
            ret = (String[]) redisTemplate.execute(new RedisCallback() {
                public String[] doInRedis(RedisConnection redisConnection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    Set<byte[]> keysSet = redisConnection.keys(str2Bytes(cache.getRedisKey()));
                    String[] ret = new String[keysSet.size()];
                    int idx = 0;
                    try {
                        for (byte[] k : keysSet) {
                            ret[idx++] = new String(k, charset);
                        }
                    } catch (UnsupportedEncodingException e) {
                        throw new RedisServiceException(e);
                    }

                    return ret;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.KEYS);
        }
        ctx.stop();
        return ret;
    }

    public boolean exists(final String key) {
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.EXISTS);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        final RedisCacheObject cache = new RedisCacheObject(key);
        cache.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        cache.setKeyNamespace(this.keyNamespace);
        boolean ret = false;

        try {
            ret = (Boolean) redisTemplate.execute(new RedisCallback() {
                public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    return connection.exists(str2Bytes(cache.getRedisKey()));
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.EXISTS);
        }

        ctx.stop();
        return ret;
    }

    public void delete(final String... keys) {
        for (String key : keys) {
            RedisCacheObject cache = new RedisCacheObject(key);
            cache.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
            cache.setKeyNamespace(this.keyNamespace);
            doDelete(cache.getRedisKey());
        }
    }

    private void doDelete(final String... keys) {
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.DELETE);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        try {
            redisTemplate.execute(new RedisCallback() {
                public Long doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    for (int i = 0; i < keys.length; i++) {
                        long start = System.nanoTime();
                        connection.del(str2Bytes(keys[i]));
                    }
                    return 1L;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.DELETE);
        }
        ctx.stop();
    }

    public void expire(final String key, final long expire) {
        RedisCacheObject cache = new RedisCacheObject(key);
        cache.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        cache.setKeyNamespace(this.keyNamespace);
        doExpire(cache.getRedisKey(), expire);
    }

    public void doExpire(final String key, final long expire) {
        if (expire <= 0) {
            delete(key);
            return;
        }

        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.EXPIRE);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        try {
            redisTemplate.execute(new RedisCallback() {
                public Long doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    connection.expire(str2Bytes(key), expire);
                    return 1L;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.EXPIRE);
        }
        ctx.stop();
    }

    public long getCurrent(final RedisDistributedCounterObject dcounter) {
        dcounter.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        dcounter.setKeyNamespace(this.keyNamespace);
        String s = doGet(dcounter.getRedisKey(), String.class);

        if (s == null) {
            return 0L;
        }
        try {
            return Long.parseLong(s);
        } catch (NumberFormatException e) {
            logger.error(e.getMessage(), e);
        }
        return 0;
    }

    public long increase(final RedisDistributedCounterObject dcounter, final int val) {
        dcounter.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        dcounter.setKeyNamespace(this.keyNamespace);
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.INCR);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        long ret = 0L;
        try {
            ret = (Long) redisTemplate.execute(new RedisCallback() {
                public Long doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    return connection.incrBy(str2Bytes(dcounter.getRedisKey()), val);
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.INCR);
        }
        ctx.stop();
        return ret;
    }

    public long decrease(final RedisDistributedCounterObject dcounter, final int val) {
        dcounter.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        dcounter.setKeyNamespace(this.keyNamespace);
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.DECR);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        long ret = 0L;
        try {
            ret = (Long) redisTemplate.execute(new RedisCallback() {
                public Long doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    return connection.decrBy(str2Bytes(dcounter.getRedisKey()), val);
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.DECR);
        }
        ctx.stop();
        return ret;
    }

    public void delete(RedisDistributedCounterObject dcounter) {
        dcounter.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        dcounter.setKeyNamespace(this.keyNamespace);
        doDelete(dcounter.getRedisKey());
    }

    public boolean lock(final RedisDistributedLockObject dlock) {
        dlock.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        dlock.setKeyNamespace(this.keyNamespace);
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.LOCK);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        final String key = dlock.getRedisKey();
        boolean ret = false;

        try {
            ret = (Boolean) redisTemplate.execute(new RedisCallback() {
                public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    boolean flag = connection.setNX(str2Bytes(key), str2Bytes("" + System.currentTimeMillis()));

                    if (flag && dlock.getSelfReleaseExpired() > 0) {
                        connection.expire(str2Bytes(key), dlock.getSelfReleaseExpired());
                    }

                    return flag;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseOperationError(RedisInstructions.LOCK);
        }
        ctx.stop();
        return ret;
    }

    public void unlock(RedisDistributedLockObject dlock) {
        dlock.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        dlock.setKeyNamespace(this.keyNamespace);
        doDelete(dlock.getRedisKey());
    }

    public boolean publish(final RedisTopicObject topic, final Object data) {
        topic.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        topic.setKeyNamespace(this.keyNamespace);
        final Timer.Context ctx = metrics.createTopicPublishContext(topic);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        boolean ret = false;

        try {
            ret = (Boolean) redisTemplate.execute(new RedisCallback() {
                public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    String key = topic.getRedisKey();
                    byte[] value = null;
                    try {
                        value = redisSerializer.serialize(data);
                    } catch (SerializeException e) {
                        throw new RedisServiceException(e);
                    }

                    if (value != null) {
                        long l = connection.publish(str2Bytes(key), value);
                        return true;
                    }

                    return false;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseTopicPublishError(topic);
        }
        ctx.stop();
        return ret;
    }

    @Override
    public void subscribe(RedisTopicObject topic, Class tpl, RedisSubscriptionWrapper subscriptionWrapper, RedisMessageListener l) {
        final Thread subscribeThread = subscribe(topic, tpl, subscriptionWrapper, l, Executors.newSingleThreadExecutor());
        Executors.newSingleThreadExecutor().execute(new Runnable() {
            @Override
            public void run() {
                while(true) {
                    try {
                        Thread.sleep(5000);
                    } catch (InterruptedException e) {
                        ; //
                    }
                    if(!subscribeThread.isAlive()) {

                    }
                }
            }
        });
    }

    public Thread subscribe(final RedisTopicObject topic, final Class tpl, final RedisSubscriptionWrapper subscriptionWrapper, final RedisMessageListener l, final ExecutorService threadPool) {
        topic.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        topic.setKeyNamespace(this.keyNamespace);
        Thread thread = new Thread(new Runnable() {
            public void run() {
                try {
                    final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
                    redisTemplate.execute(new RedisCallback() {
                        public Long doInRedis(RedisConnection connection) throws DataAccessException {
                            fetchConnectionCtx.stop();
                            org.springframework.data.redis.connection.MessageListener listener = new org.springframework.data.redis.connection.MessageListener() {
                                public void onMessage(Message message, byte[] reserved) {
                                    byte[] bytes = message.getBody();
                                    Object msg = null;
                                    try {
                                        msg = redisSerializer.deserialize(bytes, tpl);
                                    } catch (SerializeException e) {
                                        logger.error(e.getMessage(), e);
                                    }

                                    if (msg != null) {
                                        final Object fMsg = msg;
                                        threadPool.submit(new Runnable() {
                                            public void run() {
                                                final String listenerId = getShortName(l.getClass().getName());
                                                ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
                                                tracer.setRootAttribute("topic", topic.getName());
                                                tracer.setRootAttribute("listenerId", listenerId);
                                                tracer.beginTrace();
                                                ProcessContext processContext = tracer.join(ProcessContext.Type.RedisMessageConsumer, "process-message");
                                                // 如果应用订阅一个主题多次, 它将收到(publish * subscribe)次消息(如果没有异常发生)
                                                final Timer.Context ctx = metrics.createTopicHandleContext(topic);
                                                try {
                                                    l.onMessage(topic, fMsg);
                                                } catch (Exception e) {
                                                    logger.error(e.getMessage(), e);
                                                    metrics.increaseTopicHandleError(topic);
                                                    processContext.setAttribute("error", e.getMessage());
                                                } finally {
                                                    processContext.stop();
                                                    tracer.stopTrace();
                                                    tracer.log("REDIS SUBSCRIBER");
                                                    ThreadLocalProcessTracer.clean();
                                                }
                                                ctx.stop();
                                            }
                                        });
                                    }
                                }
                            };
                            if (subscriptionWrapper != null) {
                                subscriptionWrapper.wrapSubscribedConnection(connection);
                            }
                            connection.subscribe(listener, str2Bytes(topic.getRedisKey()));
                            return 0L;
                        }
                    });
                } catch (Exception e) {
                    logger.error(e.getMessage(), e);
                    metrics.increaseOperationError(RedisInstructions.SUBSCRIBE);
                }
            }
        });
        thread.start();
        return thread;
    }

    public void unsubscribe(final RedisTopicObject topic, final RedisSubscriptionWrapper subscriptionWrapper) {
        topic.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        topic.setKeyNamespace(this.keyNamespace);
        if (subscriptionWrapper == null || subscriptionWrapper.getSubscription() == null) {
            return;
        }
        final Timer.Context ctx = metrics.createTopicPublishContext(topic);
        if (subscriptionWrapper.getSubscription().isAlive()) {
            subscriptionWrapper.getSubscription().unsubscribe(str2Bytes(topic.getRedisKey()));
        } else {
            logger.warn("subscription of queue [" + topic.getName() + "] is closed, check your codes whether there is a duplicated un-subscription of queue [" + topic.getName() + "]!");
        }
        ctx.stop();
    }

    public long llen(final RedisQueueObject queue) {
        queue.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        queue.setKeyNamespace(this.keyNamespace);
        final Timer.Context ctx = metrics.createOperationContext(RedisInstructions.LLEN);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        long ret = -1L;

        try {
            ret = (Long) redisTemplate.execute(new RedisCallback() {
                public Long doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    String key = queue.getRedisKey();
                    return connection.lLen(str2Bytes(key));
                }
            });
        } catch (Exception e) {
            metrics.increaseOperationError(RedisInstructions.LLEN);
        }
        ctx.stop();
        return ret;
    }

    public long push(final RedisQueueObject queue, final Object msg) {
        queue.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        queue.setKeyNamespace(this.keyNamespace);
        final Timer.Context ctx = metrics.createQueuePushContext(queue);
        final Timer.Context fetchConnectionCtx = metrics.createOperationContext(RedisInstructions.FETCH_CONNECTION);
        long ret = -1L;
        final RedisInstructionData.Queue queueData = new RedisInstructionData.Queue(queue, ret);
        try {
            ret = (Long) redisTemplate.execute(new RedisCallback() {
                public Long doInRedis(RedisConnection connection) throws DataAccessException {
                    fetchConnectionCtx.stop();
                    String key = queue.getRedisKey();
                    byte[] msgBytes = null;
                    byte[] keyBytes = str2Bytes(key);
                    try {
                        msgBytes = redisSerializer.serialize(msg);
                    } catch (SerializeException e) {
                        throw new RedisServiceException(e);
                    }

                    if (msgBytes != null) {
                        long remaining = connection.lPush(keyBytes, msgBytes);
                        queueData.setRemaining(remaining);
                        return remaining;
                    }

                    return -1L;
                }
            });
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseQueuePushError(queue);
        }
        ctx.stop();
        return ret;
    }

    public <T> T pop(final RedisQueueObject queue, final Class<T> tpl) {
        queue.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        queue.setKeyNamespace(this.keyNamespace);
        final Timer.Context ctx = metrics.createQueuePopContext(queue);
        T ret = null;
        try {
            ret = this.doPop(queue, tpl);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            metrics.increaseQueuePopError(queue);
        }
        ctx.stop();
        return ret;
    }

    public ExecutorService listen(final RedisQueueObject queue, final Class tpl, int concurrent, final RedisMessageListener l) {
        queue.setPrefixEnabled(this.isNormalizeKeyBindingObjectKeys());
        queue.setKeyNamespace(this.keyNamespace);
        final int MIN = 1;
        final int MAX = 50;

        concurrent = concurrent < MIN ? MIN : concurrent;
        if (concurrent > MAX) {
            logger.warn("add [" + concurrent + "] listeners to redis queue [" + queue.getName() + "]");
        }

        ExecutorService executor = Executors.newFixedThreadPool(concurrent);
        final long PAUSE = 100;
        for (int i = 0; i < concurrent; i++) {
            executor.execute(new Thread() {
                public void run() {
                    final String listenerId = getShortName(l.getClass().getName()) + "[" + this.getId() + "]";
                    while (true) {
                        try {
                            Object msg = doPop(queue, tpl);
                            if (msg != null) {
                                ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
                                tracer.setRootAttribute("queue", queue.getName());
                                tracer.setRootAttribute("listenerId", listenerId);
                                tracer.beginTrace();
                                ProcessContext processContext = tracer.join(ProcessContext.Type.RedisMessageConsumer, "process-message");
                                final Timer.Context ctx = metrics.createQueueHandleContext(queue);
                                try {
                                    l.onMessage(queue, msg);
                                } catch (Exception e) {
                                    processContext.setAttribute("error", e.getMessage());
                                    metrics.increaseQueueHandleError(queue);
                                    throw e;
                                } finally {
                                    processContext.stop();
                                    ctx.stop();
                                    tracer.stopTrace();
                                    tracer.log("REDIS LISTEN");
                                    ThreadLocalProcessTracer.clean();
                                }
                                continue;
                            }
                        } catch (Exception e) {
                            logger.error("listening redis queue [" + queue.getName() + "], error: " + e.getMessage(), e);
                        }
                        try {
                            // Sleep 20ms if nothing was popped from queue, implied the queue is empty,
                            // or any exception occurred to yield CPU for other threads
                            Thread.sleep(PAUSE);
                        } catch (InterruptedException e) {
                            logger.error(e.getMessage(), e);
                        }
                    }
                }
            });
        }
        return executor;
    }

    public ISerializer getRedisSerializer() {
        return this.redisSerializer;
    }

    public void setRedisSerializer(ISerializer redisSerializer) {
        if (redisSerializer == null) {
            redisSerializer = new JSONSerializer();
        }
        this.redisSerializer = redisSerializer;
    }

    public RedisTemplate getRedisTemplate() {
        return this.redisTemplate;
    }

    public void setRedisTemplate(RedisTemplate redisTemplate) {
        if (redisTemplate == null) {
            throw new IllegalArgumentException("invalid redisTemplate");
        }

        this.redisTemplate = redisTemplate;
    }

    private String getShortName(String longName) {
        for (int i = 0; i < longName.length(); i++) {
            char c = longName.charAt(i);
            if (Character.isUpperCase(c)) {
                return longName.substring(i);
            }
        }

        return longName;
    }

    private <T> T doPop(final RedisQueueObject queue, final Class<T> tpl) throws Exception {
        final String key = queue.getRedisKey();
        T ret = (T) redisTemplate.execute(new RedisCallback() {
            public Object doInRedis(RedisConnection redisConnection) throws DataAccessException {
                byte[] value = null;
                try {
                    if (queue.getQueueType() == RedisQueueObject.FILO) {
                        value = redisConnection.lPop(str2Bytes(key));
                    } else {
                        value = redisConnection.rPop(str2Bytes(key));
                    }
                } catch (Exception e) {
                    if (e.getCause() instanceof SocketTimeoutException) {
                        return null;
                    }
                    if (e.getMessage().indexOf("SocketTimeoutException") >= 0) {
                        return null;
                    }
                    logger.error(e.getMessage(), e);
                }
                if (value != null) {
                    try {
                        T realValue = redisSerializer.deserialize(value, tpl);
                        return realValue;
                    } catch (SerializeException e) {
                        throw new RedisServiceException(e);
                    }
                }
                return null;
            }
        });

        return ret;
    }

    public RedisServiceMetrics getMetrics() {
        return this.metrics;
    }

    private byte[] str2Bytes(String key) {
        return cn.evun.sweet.framework.common.util.StringUtils.getBytes(key);
    }

    public void setCharset(String charset) {
        this.charset = charset;
    }
}
