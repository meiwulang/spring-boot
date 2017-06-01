# DMS、DCS集成rabbitMQ
### 1.	说明
	G助手开发需要使用到DMS和DCS中的动态数据，为不影响WeblogicMQ正常运行，集成RabbitMQ作为替代
### 2.	需引入的jar包文件
- amqp-client-3.1.3.jar
- metrics-core-3.1.2.jar
- slf4j-api-1.7.21.jar
- spring-amqp-1.3.3.RELEASE.jar
- spring-rabbit-1.3.3.RELEASE.jar
- spring-retry-1.1.2.RELEASE.jar
- sweet-common-1.0.0.jar(技术中心)
- sweet-rabbitmq-1.0.18.jar(技术中心)

  #### spring版本依赖：
  以上jar包版本基spring 3.0.6

### 3.	引入配置文件

sweet-rabbitmq.properties
rabbitmq配置信息
### 4.系统集成配置文件

在springframework.xml中通过PropertyPlaceholderConfigurer引入配置文件路径
### 5.使用rabbitMQ

```
@Service
public class TestServiceImpl impl TestService{
		//自动装配MQ对象
		@Autowired
private RabbitMQService rabbitMQService;
@Override
public void testMethod(){
	//发送MQ消息
	rabbitMQService.send(“q.zhangas”,100);
}
}
```
