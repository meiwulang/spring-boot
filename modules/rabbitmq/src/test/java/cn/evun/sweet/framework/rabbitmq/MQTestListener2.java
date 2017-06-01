package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener2 extends AbstractRabbitMessageListener{
	
	public static int value = -1;
	public MQTestListener2() {
		super("q.direct");
	}

	@Override
	public void handleMessage(Object object) {
		System.out.println("listener2 works:"+(Integer)object);
		value = (Integer)object;
	}
}
