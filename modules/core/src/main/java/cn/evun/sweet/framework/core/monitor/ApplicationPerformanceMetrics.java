package cn.evun.sweet.framework.core.monitor;

/**
 * Created by zlbbq on 2016/12/7.
 */


import com.codahale.metrics.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class ApplicationPerformanceMetrics {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationPerformanceMetrics.class);

    private MetricRegistry performance;

    @JsonIgnore
    private Map<String, Object> dataSourceStat = new HashMap<>();

    /**
     * 数据源实时状态
     * */
    @JsonIgnore
    private Gauge<Map<String, Object>> dataSourceGauge;

    /**
     * 请求计数
     * */
    @JsonIgnore
    private Counter requestCounter;

    /**
     * 成功请求计数
     * */
    @JsonIgnore
    private Counter successCounter;

    /**
     * 失败请求计数
     * */
    @JsonIgnore
    private Counter failCounter;

    /**
     * 请求计时器
     * */
    @JsonIgnore
    private Timer requestTimer;

    /**
     * 请求QPS
     * */
    @JsonIgnore
    private Meter requestMeter;

    /**
     * 请求流量
     * */
    @JsonIgnore
    private Meter requestFlowMeter;

    /**
     * 响应流量
     * */
    @JsonIgnore
    private Meter responseFlowMeter;

    /**
     * 最大内存
     * */
    @JsonIgnore
    private Gauge<Long> maxMemoryGauge;

    /**
     * 总内存
     * */
    @JsonIgnore
    private Gauge<Long> totalMemoryGauge;

    /**
     * 可用内存
     * */
    @JsonIgnore
    private Meter freeMemoryMeter;

    public ApplicationPerformanceMetrics() {
        this.performance = new MetricRegistry();
        this.dataSourceGauge = this.performance.register(MetricRegistry.name(ApplicationPerformanceMetrics.class, "datasourceGauge"), new Gauge<Map<String, Object>>() {
            @Override
            public Map<String, Object> getValue() {
                return dataSourceStat;
            }
        });
        this.requestCounter = this.performance.counter(MetricRegistry.name(ApplicationPerformanceMetrics.class, "requestCounter"));
        this.successCounter = this.performance.counter(MetricRegistry.name(ApplicationPerformanceMetrics.class, "successCounter"));
        this.failCounter = this.performance.counter(MetricRegistry.name(ApplicationPerformanceMetrics.class, "failCounter"));
        this.requestTimer = this.performance.timer(MetricRegistry.name(ApplicationPerformanceMetrics.class, "requestTimer"));
        this.requestMeter = this.performance.meter(MetricRegistry.name(ApplicationPerformanceMetrics.class, "requestMeter"));
        this.requestFlowMeter = this.performance.meter(MetricRegistry.name(ApplicationPerformanceMetrics.class, "requestFlowMeter"));
        this.responseFlowMeter = this.performance.meter(MetricRegistry.name(ApplicationPerformanceMetrics.class, "responseFlowMeter"));
        this.maxMemoryGauge = this.performance.register(MetricRegistry.name(ApplicationPerformanceMetrics.class, "maxMemoryGauge"), new Gauge<Long>() {
            @Override
            public Long getValue() {
                return Runtime.getRuntime().maxMemory();
            }
        });
        this.totalMemoryGauge = this.performance.register(MetricRegistry.name(ApplicationPerformanceMetrics.class, "totalMemoryGauge"), new Gauge<Long>() {
            @Override
            public Long getValue() {
                return Runtime.getRuntime().totalMemory();
            }
        });
        this.freeMemoryMeter = this.performance.meter(MetricRegistry.name(ApplicationPerformanceMetrics.class, "freeMemoryMeter"));
    }

    public Timer.Context onRequestStart(long requestContentLength) {
        requestFlowMeter.mark(requestContentLength);
        return requestTimer.time();
    }

    public void onRequestFinish(Timer.Context context, boolean success, long responseContentLength) {
        requestCounter.inc();
        if(success) {
            successCounter.inc();
        }
        else {
            failCounter.inc();
        }
        requestMeter.mark();
        responseFlowMeter.mark(responseContentLength);
        context.stop();
    }

    public void updateMemoryUsage() {
        freeMemoryMeter.mark(Runtime.getRuntime().freeMemory());
    }

    public Map<String, Object> getDataSourceStat() {
        return dataSourceStat;
    }

    public void updateDataSourceStat(Map<String, Object> dataSourceStat) {
        this.dataSourceStat = dataSourceStat;
    }

    public MetricRegistry getPerformance() {
        return performance;
    }
}
