package cn.evun.sweet.framework.session.configuration;

/**
 * Created by zlbbq on 16/6/6.
 */


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisNode;
import org.springframework.data.redis.connection.RedisSentinelConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import redis.clients.jedis.JedisPoolConfig;

import java.util.ArrayList;

@EnableRedisHttpSession
public class DistributedSessionConfiguration {
//    private static final Logger logger = LoggerFactory.getLogger(DistributedSessionConfiguration.class);

    @Value("${sweet.framework.session.redis.host:127.0.0.1}")
    private String host;

    @Value("${sweet.framework.session.redis.port:6379}")
    private int port;

    @Value("${sweet.framework.session.redis.password:}")
    private String password;

    @Value("${sweet.framework.session.redis.database:0}")
    private int database;

    @Value("${sweet.framework.session.redis.maxActive:8}")
    private int maxActive;

    @Value("${sweet.framework.session.redis.maxIdle:8}")
    private int maxIdle;

    @Value("${sweet.framework.session.redis.maxWait:-1}")
    private long maxWait;

    @Value("${sweet.framework.session.redis.minIdle:0}")
    private int minIdle;

    @Value("${sweet.framework.session.redis.hosts:}")
    private String hosts;

    @Value("${sweet.framework.session.redis.hosts.type:sentinel}")
    private String hostsType;

    @Value("${sweet.framework.session.redis.sentinel.master:masterName}")
    private String sentinelMaster;

    @Value("${server.session.timeout:1800}")
    private int sessionTimeout;

    public static final String SENTINEL = "sentinel";

    public static final String CLUSTER = "cluster";

    private static final int DEFAULT_CLUSTER_REDIRECTS = 3;

    static {
        String namespace = System.getProperty("sweet.framework.session.redis.namespace");
        //TODO resolve placeholders
        if (StringUtils.hasText(namespace)) {
            System.setProperty("spring.session.redis.namespace", namespace);
        }
    }

    @Bean
    public JedisConnectionFactory connectionFactory() {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMinIdle(minIdle);
        jedisPoolConfig.setMaxTotal(maxActive);
        jedisPoolConfig.setMaxWaitMillis(maxWait);


        JedisConnectionFactory connectionFactory = null;

        if (StringUtils.hasText(hosts)) {
            ArrayList<RedisNode> hostAndPorts = parseRedisNodes(hosts);
            if (CollectionUtils.isEmpty(hostAndPorts)) {
                throw new IllegalArgumentException("Invalid property configuration [sweet.framework.session.redis.hosts]");
            }
            if (SENTINEL.equalsIgnoreCase(hostsType)) {
                RedisSentinelConfiguration sentinelConfiguration = new RedisSentinelConfiguration();
                sentinelConfiguration.setSentinels(hostAndPorts);
                sentinelConfiguration.setMaster(sentinelMaster);
                connectionFactory = new JedisConnectionFactory(sentinelConfiguration);
            } else if (CLUSTER.equalsIgnoreCase(hostsType)) {
                RedisClusterConfiguration clusterConfiguration = new RedisClusterConfiguration();
                clusterConfiguration.setClusterNodes(hostAndPorts);
                clusterConfiguration.setMaxRedirects(DEFAULT_CLUSTER_REDIRECTS);
                connectionFactory = new JedisConnectionFactory(clusterConfiguration);
            }
        }
        if (connectionFactory == null) {
            connectionFactory = new JedisConnectionFactory();
            connectionFactory.setHostName(host);
            connectionFactory.setPort(port);
        }

        connectionFactory.setPassword(password);
        connectionFactory.setDatabase(database);
        connectionFactory.setPoolConfig(jedisPoolConfig);

        return connectionFactory;
    }

    // 格式: host1:port1;host2:port2;host3:port3;
    private ArrayList<RedisNode> parseRedisNodes(String hosts) {
        ArrayList<RedisNode> ret = new ArrayList<RedisNode>();
        String[] parts = hosts.split(";");
        for (String sHost : parts) {
            if (!StringUtils.hasText(sHost)) continue;
            String hostPart[] = sHost.split(":");
            String hostName = hostPart[0];
            if (!StringUtils.hasText(hostName)) continue;
            int iPort = hostPart.length > 1 ? Integer.parseInt(hostPart[1]) : 6379;
            ret.add(new RedisNode(hostName, iPort));
        }
        return ret;
    }

    @Bean
    public SessionRepositoryConfigurer sessionRepositoryConfigurer(RedisOperationsSessionRepository redisOperationsSessionRepository) {
        return new SessionRepositoryConfigurer(redisOperationsSessionRepository, sessionTimeout).config();
    }

    public static class SessionRepositoryConfigurer {
        private RedisOperationsSessionRepository redisOperationsSessionRepository;

        private int sessionTimeout;

        public SessionRepositoryConfigurer(RedisOperationsSessionRepository redisOperationsSessionRepository, int sessionTimeout) {
            this.redisOperationsSessionRepository = redisOperationsSessionRepository;
            this.sessionTimeout = sessionTimeout;
        }

        SessionRepositoryConfigurer config() {
            this.redisOperationsSessionRepository.setDefaultMaxInactiveInterval(this.sessionTimeout);
            return this;
        }
    }
}
