# sweet-session
分布式Session支持

## 配置项

```
# 存储session的redis服务器IP, 默认为"127.0.0.1"
sweet.framework.session.redis.host=127.0.0.1

# 存储session的redis服务端口, 默认为6379
sweet.framework.session.redis.port=6379

# 存储session的redis密码, 默认为空
sweet.framework.session.redis.password=

# 存储session的redis数据库索引, 默认为0
sweet.framework.session.redis.database=0

# 存储session的redis连接池最大活动连接数, 默认为8
sweet.framework.session.redis.pool.maxActive=8

# 存储session的redis连接池最大不活动连接数, 默认为8
sweet.framework.session.redis.pool.maxIdle=8

# 存储session的redis连接池达到最大连接数后, 新的redis连接获取请求等待时间, 单位: 毫秒, 默认-1(无限等待)
sweet.framework.session.redis.pool.maxWait=-1

# 存储session的redis连接池最小不活动连接数, 默认为0
sweet.framework.session.redis.pool.minIdle=0

# 存储session的redis sentinel/cluster hosts, 格式: "127.0.0.1:26379;127.0.0.1:26380;127.0.0.1:26381;"   使用此参数时, sweet.framework.session.host和sweet.framework.session.port无效.
sweet.framework.session.redis.hosts=

# 存储session的redis hosts types, 可以为sentinel/cluster, 默认是: sentinel,
sweet.framework.session.redis.hosts.type=sentinel

# 存储session的redis sentinel master
sweet.framework.session.redis.sentinel.master=master
```

## 自动生成的Bean清单

```
connectionFactory -> org.springframework.data.redis.connection.jedis.JedisConnectionFactory
$springRedisSessionBeans -> 请参考Spring-Session项目
```

## sweet-session引用

### 方法一 : pom.xml
```
<dependency>
  <groupId>cn.evun.sweet.framework</groupId>
  <artifactId>sweet-framework-session</artifactId>
  <version>1.0.0</version>
  <type>pom</type>
</dependency>
```