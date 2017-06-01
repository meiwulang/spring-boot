package cn.evun.sweet.framework.redis;

/**
 * Created by zlbbq on 2017/3/22.
 */


import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import com.codahale.metrics.Slf4jReporter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisNode;
import org.springframework.data.redis.connection.RedisSentinelConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import redis.clients.jedis.JedisPoolConfig;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

public class RedisServiceBuilder {
    private static final Logger logger = LoggerFactory.getLogger(RedisServiceBuilder.class);

    private static final String SENTINEL = "sentinel";

    private static final String CLUSTER = "cluster";

    private static final int DEFAULT_CLUSTER_REDIRECTS = 3;

    private RedisServiceBuilder() {}

    public static DefaultRedisService buildDefault(RedisServiceConfigProperties config) {
        JedisConnectionFactory jedisConnectionFactory = createJedisConnectionFactory(config);

        RedisTemplate redisTemplate = new RedisTemplate();
        redisTemplate.setConnectionFactory(jedisConnectionFactory);
        //模拟容器对restTemplate进行初始化
        redisTemplate.afterPropertiesSet();

        ISerializer redisSerializer = new JSONSerializer();

        RedisKeyNamespace keyGroup = null;
        if(StringUtils.hasText(config.getNamespace())) {
            keyGroup = new RedisKeyNamespace(config.getNamespace());
        }
        DefaultRedisService redisService = new DefaultRedisService("defaultRedisService", redisTemplate, redisSerializer, keyGroup);
        redisService.setNormalizeKeyBindingObjectKeys(true);

        Slf4jReporter reporter = Slf4jReporter.forRegistry(redisService.getMetrics().getMetricRegistry()).build();
        reporter.start(config.getMetricsOutputIntervalInSeconds(), TimeUnit.SECONDS);

        return redisService;
    }

    private static JedisConnectionFactory createJedisConnectionFactory(RedisServiceConfigProperties config) {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(config.getMaxIdle());
        jedisPoolConfig.setMinIdle(config.getMinIdle());
        jedisPoolConfig.setMaxTotal(config.getMaxActive());
        jedisPoolConfig.setMaxWaitMillis(config.getMaxWait());


        JedisConnectionFactory connectionFactory = null;
        String hosts = config.getHosts();
        if (StringUtils.hasText(hosts)) {
            ArrayList<RedisNode> hostAndPorts = parseRedisNodes(hosts);
            if (CollectionUtils.isEmpty(hostAndPorts)) {
                throw new IllegalArgumentException("Invalid property configuration [sweet.framework.redis.hosts]");
            }
            if (SENTINEL.equalsIgnoreCase(config.getClusterType())) {
                RedisSentinelConfiguration sentinelConfiguration = new RedisSentinelConfiguration();
                sentinelConfiguration.setSentinels(hostAndPorts);
                sentinelConfiguration.setMaster(config.getMaster());
                connectionFactory = new JedisConnectionFactory(sentinelConfiguration);
            }
            else if (CLUSTER.equalsIgnoreCase(config.getClusterType())) {
                RedisClusterConfiguration clusterConfiguration = new RedisClusterConfiguration();
                clusterConfiguration.setClusterNodes(hostAndPorts);
                clusterConfiguration.setMaxRedirects(DEFAULT_CLUSTER_REDIRECTS);
                connectionFactory = new JedisConnectionFactory(clusterConfiguration);
            }
        }
        if (connectionFactory == null) {
            connectionFactory = new JedisConnectionFactory();
            connectionFactory.setHostName(config.getHost());
            connectionFactory.setPort(config.getPort());
        }

        connectionFactory.setPassword(config.getPassword());
        connectionFactory.setDatabase(config.getDatabase());
        connectionFactory.setPoolConfig(jedisPoolConfig);
        connectionFactory.setTimeout(config.getConnectionTimeout());

        //模拟容器对其进行初始化
        connectionFactory.afterPropertiesSet();

        return connectionFactory;
    }

    private static ArrayList<RedisNode> parseRedisNodes(String hosts) {
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
}
