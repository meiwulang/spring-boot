# sweet-redis

### 1. Introduction

**sweet-redis**是Redis访问组件，支持redis的缓存、分布式锁、分布式计数器、队列及Topic(pub/sub队列)。

### 2. QuickStart
#### pom.xml

```xml
<dependency>
    <groupId>cn.evun.sweet.framework</groupId>
    <artifactId>sweet-framework-redis</artifactId>
    <version>1.0.0</version>
</dependency>
```

### 3. 注入RedisService

```java

@RestController
public class MyController {

	@Autowired
	private RedisService redisService;
	
	@RequestMapping("/redis-test")
	public String redisTest() {
		return redisService.get("key");
	}

}


```

### 4. 使用RedisService
#### 4.1 缓存

```java
@Test
public void cacheTest() throws Exception {
    redisService.set("test", "ABC123", 3);
    Assert.assertEquals(redisService.get("test"), "ABC123");

    Thread.sleep(5000);

    String test = redisService.get("test");
    Assert.assertNull(test);

    SampleModel sampleModel = new SampleModel();
    sampleModel.setId(1);
    sampleModel.setAge(33);
    sampleModel.setName("zlbbq");

    redisService.set("zlbbq", sampleModel);
    SampleModel zlbbq = redisService.get("zlbbq", SampleModel.class);
    Assert.assertEquals(zlbbq.getName(), sampleModel.getName());

    redisService.delete("zlbbq");
    zlbbq = redisService.get("zlbbq", SampleModel.class);
    Assert.assertNull(zlbbq);
}
```

#### 4.2 分布式锁

```java
@Test
public void dlockTest() throws Exception {
    int n = 0;
    RedisDistributedLockObject dlock = new RedisDistributedLockObject("dlock");

    // clean lock
    redisService.unlock(dlock);
    Thread.sleep(1000);

    if(redisService.lock(dlock)) {
        n = 1;
    }
    Assert.assertEquals(1, n);
    Thread.sleep(1000);
    if(redisService.lock(dlock)) {
        n = 2;
    }
    Assert.assertNotEquals(2, n);

    redisService.unlock(dlock);
    Thread.sleep(1000);
    if(redisService.lock(dlock)) {
        n = 2;
    }
    Assert.assertEquals(2, n);
    redisService.unlock(dlock);
    Thread.sleep(1000);

    // self release test
    n = 0;
    dlock = new RedisDistributedLockObject("dlock", 3);
    if(redisService.lock(dlock)) {
        n = 1;
    }
    Assert.assertEquals(1, n);
    Thread.sleep(1000);

    Thread.sleep(3000);
    if(redisService.lock(dlock)) {
        n = 2;
    }
    Assert.assertEquals(2, n);
}
```

#### 4.3 分布式计数器

```java
@Test
public void dcounterTest() throws Exception {
    RedisDistributedCounterObject dcounter = new RedisDistributedCounterObject("dcounter");
    redisService.delete(dcounter);
    Thread.sleep(1000);


    redisService.increase(dcounter, 1);

    long val = redisService.getCurrent(dcounter);
    Assert.assertEquals(1, val);

    val = redisService.decrease(dcounter, 1);
    Assert.assertEquals(0, val);

    val = redisService.increase(dcounter, 2);
    Assert.assertEquals(2, val);

    redisService.delete(dcounter);
    Thread.sleep(1000);
    val = redisService.getCurrent(dcounter);
    Assert.assertEquals(0, val);
}
```

#### 4.4 队列

```java
@Test
public void queueTest() throws Exception {
    final SampleModel sampleModel = new SampleModel();
    sampleModel.setId(1);
    sampleModel.setAge(33);
    sampleModel.setName("zlbbq");

    RedisQueueObject queue = new RedisQueueObject("test-queue");
    redisService.listen(queue, SampleModel.class, 5, new RedisMessageListener() {
        public void onMessage(RedisKeyBindingObject source, Object message) {
            logger.info("received from queue");
            ProcessContext ctx = ThreadLocalProcessTracer.get().join("queueTest");
            Assert.assertEquals(message.getClass().getName(), SampleModel.class.getName());
            sampleModel.setAge(100);
            ctx.stop();
        }
    });

    for(int i = 0;i<10;i++) {
        redisService.push(queue, sampleModel);
        Thread.sleep(3000);
    }
    Assert.assertEquals(100, sampleModel.getAge());
}
```

