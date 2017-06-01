package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class MQTestListener11 extends AbstractRabbitMessageListener{
	
	public static int value;
	public MQTestListener11() {
		super("q.zhanglei");
	}

	@Override
	public void handleMessage(Object object) {
		try {
			TimeUnit.SECONDS.sleep(2);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("listener11 works:"+(Integer)object);
		value = (Integer)object;
	}
}
