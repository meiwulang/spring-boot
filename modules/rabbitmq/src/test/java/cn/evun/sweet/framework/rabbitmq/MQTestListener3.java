package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener3 extends AbstractRabbitMessageListener{
	
	public static int value = -1;
	public MQTestListener3() {
		super("q.direct.mqTarget");
	}

	@Override
	public void handleMessage(Object object) {
		System.out.println("listener3 works:"+(Integer)object);
		value = (Integer)object;
	}
}
