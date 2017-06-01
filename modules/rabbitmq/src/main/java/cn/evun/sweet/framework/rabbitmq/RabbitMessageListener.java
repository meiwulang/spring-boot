package cn.evun.sweet.framework.rabbitmq;

import cn.evun.sweet.framework.common.serialize.ISerializer;

/**
 * <p>     
 * 消息队列监听接口
 * </p>  
 */
public interface RabbitMessageListener {
	
	int ACK_MODE_AUTO = 0;
	
	int ACK_MODE_MANUAL = 1;
	
	int ACK_MODE_NONE = 2;
	
	/**
	 * @return 监听queue名称
	 */
	public String getTargetQueueName();
	
	/**
	 * 业务处理方法 
	 */
	public void handleMessage(Object messageData);
	
	/**
	 * @return 序列化接口
	 */
	public ISerializer getMessageSerializer();

	/**
	 * See {@link  org.springframework.amqp.rabbit.listener.AbstractMessageListenerContainer.setAcknowledgeMode(AcknowledgeMode)} for details.
	 * @return AcknowledgeMode
	 */
	public int getAcknowledgeMode();
}
