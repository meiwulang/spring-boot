package cn.evun.sweet.framework.rabbitmq;

/**
 * 消息队列接口
 *
 * @author shiguiming
 *
 */
public interface RabbitMQService {

	/**
	 * 信息发送(exchangeType:direct)
	 * 
	 * @param queueName
	 *            queueName名称
	 * @param data
	 *            发送数据对象
	 */
	void send(String queueName, Object data);

	/**
	 * 信息发送
	 * 
	 * @param RabbitMQMessageTarget 信息类型对象
	 * @param data 数据对象
	 */
	void send(RabbitMQMessageTarget target, Object data);
	

	
	/**
	 * 注册消费者
	 *
	 * @param l 消费者实例
     */
	void listen(RabbitMessageListener l);
	/**
	 * 注册消费者
	 *
	 * @param l 消费者实例
	 */
	void listen(RabbitMessageListener l, Integer concurrentConsumers);
}