package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener8 extends AbstractRabbitMessageListener{
	
	public static int value = -1;
	public MQTestListener8() {
		super("q.fanout1");
	}

	@Override
	public void handleMessage(Object object) {
		
		System.out.println("listener8 works:"+(Integer)object);
		value = (Integer)object;
	}
}