#### 4.5 Topic(pub/sub队列)

```java
@Test
public void topicTest() throws Exception {
    final SampleModel sampleModel = new SampleModel();
    sampleModel.setId(1);
    sampleModel.setAge(33);
    sampleModel.setName("zlbbq");

    RedisTopicObject topic = new RedisTopicObject("test-topic");
    RedisSubscriptionWrapper subscriptionWrapper = new RedisSubscriptionWrapper();
    redisService.subscribe(topic, SampleModel.class, subscriptionWrapper, new RedisMessageListener() {
        public void onMessage(RedisKeyBindingObject source, Object message) {
            logger.info("received from subscription");
            ProcessContext ctx = ThreadLocalProcessTracer.get().join("topicTest");
            Assert.assertEquals(message.getClass().getName(), SampleModel.class.getName());
            sampleModel.setAge(100);
            ctx.stop();
        }
    });
    Thread.sleep(1000);
    redisService.publish(topic, sampleModel);
    Thread.sleep(1000);
    Assert.assertEquals(100, sampleModel.getAge());

    sampleModel.setAge(33);
    redisService.unsubscribe(topic, subscriptionWrapper);
    Thread.sleep(1000);
    redisService.publish(topic, sampleModel);                   
    Thread.sleep(1000);
    Assert.assertEquals(33, sampleModel.getAge());
}
```

#### 4.6 使用Namespace

```java
@Test
    public void namespaceTest() throws Exception {
        RedisKeyNamespace redisKeyNamespace = new RedisKeyNamespace("cn.evun.redis.test");
        String key = redisKeyNamespace.key("keyGroupTest");

        Assert.assertEquals("cn:evun:redis:test:keyGroupTest", key);

        redisKeyNamespace = new RedisKeyNamespace("cn", "evun", "redis", "test");
        key = redisKeyNamespace.key("keyGroupTest");

        Assert.assertEquals("cn:evun:redis:test:keyGroupTest", key);
    }
```


### 5. sweet-redis配置项清单

```properties
# Redis服务器IP, 支持Redis Standalone
sweet.framework.redis.host=127.0.0.1

# redis服务端口
sweet.framework.redis.port=6379

# redis密码
sweet.framework.redis.password=

# redis数据库索引
sweet.framework.redis.database=0

# redis连接池最大活动连接数
sweet.framework.redis.pool.maxActive=8

# redis连接池最大不活动连接数
sweet.framework.redis.pool.maxIdle=8

# redis连接池达到最大连接数后, 新的redis连接获取请求等待时间, 单位: 毫秒, "-1"表示无限等待
sweet.framework.redis.pool.maxWait=-1

# redis连接池最小不活动连接数
sweet.framework.redis.pool.minIdle=0

# redis sentinel/cluster hosts, 格式: "127.0.0.1:26379;127.0.0.1:26380;127.0.0.1:26381;"   使用此参数时, sweet.framework.redis.host和sweet.framework.redis.port无效.
sweet.framework.redis.hosts=

# redis hosts types, 可以为sentinel/cluster, 默认是: sentinel,
sweet.framework.redis.hosts.type=sentinel

# redis sentinel master
sweet.framework.redis.sentinel.master=masterName

# redis 监控输出间隔时间, 默认300秒
sweet.framework.redis.monitor.output.interval=300

# 标准化cache, queue, topic的key, 自动添加的前缀: cache-prefix: sweet:cache:, queue-prefix: sweet:queue:, topic-prefix: sweet:topic:
# 注意: 当与其他非使用sweet-redis模块访问redis的应用通过redis交互数据时, 请注意当此选项打开时产生的标准化KEY前缀. 关闭它或请其他应用也遵循此规范
sweet.framework.redis.keys.normalize=true

# RedisKeyNamespace, 参考cn.evun.sweet.framework.redis.RedisKeyNamespace, 建议应用设置成cn.evun.****(项目名)
sweet.framework.redis.keys.namespace=

# redis connection timeout，默认2秒
sweet.framework.redis.timeout = 2000
```