package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener10 extends AbstractRabbitMessageListener{
	
	public static int value = -1;
	public MQTestListener10() {
		super("q.zhanglei");
	}

	@Override
	public void handleMessage(Object object) {
		System.out.println("listener10 works:"+(Integer)object);
		value = (Integer)object;
	}
}
