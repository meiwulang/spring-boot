package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener7 extends AbstractRabbitMessageListener{
	
	public static int value = -1;
	public MQTestListener7() {
		super("queue2");
	}

	@Override
	public void handleMessage(Object object) {
		
		System.out.println("listener7 works:"+(Integer)object);
		value = (Integer)object;
	}
}
