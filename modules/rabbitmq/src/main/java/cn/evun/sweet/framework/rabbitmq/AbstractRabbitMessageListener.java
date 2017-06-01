package cn.evun.sweet.framework.rabbitmq;

import cn.evun.sweet.framework.common.serialize.ISerializer;

public abstract class AbstractRabbitMessageListener implements RabbitMessageListener {

	private ISerializer serializer;

	private String targetQueueName;

	// default acknowledgeMode:AUTO
	private int acknowledgeMode = ACK_MODE_AUTO;

	//protected AbstractRabbitMessageListener() {}
	
	public AbstractRabbitMessageListener(String queueName) {
		this(queueName, ACK_MODE_AUTO, null);
	}

	public AbstractRabbitMessageListener(String queueName, int ackMode) {
		this(queueName, ackMode, null);
	}
	
	public AbstractRabbitMessageListener(String queueName, ISerializer serializer) {
		this(queueName, ACK_MODE_AUTO, serializer);
	}

	public AbstractRabbitMessageListener(String queueName, int ackMode, ISerializer serializer) {
		this.targetQueueName = queueName;
		this.acknowledgeMode = ackMode;
		this.serializer = serializer;
	}

	@Override
	public ISerializer getMessageSerializer() {
		// 返回null表示使用默认MessageConverter
		return getSerializer();
	}

	@Override
	public int getAcknowledgeMode() {
		return acknowledgeMode;
	}

	public void setAcknowledgeMode(int acknowledgeMode) {
		this.acknowledgeMode = acknowledgeMode;
	}

	public ISerializer getSerializer() {
		return serializer;
	}

	public void setSerializer(ISerializer serializer) {
		this.serializer = serializer;
	}

	@Override
	public String getTargetQueueName() {
		return targetQueueName;
	}
	
	public void setTargetQueueName(String queueName) {
		this.targetQueueName = queueName;
	}

	@Override
	public abstract void handleMessage(Object object);
}
