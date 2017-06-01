package cn.evun.sweet.framework.rabbitmq;

public class ConcurrentMQTestListener extends AbstractRabbitMessageListener{
	
	public static int value =-1;
	public ConcurrentMQTestListener() {
		super("q.concurrent.listener");
	}

	@Override
	public void handleMessage(Object object) {
		
		System.out.println("ConcurrentMQTestListener:"+(Integer)object);
		value = (Integer)object;
	}
}
