package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/26.
 */


public abstract class RedisInstructionData {
//    private static final Logger logger = LoggerFactory.getLogger(RedisInstructionData.class);

    private RedisKeyBindingObject keyBindingObject;

    protected RedisInstructionData() {}

    protected RedisInstructionData(RedisKeyBindingObject keyBindingObject) {
        this.keyBindingObject = keyBindingObject;
    }

    public RedisKeyBindingObject getKeyBindingObject() {
        return keyBindingObject;
    }

    public void setKeyBindingObject(RedisKeyBindingObject keyBindingObject) {
        this.keyBindingObject = keyBindingObject;
    }

    public static RedisInstructionData empty(RedisKeyBindingObject keyBindingObject) {
        Empty empty = new Empty();
        empty.setKeyBindingObject(keyBindingObject);
        return empty;
    }

    // 语义化
    private static class Empty extends RedisInstructionData {
    }

    public static class Get extends RedisInstructionData {
        private boolean hit;

        public Get(RedisCacheObject cache, boolean hit) {
            super(cache);
            this.hit = hit;
        }

        public boolean isHit() {
            return hit;
        }

        public void setHit(boolean hit) {
            this.hit = hit;
        }
    }

    public static class Queue extends RedisInstructionData {
        private long remaining = -1L;

        public Queue(RedisQueueObject queue, long remaining) {
            super(queue);
            this.remaining = remaining;
        }

        public long getRemaining() {
            return remaining;
        }

        public void setRemaining(long remaining) {
            this.remaining = remaining;
        }
    }

    public static class DCounter extends RedisInstructionData {
        private long value = 0L;

        public DCounter(RedisDistributedCounterObject dcounter, long value) {
            super(dcounter);
            this.value = value;
        }

        public long getValue() {
            return value;
        }

        public void setValue(long value) {
            this.value = value;
        }
    }
}
