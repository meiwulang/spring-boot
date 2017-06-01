package cn.evun.sweet.framework.common.tracer;

/**
 * Created by zlbbq on 16/6/3.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

public class ProcessContext {
    private static final Logger logger = LoggerFactory.getLogger(ProcessContext.class);

    private String name;

    private String cost;

    private Map<String, Object> attributes;

    private transient long startNano = 0;

    private transient long stopNano = 0;

    private Type type;

    public enum Type {
        Controller, Service, DataAccess, RedisMessageConsumer, RabbitMessageConsumer,RestTemplate, DubboProvider, DubboConsumer, URLPermissionFilter
    }

    public ProcessContext(Type type, String name) {
        this.type = type;
        this.startNano = System.nanoTime();
        this.stopNano = 0L;
        this.name = name;
        this.attributes = new HashMap<>();
    }

    public void stop() {
        if (this.stopNano == 0L) {
            this.stopNano = System.nanoTime();
            this.cost = new DecimalFormat("0.00").format((this.stopNano - this.startNano) / 1000000.0d) + "ms";
        }
    }

    protected boolean isOpen() {
        return this.stopNano == 0L;
    }

    public String getCost() {
        return cost;
    }

    public long costInMills() {
        if(this.isOpen()) {
            return -1L;
        }
        return (this.stopNano - this.startNano) / 1000000;
    }

    public String getName() {
        return name;
    }

    public void setAttribute(String name, Object value) {
        this.doSetAttribute(name, value);
    }

    private void doSetAttribute(String name, Object value) {
        if(value == null) {
            this.attributes.remove(name);
        }
        else {
            this.attributes.put(name, value);
        }
    }

    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
