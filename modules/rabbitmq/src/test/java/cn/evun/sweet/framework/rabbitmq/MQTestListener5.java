package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener5 extends AbstractRabbitMessageListener{
	
	public static int value;
	public MQTestListener5() {
		super("q.convert.one");
	}

	@Override
	public void handleMessage(Object object) {
		System.out.println("listener5 works:"+object);
	}
}
