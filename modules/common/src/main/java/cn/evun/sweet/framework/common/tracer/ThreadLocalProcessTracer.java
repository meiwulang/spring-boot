package cn.evun.sweet.framework.common.tracer;

/**
 * Created by zlbbq on 16/6/3.
 */


import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.SerializeException;
import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.common.util.GlobalUIDGenerator;
import cn.evun.sweet.framework.common.util.StringUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ThreadLocalProcessTracer {
    private static final Logger logger = LoggerFactory.getLogger(ThreadLocalProcessTracer.class);

    private static ISerializer serializer = new JSONSerializer();

    //TODO memory leak testing
    private static final ThreadLocal<ThreadLocalProcessTracer> tracerThreadLocal = new ThreadLocal<>();

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private String traceId;

    @JsonIgnore
    private boolean disableLog = false;

    @JsonIgnore
    private long startTime;

    private long startTimeMillis;

    private String cost = "NaN";

    private String startTimeStr;

    private Map<String, Object> attributes;

    private List<ProcessContext> processes;

    private static final String CHAINED_CONTEXT_LINK = "->";

    private static String appName;
    private static String appId;
    private static String appIdentifier;

    static {
        appName = System.getProperty("spring.application.name");
        appId = System.getProperty("spring.application.index");
        if(StringUtils.hasText(appName)) {
            appIdentifier = appName;
            if(StringUtils.hasText(appId)) {
                appIdentifier = appIdentifier + "-" + appId;
            }
        }
    }

    public ThreadLocalProcessTracer() {
        this(createTraceId());
    }

    public ThreadLocalProcessTracer(String traceId) {
        this.traceId = traceId;
        this.startTime = System.nanoTime();
        this.startTimeMillis = System.currentTimeMillis();
        this.processes = new ArrayList<>();
        this.attributes = new HashMap<>();
    }

    public static ThreadLocalProcessTracer get() {
        ThreadLocalProcessTracer tracer = tracerThreadLocal.get();
        if (tracer == null) {
            tracer = new ThreadLocalProcessTracer();
            put(tracer);
        }
        return tracer;
    }

    public static String getThreadLocalTraceId() {
        ThreadLocalProcessTracer tracer = tracerThreadLocal.get();
        if(tracer != null) {
            return tracer.getTraceId();
        }
        return null;
    }

    public static ThreadLocalProcessTracer get(String traceId) {
        ThreadLocalProcessTracer tracer = tracerThreadLocal.get();
        if (tracer == null) {
            tracer = new ThreadLocalProcessTracer(traceId);
            put(tracer);
        } else {
            tracer.setTraceId(traceId);
        }
        return tracer;
    }

    private static String createTraceId() {
        return appIdentifier + '-' + GlobalUIDGenerator.next();
    }

    private static void put(ThreadLocalProcessTracer httpRequestTracer) {
        tracerThreadLocal.set(httpRequestTracer);
    }

    public static void clean() {
        tracerThreadLocal.remove();
    }

    public ProcessContext join(ProcessContext.Type type, String name) {
        String chainedName = name;
        //找到上一个未关闭的context, 作为它的子context(通过$parentProcessName.$processName识别)
        ProcessContext lastOpened = this.findLastOpenedProcessContext();
        if (lastOpened != null) {
            chainedName = lastOpened.getName() + CHAINED_CONTEXT_LINK + name;
        }

        ProcessContext ctx = new ProcessContext(type, chainedName);
        this.processes.add(ctx);
        return ctx;
    }

    private ProcessContext findLastOpenedProcessContext() {
        if (CollectionUtils.isEmpty(this.processes)) {
            return null;
        }

        for (int i = this.processes.size() - 1; i >= 0; i--) {
            ProcessContext ctx = this.processes.get(i);
            if (ctx.isOpen()) {
                return ctx;
            }
        }
        return null;
    }

    public String getStartTimeStr() {
        return simpleDateFormat.format(this.startTimeMillis);
    }

    public void beginTrace() {
    }

    public void stopTrace() {
        for (ProcessContext ctx : this.processes) {
            //如果没停止,则停止它
            ctx.stop();
        }
        long stopTime = System.nanoTime();
        this.cost = new DecimalFormat("0.00").format((stopTime - this.startTime) / 1000000.0d) + "ms";
    }

    public String toString() {
        try {
            byte[] b = serializer.serialize(this);
            return new String(b);
        } catch (SerializeException e) {
            logger.error(e.getMessage(), e);
        }
        return "";
    }

    public void setAttribute(String name, Object value) {
        ProcessContext ctx = this.findLastOpenedProcessContext();
        if (ctx == null) {
            this.doSetAttribute(name, value);
        } else {
            ctx.setAttribute(name, value);
        }
    }

    public void setRootAttribute(String name, Object value) {
        this.doSetAttribute(name, value);
    }

    private void doSetAttribute(String name, Object value) {
        if (value == null) {
            this.attributes.remove(name);
        } else {
            this.attributes.put(name, value);
        }
    }

    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    public List<ProcessContext> getProcesses() {
        return processes;
    }

    public String getTraceId() {
        return traceId;
    }

    public void setTraceId(String traceId) {
        this.traceId = traceId;
    }

    public String getCost() {
        return this.cost;
    }

    public void log(String flag) {
        if(!this.disableLog) {
            logger.info("[{}] -> {}", flag, this.toString());
        }
    }

    public void disableThisTraceLog() {
        this.disableLog = true;
    }

    public static String getAppId() {
        return appIdentifier;
    }
}
