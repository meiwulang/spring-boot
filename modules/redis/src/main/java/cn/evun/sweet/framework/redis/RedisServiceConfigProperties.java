package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 2017/3/22.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RedisServiceConfigProperties {
    private static final Logger logger = LoggerFactory.getLogger(RedisServiceConfigProperties.class);

    private String host;

    private int port = 6379;

    private String password;

    private int database = 1;

    private int maxActive = 8;

    private int maxIdle = 8;

    private int maxWait = -1;

    private int minIdle = 0;

    private String hosts;

    private String clusterType = "sentinel";

    private String master = "masterName";

    private long metricsOutputIntervalInSeconds = 300;

    private String namespace = "";

    private int connectionTimeout = 2000;

    public RedisServiceConfigProperties() {
    }

    public String getClusterType() {
        return clusterType;
    }

    public void setClusterType(String clusterType) {
        this.clusterType = clusterType;
    }

    public int getConnectionTimeout() {
        return connectionTimeout;
    }

    public void setConnectionTimeout(int connectionTimeout) {
        this.connectionTimeout = connectionTimeout;
    }

    public int getDatabase() {
        return database;
    }

    public void setDatabase(int database) {
        this.database = database;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getHosts() {
        return hosts;
    }

    public void setHosts(String hosts) {
        this.hosts = hosts;
    }

    public static Logger getLogger() {
        return logger;
    }

    public String getMaster() {
        return master;
    }

    public void setMaster(String master) {
        this.master = master;
    }

    public int getMaxActive() {
        return maxActive;
    }

    public void setMaxActive(int maxActive) {
        this.maxActive = maxActive;
    }

    public int getMaxIdle() {
        return maxIdle;
    }

    public void setMaxIdle(int maxIdle) {
        this.maxIdle = maxIdle;
    }

    public int getMaxWait() {
        return maxWait;
    }

    public void setMaxWait(int maxWait) {
        this.maxWait = maxWait;
    }

    public int getMinIdle() {
        return minIdle;
    }

    public void setMinIdle(int minIdle) {
        this.minIdle = minIdle;
    }

    public long getMetricsOutputIntervalInSeconds() {
        return metricsOutputIntervalInSeconds;
    }

    public void setMetricsOutputIntervalInSeconds(long metricsOutputIntervalInSeconds) {
        this.metricsOutputIntervalInSeconds = metricsOutputIntervalInSeconds;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    @Override
    public String toString() {
        return "RedisServiceConfigProperties{" +
                "clusterType='" + clusterType + '\'' +
                ", host='" + host + '\'' +
                ", port=" + port +
                ", password='" + password + '\'' +
                ", database=" + database +
                ", maxActive=" + maxActive +
                ", maxIdle=" + maxIdle +
                ", maxWait=" + maxWait +
                ", minIdle=" + minIdle +
                ", hosts='" + hosts + '\'' +
                ", master='" + master + '\'' +
                ", metricsOutputIntervalInSeconds=" + metricsOutputIntervalInSeconds +
                ", namespace='" + namespace + '\'' +
                ", connectionTimeout=" + connectionTimeout +
                '}';
    }
}
