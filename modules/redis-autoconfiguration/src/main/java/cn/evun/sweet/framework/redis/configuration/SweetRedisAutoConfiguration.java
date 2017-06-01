package cn.evun.sweet.framework.redis.configuration;

/**
 * Created by zlbbq on 16/5/24.
 */


import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.redis.DefaultRedisService;
import cn.evun.sweet.framework.redis.RedisKeyNamespace;
import com.codahale.metrics.Slf4jReporter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

@Configuration
public class SweetRedisAutoConfiguration {
//    private static final Logger logger = LoggerFactory.getLogger(SweetRedisConfiguration.class);

    @Value("${sweet.framework.redis.host:127.0.0.1}")
    private String host;

    @Value("${sweet.framework.redis.port:6379}")
    private int port;

    @Value("${sweet.framework.redis.password:}")
    private String password;

    @Value("${sweet.framework.redis.database:0}")
    private int database;

    @Value("${sweet.framework.redis.maxActive:8}")
    private int maxActive;

    @Value("${sweet.framework.redis.maxIdle:8}")
    private int maxIdle;

    @Value("${sweet.framework.redis.maxWait:-1}")
    private long maxWait;

    @Value("${sweet.framework.redis.minIdle:0}")
    private int minIdle;

    @Value("${sweet.framework.redis.hosts:}")
    private String hosts;

    @Value("${sweet.framework.redis.hosts.type:sentinel}")
    private String hostsType;

    @Value("${sweet.framework.redis.sentinel.master:masterName}")
    private String sentinelMaster;

    @Value("${sweet.framework.redis.metrics.report.interval:300}")
    private int reportInterval;

    @Value("${sweet.framework.redis.keys.normalize:true}")
    private boolean keysNormalize;

    @Value("${sweet.framework.redis.keys.namespace:}")
    private String keysNamespaceStr;

    @Value("${sweet.framework.redis.timeout:2000}")
    private int timeout;

    public static final String SENTINEL = "sentinel";

    public static final String CLUSTER = "cluster";

    private static final int DEFAULT_CLUSTER_REDIRECTS = 3;

    private static final int METRICS_REPORT_INTERVAL_MIN = 10;

    //因为与sweet-session有冲突, 因此, jedisConnectionFactory不暴露为Bean
    //调用其afterPropertiesSet模拟Spring容器初始化
    public JedisConnectionFactory jedisConnectionFactory() {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMinIdle(minIdle);
        jedisPoolConfig.setMaxTotal(maxActive);
        jedisPoolConfig.setMaxWaitMillis(maxWait);


        JedisConnectionFactory connectionFactory = null;

        if (StringUtils.hasText(hosts)) {
            ArrayList<RedisNode> hostAndPorts = parseRedisNodes(hosts);
            if (CollectionUtils.isEmpty(hostAndPorts)) {
                throw new IllegalArgumentException("Invalid property configuration [sweet.framework.redis.hosts]");
            }
            if (SENTINEL.equalsIgnoreCase(hostsType)) {
                RedisSentinelConfiguration sentinelConfiguration = new RedisSentinelConfiguration();
                sentinelConfiguration.setSentinels(hostAndPorts);
                sentinelConfiguration.setMaster(sentinelMaster);
                connectionFactory = new JedisConnectionFactory(sentinelConfiguration);
            }
            else if (CLUSTER.equalsIgnoreCase(hostsType)) {
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
        connectionFactory.setTimeout(timeout);

        //模拟容器对其进行初始化
        connectionFactory.afterPropertiesSet();

        return connectionFactory;
    }

    @Bean
    public RedisTemplate redisTemplate() {
        JedisConnectionFactory connectionFactory = jedisConnectionFactory();
        RedisTemplate template = new RedisTemplate();
        template.setConnectionFactory(connectionFactory);
        return template;
    }

    @Bean
    public ISerializer redisSerializer() {
        return new JSONSerializer();
    }

    @Bean
    public DefaultRedisService redisService(RedisTemplate redisTemplate,
                                            @Qualifier("redisSerializer")
                                            ISerializer redisSerializer) {
        RedisKeyNamespace keyGroup = null;
        if(StringUtils.hasText(keysNamespaceStr)) {
            keyGroup = new RedisKeyNamespace(keysNamespaceStr);
        }
        DefaultRedisService redisService = new DefaultRedisService("defaultRedisService", redisTemplate, redisSerializer, keyGroup);
        redisService.setNormalizeKeyBindingObjectKeys(keysNormalize);
        return redisService;
    }

    @Bean
    public Slf4jReporter redisServiceMetricsReporter(DefaultRedisService redisService) {
        Slf4jReporter reporter = Slf4jReporter.forRegistry(redisService.getMetrics().getMetricRegistry()).build();
        reportInterval = reportInterval < METRICS_REPORT_INTERVAL_MIN ? METRICS_REPORT_INTERVAL_MIN : reportInterval;
        reporter.start(reportInterval, TimeUnit.SECONDS);
        return reporter;
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
}