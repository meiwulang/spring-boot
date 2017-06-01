package cn.evun.sweet.framework.rabbitmq;

import cn.evun.sweet.framework.rabbitmq.SimpleRabbitService.ExchangeType;

public class RabbitMQMessageTarget {

	/**
	 * <p>返回一个向指定queue发送消息的信息对象，其中exchange默认与queue名称一致，
	 * exchangeType为direct类型。</p>
	 * 
	 * @param queueName queue名称
	 * @return 向指定queue发送数据的信息类型对象
	 */
	public static final RabbitMQMessageTarget createDirectTarget(String queueName) {
		return new RabbitMQMessageTarget(queueName, queueName, ExchangeType.DIRECT, queueName);
	}

	/**
	 * <p>返回一个向指定queue发送消息的信息对象，exchangeType为fanout类型，
	 * 所有指定的queue都将接收到发送的消息。</p>
	 * 
	 * @param exchangeName exchange名称
	 * @param queueNames 接收exchange消息的队列名称
	 * @return
	 */
	public static final RabbitMQMessageTarget createFanoutTarget(String exchangeName, String... queueNames) {
		return new RabbitMQMessageTarget(exchangeName, null, ExchangeType.FANOUT, queueNames);
	}
	
	/**
	 * <p>返回一个向指定queue发送消息的信息对象，exchangeType为topic类型，
	 * 所有指定的queue都将接收到发送的消息。</p>
	 * 
	 * @param exchangeName
	 * @param routingKey
	 * @param queueNames
	 * @return
	 */
	public static final RabbitMQMessageTarget createTopicTarget(String exchangeName,String routingKey, String... queueNames) {
		return new RabbitMQMessageTarget(exchangeName, routingKey, ExchangeType.TOPIC, queueNames);
	}
	
	private String[] queueNames;

	private String exchangeName;

	private String routingKey;

	private ExchangeType exchangeType;

	protected RabbitMQMessageTarget() {

	}

	protected RabbitMQMessageTarget(String exchangeName, String routingKey, ExchangeType exchangeType,
			String... queueNames) {
		this.exchangeName = exchangeName;
		this.routingKey = routingKey;
		this.exchangeType = exchangeType;
		this.queueNames = queueNames;
	}

	public String[] getQueueNames() {
		return queueNames;
	}

	public void setQueueNames(String[] queueNames) {
		this.queueNames = queueNames;
	}

	public String getExchangeName() {
		return exchangeName;
	}

	public void setExchangeName(String exchangeName) {
		this.exchangeName = exchangeName;
	}

	public String getRoutingKey() {
		return routingKey;
	}

	public void setRoutingKey(String routingKey) {
		this.routingKey = routingKey;
	}

	public ExchangeType getExchangeType() {
		return exchangeType;
	}

	public void setExchangeType(ExchangeType exchangeType) {
		this.exchangeType = exchangeType;
	}


}
