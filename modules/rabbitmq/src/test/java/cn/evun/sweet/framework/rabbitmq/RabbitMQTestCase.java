package cn.evun.sweet.framework.rabbitmq;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class RabbitMQTestCase {

	RabbitMQService rabbitService;

	@Before
	public void beforeTest() {
		MyApplicationContext myCtx = new MyApplicationContext("cn.evun.sweet.rabbitmq");
		rabbitService = (RabbitMQService) myCtx.getBean(RabbitMQService.class);
	}

	@Test
	public void directTest() throws Exception {
		rabbitService.send("q.shiguiming", 100);
		rabbitService.send("q.direct", 200);
		TimeUnit.SECONDS.sleep(2);
		Assert.assertEquals(100, MQTestListener.value);
		Assert.assertEquals(200, MQTestListener2.value);

	}

	@Test
	public void directTargetTest() throws Exception {
		RabbitMQMessageTarget mqTarget = RabbitMQMessageTarget.createDirectTarget("q.direct.mqTarget");
		rabbitService.send(mqTarget, 300);
		TimeUnit.SECONDS.sleep(2);
		Assert.assertEquals(300, MQTestListener3.value);
	}

	@Test
	public void fanoutTargetTest() throws Exception {
		RabbitMQMessageTarget mqTarget = RabbitMQMessageTarget.createFanoutTarget("q.fanout",
				new String[] { "q.fanout1", "q.fanout2" });
		rabbitService.send(mqTarget, 400);
		TimeUnit.SECONDS.sleep(2);
		Assert.assertEquals(400, MQTestListener8.value);
		Assert.assertEquals(400, MQTestListener9.value);
		rabbitService.send(mqTarget, 500);
		TimeUnit.SECONDS.sleep(2);
		Assert.assertEquals(500, MQTestListener8.value);
		Assert.assertEquals(500, MQTestListener9.value);
	}

	@Test
	public void topicTest() throws Exception {
		RabbitMQMessageTarget mqTarget = RabbitMQMessageTarget.createTopicTarget("q.topic", "q.*", "queue1",
				"queue2");
		rabbitService.send(mqTarget, 400);
		TimeUnit.SECONDS.sleep(2);
		Assert.assertEquals(400, MQTestListener6.value);
		Assert.assertEquals(400, MQTestListener7.value);
		rabbitService.send(mqTarget, 500);
		TimeUnit.SECONDS.sleep(2);
		Assert.assertEquals(500, MQTestListener6.value);
		Assert.assertEquals(500, MQTestListener7.value);
	}

	// @Test
	public void multiLitenerTest() throws Exception {
		for (int i = 0; i < 1000; i++) {
			rabbitService.send("q.zhanglei", i);
		}
		TimeUnit.SECONDS.sleep(10);
	}
	@Test
	public void  parallelMultiListenerTest() throws Exception {
		for(int i=0; i<4; i++) {
			rabbitService.listen(new MultiMQTestListener());
		}
		for(int j=0; j<400;j++) {
			rabbitService.send("q.multi.listen", j);
		}
		TimeUnit.SECONDS.sleep(10);
		
	}
	@Test
	public void testSerializationOfJDK() {

//		rabbitService.send("q.convert.default", new Student("niub",18));
	}
	@Test
	public void testSerializationOfJson() {
		rabbitService.send("q.convert.one", new JacksonJsonUtil<Student>().marshaller(new Student("ruanrj",1111)));
	}
	@Test
	public void concurrentListenerTest() throws InterruptedException {
/*		for (int i = 0; i < 10; i++) {
			rabbitService.send("q.concurrent.listener", i);
		}*/
		rabbitService.listen(new ConcurrentMQTestListener(),2);
		TimeUnit.SECONDS.sleep(20);
	}
	
	@Test
	public void run(){
		
	}

	private static class MyApplicationContext extends AnnotationConfigApplicationContext {
		public MyApplicationContext(String basePackages) {
			super();
			GenericBeanDefinition beanDefination = new GenericBeanDefinition();
			beanDefination.setBeanClass(PropertyPlaceholderConfigurer.class);
			Map map = new HashMap<String, String>();
			map.put("locations", "/sweet-rabbitmq.properties");
			beanDefination.setPropertyValues(new MutablePropertyValues(map));
			this.registerBeanDefinition("propertyPlaceholderConfigurer", beanDefination);
			scan(basePackages);
			refresh();
		}
	}

}
class Student implements Serializable{
	private static final long serialVersionUID = 1L;
	String name;
	Integer age;
	public Student(String name, Integer age) {
		this.name = name;
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	
}

class JacksonJsonUtil<T> {

    private static ObjectMapper objectMapper;

    static {
        objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, true);
        objectMapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES,true);
        objectMapper.configure(SerializationFeature.FLUSH_AFTER_WRITE_VALUE,true);
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    /**
     * 对象JSON序列化
     * @param t
     * @return
     */
    public  String marshaller(final T t) {
        String json = null;
        try {
            json = objectMapper.writeValueAsString(t);
        } catch (JsonProcessingException e) {
        }
        return json;
    }

    /**
     * json字符串反序列化对象
     * @param json json字符串解析对象
     * @param clazz 类型
     * @param <T>
     * @return
     */
    public <T> T unmarshaller(final String json, final Class<T> clazz) {
        T t = null;
        try {
            t = objectMapper.readValue(json.getBytes(), clazz);
        } catch (IOException e) {
        }
        return t;
    }
}

