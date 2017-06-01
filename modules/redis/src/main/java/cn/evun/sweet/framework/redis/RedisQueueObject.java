package cn.evun.sweet.framework.redis;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by zlbbq on 16/5/24.
 */


public class RedisQueueObject extends RedisKeyBindingObject implements Cloneable {
    private static final Logger logger = LoggerFactory.getLogger(RedisQueueObject.class);

    private int queueType = FIFO;

    public static final int FIFO = 0;

    public static final int FILO = 1;

    private static final String REDIS_QUEUE_PREFIX = "sweet:queue:";

    public RedisQueueObject(String name) {
        this(name, FIFO);
    }

    public RedisQueueObject(String name, int queueType) {
        super(name, REDIS_QUEUE_PREFIX);
        this.queueType = queueType;
    }

    public int getQueueType() {
        return queueType;
    }

    public void setQueueType(int queueType) {
        this.queueType = queueType;
    }

    public RedisQueueObject clone() {
        RedisQueueObject ret = null;
        try {
            ret = (RedisQueueObject) super.clone();
        } catch (CloneNotSupportedException e) {
            logger.error(e.getMessage(), e);
        }
        return ret;
    }

    public boolean equals(Object o) {
        if(o instanceof RedisQueueObject) {
            RedisQueueObject obj = (RedisQueueObject) o;
            return StringUtils.equals(obj.getName(), this.getName());
        }
        return false;
    }

    public int hashCode() {
        return this.getName().hashCode();
    }
}
