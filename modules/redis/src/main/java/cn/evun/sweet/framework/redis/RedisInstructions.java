package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/26.
 */


public class RedisInstructions {
//    private static final Logger logger = LoggerFactory.getLogger(RedisInstructions.class);

    public static final int GET = 0;

    public static final int SET = 1;

    public static final int EXPIRE = 2;

    public static final int KEYS = 3;

    public static final int DELETE = 4;

    public static final int EXISTS = 5;

    public static final int INCR = 6;

    public static final int DECR = 7;

    public static final int LOCK = 8;

    public static final int UNLOCK = 9;

    public static final int LLEN = 10;

    public static final int PUSH = 11;

    public static final int POP = 12;

    public static final int LISTEN = 13;

    public static final int PUBLISH = 14;

    public static final int SUBSCRIBE = 15;

    public static final int UNSUBSCRIBE = 16;

    public static final int RECEIVED = 17;

    public static final int FETCH_CONNECTION = 18;

    private static final String INSTRUCTION_NAMES[] = {
            "get", "set", "expire", "keys", "del", "exists",     // cache operations
            "incr", "decr",                                      // distributed counter operations
            "lock(setnx)", "unlock(del)",                        // distributed lock operations
            "llen", "push", "pop", "listen",                     // queue operations
            "publish", "subscribe", "unsubscribe", "received",   // Pub/Sub queue operations
            "fetch-connection", "UNKNOWN"
    };

    public static String convert(int instruction) {
        if (instruction > INSTRUCTION_NAMES.length - 1) {
            instruction = INSTRUCTION_NAMES.length - 1;
        }

        return INSTRUCTION_NAMES[instruction];
    }
}
