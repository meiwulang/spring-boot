package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener9 extends AbstractRabbitMessageListener{
	
	public static int value =-1;
	public MQTestListener9() {
		super("q.fanout2");
	}

	@Override
	public void handleMessage(Object object) {
		
		System.out.println("listener9 works:"+(Integer)object);
		value = (Integer)object;
	}
}
