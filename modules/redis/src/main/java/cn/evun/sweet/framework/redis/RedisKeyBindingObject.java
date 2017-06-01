package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 16/5/24.
 */


public abstract class RedisKeyBindingObject {
//    private static final Logger logger = LoggerFactory.getLogger(RedisKeyBindingObject.class);

    protected String name;

    protected String prefix = "";

    protected RedisKeyNamespace keyNamespace = null;

    protected RedisKeyBindingObject(String name, String prefix) {
        this.name = name;
        this.setPrefix(prefix);
    }

    public String getRedisKey() {
        if(this.keyNamespace == null) {
            return this.prefix + this.name;
        }
        else {
            return this.prefix + this.keyNamespace.key(this.name);
        }
    }

    public void setPrefix(String prefix) {
        if(prefix == null) {
            prefix = "";
        }

        this.prefix = prefix;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrefixEnabled(boolean prefixEnabled) {
        if(!prefixEnabled) {
            this.prefix = "";
        }
    }

    public boolean equals(Object o) {
        if(!(o instanceof RedisKeyBindingObject)) {
            return false;
        }

        return ((RedisKeyBindingObject)o).getName().equals(this.getName());
    }

    public int hashCode() {
        return this.getName().hashCode();
    }

    protected void setKeyNamespace(RedisKeyNamespace redisKeyGroup) {
        this.keyNamespace = redisKeyGroup;
    }

    protected RedisKeyNamespace getKeyNamespace() {
        return this.keyNamespace;
    }
}
