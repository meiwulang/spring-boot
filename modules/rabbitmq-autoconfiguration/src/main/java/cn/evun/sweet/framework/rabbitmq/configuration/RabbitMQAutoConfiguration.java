package cn.evun.sweet.framework.rabbitmq.configuration;

import cn.evun.sweet.framework.rabbitmq.RabbitMQService;
import cn.evun.sweet.framework.rabbitmq.RabbitMessageListener;
import cn.evun.sweet.framework.rabbitmq.SimpleRabbitService;
import com.codahale.metrics.Slf4jReporter;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JsonMessageConverter;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collection;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

@Configuration
public class RabbitMQAutoConfiguration implements ApplicationContextAware, InitializingBean{

	ApplicationContext applicationContext;
	
	@Value("${sweet.framework.rabbitmq.autoListen:true}") private boolean autoListen;
	
	@Value("${sweet.framework.rabbitmq.host:127.0.0.1}") private String host;
	
	@Value("${sweet.framework.rabbitmq.port:5672}") private int port;
	
	@Value("${sweet.framework.rabbitmq.userName:guest}") private String userName;
	
	@Value("${sweet.framework.rabbitmq.password:guest}") private String password;
	
	@Value("${sweet.framework.rabbitmq.metrics.report.interval:30}") private int reportInterval;
	
	@Value("${sweet.framework.rabbitmq.serialize.type:1}") private int serializationType;

	@Value("${sweet.framework.rabbitmq.addresses:}") private String addresses;
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}

	@Bean
	public ConnectionFactory rabbitConnectionFactory() {
		CachingConnectionFactory cf = new CachingConnectionFactory();
		cf.setHost(host);
		cf.setPassword(password);
		cf.setUsername(userName);
		cf.setPort(port);
		// This property overrides the host+port properties if not empty.
		cf.setAddresses(addresses);
		
		return cf;
	}

	@Bean
	@Autowired
	public RabbitTemplate rabbitTemplate(ConnectionFactory cf) {
		RabbitTemplate template = new RabbitTemplate(cf);
		return template;
	}

	@Bean
	@Autowired
	public RabbitAdmin rabbitAdmin(ConnectionFactory cf) {
		RabbitAdmin admin = new RabbitAdmin(cf);
		return admin;
	}

	@Bean
    @Autowired
    public Slf4jReporter redisServiceMetricsReporter(SimpleRabbitService simpleRabbitService) {
        Slf4jReporter reporter = Slf4jReporter.forRegistry(simpleRabbitService.getRabbitMQMetrics().getMetricRegistry()).build();
        reporter.start(reportInterval, TimeUnit.SECONDS);
        return reporter;
    }
	
	@Bean
	@Autowired
	public RabbitMQService rabbitMQService(
			ConnectionFactory rabbitConnectionFactory, 
			RabbitTemplate rabbitTemplate,
			RabbitAdmin admin) {
		if(serializationType == 1 ) {
			return new SimpleRabbitService(rabbitConnectionFactory, rabbitTemplate, admin);
		} else if(serializationType == 2) {
			return new SimpleRabbitService(rabbitConnectionFactory, rabbitTemplate, admin, new JsonMessageConverter());
		} else {
			return new SimpleRabbitService(rabbitConnectionFactory, rabbitTemplate, admin);
		}
	}
	/*@Bean
	@Autowired
	public RabbitMQService rabbitMQServiceSerializable(
			ConnectionFactory rabbitConnectionFactory, 
			RabbitTemplate rabbitTemplate,
			RabbitAdmin admin) {
		return new SimpleRabbitService(rabbitConnectionFactory, rabbitTemplate, admin, );
	}*/

	@Override
	public void afterPropertiesSet() throws Exception {
		if(autoListen) {
			Collection<RabbitMessageListener> rabbitListeners = applicationContext.getBeansOfType(RabbitMessageListener.class).values();
			RabbitMQService rabbitMQService = applicationContext.getBean(RabbitMQService.class);
			Iterator<RabbitMessageListener> it = rabbitListeners.iterator();
			while(it.hasNext()) {
				rabbitMQService.listen(it.next());
			}
		}
	}
	
}
