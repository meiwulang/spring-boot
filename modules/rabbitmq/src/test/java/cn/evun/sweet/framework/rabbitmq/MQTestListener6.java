package cn.evun.sweet.framework.rabbitmq;

//@Service
public class MQTestListener6 extends AbstractRabbitMessageListener{
	
	public static int value = -1;
	public MQTestListener6() {
		super("q.convert.two");
	}

	@Override
	public void handleMessage(Object object) {
		
		System.out.println("listener6 works:"+(Integer)object);
		value = (Integer)object;
	}
}
