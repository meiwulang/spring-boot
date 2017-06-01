# sweet-rabbitMQ

### 1. Introduction
**sweet-rabbitmq**提供RabbitMQ访问服务。
### 2. QuickStart
#### pom.xml
```xml
<dependency>
    <groupId>cn.evun.sweet.framework</groupId>
    <artifactId>sweet-framework-rabbitmq</artifactId>
    <version>1.0.0</version>
</dependency>
```

### 3. 注入RabbitMQService

```java

@RestController
public class MyController {

	@Autowired
	private RabbitMQService rabbitMQService;
	
	@RequestMapping("/rabbitmq-test")
	public String rabbitMQTest() {
		return rabbitMQService.send("queue-name", "Hello");
	}

}


```

### 4. 使用RabbitMQService
#### 4.1 发送消息

```java
@Test
public void simpleSendTest() throws Exception{
	rabbitService.send("q.shiguiming", 100);
	rabbitService.send("q.zhanglei", 200);
	TimeUnit.SECONDS.sleep(5);
	Assert.assertEquals(100, MQTestListener.value);
	Assert.assertEquals(200, MQTestListener2.value);
	
}
```

#### 4.2 使用RabbitMQMessageTarget发送消息

```java
@Test
public void directTargetTest() throws Exception{
	RabbitMQMessageTarget mqTarget = RabbitMQMessageTarget.createDirectTarget("q.shiguiming");
	rabbitService.send(mqTarget,300);
	TimeUnit.SECONDS.sleep(5);
	Assert.assertEquals(300, MQTestListener.value);
}
```

```java
@Test
public void fanoutTargetTest() throws Exception {
	RabbitMQMessageTarget mqTarget = RabbitMQMessageTarget.createFanoutTarget("q.fanout", new String[]{"q.fanout1","q.fanout2"});
	rabbitService.send(mqTarget, 400);
	TimeUnit.SECONDS.sleep(5);
	Assert.assertEquals(400,MQTestListener8.value);
	Assert.assertEquals(400,MQTestListener9.value);
	rabbitService.send(mqTarget, 500);
	TimeUnit.SECONDS.sleep(5);
	Assert.assertEquals(500,MQTestListener8.value);
	Assert.assertEquals(500,MQTestListener9.value);
}
```

```java
@Test
public void topicTargetTest() throws Exception {
	RabbitMQMessageTarget mqTarget = RabbitMQMessageTarget.createTopicTarget("q.topic", "q.routingKey", "queue1", "queue2");
	rabbitService.send(mqTarget, 400);
	TimeUnit.SECONDS.sleep(5);
	Assert.assertEquals(400,MQTestListener8.value);
	Assert.assertEquals(400,MQTestListener9.value);
	rabbitService.send(mqTarget, 500);
	TimeUnit.SECONDS.sleep(5);
	Assert.assertEquals(500,MQTestListener8.value);
	Assert.assertEquals(500,MQTestListener9.value);
}
```

#### 4.2 监控队列消息
##### 4.2.1 自动监听
	1. 使用@Component或@Service注解将消息监听器定义为Bean并确保它能被Spring容器加载
	2. 确认配置项"sweet.rabbitmq.autoListen"为"true"

```java
@Service
public class MQTestListener extends AbstractRabbitMessageListener {

    public static int value = 0;

    public MQTestListener() {
        super("q.shiguiming", 0);
    }

    @Override
    public void handleMessage(Object object) {
        System.out.println("MQTestListener works");
        value = (int) object;
    }
}
```
##### 4.2.2 调用RabbitMQService.listen()方法监听
```java
public class MQTestListener extends AbstractRabbitMessageListener {

    public static int value = 0;

    public MQTestListener() {
        super("q.shiguiming", 0);
    }

    @Override
    public void handleMessage(Object object) {
        System.out.println("MQTestListener works");
        value = (int) object;
    }
}
```

```java
@Test
public void sendTest() throws Exception{
	rabbitService.listen(new MQTestListener());
	
}
```

### 5. sweet-rabbitmq配置项清单

```properties
# rabbit mq服务IP
sweet.rabbitmq.host=127.0.0.1
# rabbit mq服务端口
sweet.rabbitmq.port=5672
# rabbit mq用户名
sweet.rabbitmq.username=guest
# rabbit mq密码
sweet.rabbitmq.password=guest
# 自动将RabbitMessageListener类型的Bean监听到对应的队列
sweet.rabbitmq.autoListen=true
# list of addresses with form "host[:port],..." 10.200.111.92:5672,10.200.111.244:5672，用户名密码要一致
sweet.rabbitmq.addresses=
```

## jar包依赖开发指南

jar包依赖开发指南请点击[传送门](HELP.md)