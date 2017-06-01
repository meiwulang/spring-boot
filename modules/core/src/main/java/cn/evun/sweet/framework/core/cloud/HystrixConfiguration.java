package cn.evun.sweet.framework.core.cloud;


import org.springframework.core.env.Environment;

/**
 * @author ruanrj
 * @description Hystrix 配置属性
 * @create 2017-01-06.
 */

class HystrixConfiguration {

    private static final String DEFAULT_CIRCUIT_BREAKER_ENABLED = "true";

    private static final String DEFAULT_EXECUTION_TIMEOUT_ENABLED = "true";

    private static final String DEFAULT_EXECUTION_TIMEOUT_MILLISECONDS = "10000";

    private static final String DEFAULT_EXECUTION_THREAD_POOL_SIZE = "20";

    private static final String DEFAULT_CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE = "50";

    private boolean circuitBreakerEnabled;

    private boolean executionTimeoutEnabled;

    private int executionTimeoutMilliseconds;

    private int executionThreadPoolSize;

    private int circuitBreakerErrorThresholdPercentage;

    public HystrixConfiguration(String serviceName, Environment environment) {
        circuitBreakerEnabled = Boolean.valueOf(environment.getProperty(serviceName.concat(".hystrix.circuit.breaker.enabled"), DEFAULT_CIRCUIT_BREAKER_ENABLED));
        circuitBreakerErrorThresholdPercentage = Integer.valueOf(environment.getProperty(serviceName.concat(".hystrix.circuit.breaker.error.threshold.percentage"), DEFAULT_CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE));
        executionTimeoutEnabled = Boolean.valueOf(environment.getProperty(serviceName.concat(".hystrix.execution.timeout.enabled"), DEFAULT_EXECUTION_TIMEOUT_ENABLED));
        executionTimeoutMilliseconds = Integer.valueOf(environment.getProperty(serviceName.concat(".hystrix.execution.timeout.milliseconds"), DEFAULT_EXECUTION_TIMEOUT_MILLISECONDS));
        executionThreadPoolSize = Integer.valueOf(environment.getProperty(serviceName.concat(".hystrix.execution.threadPool.size"), DEFAULT_EXECUTION_THREAD_POOL_SIZE));
    }

    public boolean isCircuitBreakerEnabled() {
        return circuitBreakerEnabled;
    }

    public void setCircuitBreakerEnabled(boolean circuitBreakerEnabled) {
        this.circuitBreakerEnabled = circuitBreakerEnabled;
    }

    public boolean isExecutionTimeoutEnabled() {
        return executionTimeoutEnabled;
    }

    public void setExecutionTimeoutEnabled(boolean executionTimeoutEnabled) {
        this.executionTimeoutEnabled = executionTimeoutEnabled;
    }

    public int getExecutionTimeoutMilliseconds() {
        return executionTimeoutMilliseconds;
    }

    public void setExecutionTimeoutMilliseconds(int executionTimeoutMilliseconds) {
        this.executionTimeoutMilliseconds = executionTimeoutMilliseconds;
    }

    public int getExecutionThreadPoolSize() {
        return executionThreadPoolSize;
    }

    public void setExecutionThreadPoolSize(int executionThreadPoolSize) {
        this.executionThreadPoolSize = executionThreadPoolSize;
    }

    public int getCircuitBreakerErrorThresholdPercentage() {
        return circuitBreakerErrorThresholdPercentage;
    }

    public void setCircuitBreakerErrorThresholdPercentage(int circuitBreakerErrorThresholdPercentage) {
        this.circuitBreakerErrorThresholdPercentage = circuitBreakerErrorThresholdPercentage;
    }

    @Override
    public String toString() {
        return "HystrixConfiguration{" +
                "circuitBreakerEnabled=" + circuitBreakerEnabled +
                ", executionTimeoutEnabled=" + executionTimeoutEnabled +
                ", executionTimeoutMilliseconds=" + executionTimeoutMilliseconds +
                ", executionThreadPoolSize=" + executionThreadPoolSize +
                ", circuitBreakerErrorThresholdPercentage=" + circuitBreakerErrorThresholdPercentage +
                '}';
    }
}