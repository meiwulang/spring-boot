package cn.evun.sweet.framework.core.cloud.common.model;

/**
 * Created by zlbbq on 2016/12/6.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

public class JointInfo {
    private static final Logger logger = LoggerFactory.getLogger(JointInfo.class);

    private ZK zk;

    private boolean mqLogEnabled;

    private MQ mq;

    private String gatewayUrl;

    /**
     * @Since sweet-cloud-joint 0.0.2
     */
    private Properties cloudSharedConfigurations = new Properties();

    public String getGatewayUrl() {
        return gatewayUrl;
    }

    public void setGatewayUrl(String gatewayUrl) {
        this.gatewayUrl = gatewayUrl;
    }

    public ZK getZk() {
        return zk;
    }

    public void setZk(ZK zk) {
        this.zk = zk;
    }

    public MQ getMq() {
        return mq;
    }

    public void setMq(MQ mq) {
        this.mq = mq;
    }

    public boolean isMqLogEnabled() {
        return mqLogEnabled;
    }

    public void setMqLogEnabled(boolean mqLogEnabled) {
        this.mqLogEnabled = mqLogEnabled;
    }

    public Properties getCloudSharedConfigurations() {
        return cloudSharedConfigurations;
    }

    public void setCloudSharedConfigurations(Properties cloudSharedConfigurations) {
        this.cloudSharedConfigurations = cloudSharedConfigurations;
    }

    public static class ZK {
        private String zkConnectionString;

        private String zkDigestAuthString;

        public String getZkConnectionString() {
            return zkConnectionString;
        }

        public void setZkConnectionString(String zkConnectionString) {
            this.zkConnectionString = zkConnectionString;
        }

        public String getZkDigestAuthString() {
            return zkDigestAuthString;
        }

        public void setZkDigestAuthString(String zkDigestAuthString) {
            this.zkDigestAuthString = zkDigestAuthString;
        }
    }

    public static class MQ {
        private String connectionString;

        private String user;

        private String password;

        private String traceLogQueueName;

        private String apmLogQueueName;

        public String getConnectionString() {
            return connectionString;
        }

        public void setConnectionString(String connectionString) {
            this.connectionString = connectionString;
        }

        public String getUser() {
            return user;
        }

        public void setUser(String user) {
            this.user = user;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getTraceLogQueueName() {
            return traceLogQueueName;
        }

        public void setTraceLogQueueName(String traceLogQueueName) {
            this.traceLogQueueName = traceLogQueueName;
        }

        public String getApmLogQueueName() {
            return apmLogQueueName;
        }

        public void setApmLogQueueName(String apmLogQueueName) {
            this.apmLogQueueName = apmLogQueueName;
        }
    }
}
