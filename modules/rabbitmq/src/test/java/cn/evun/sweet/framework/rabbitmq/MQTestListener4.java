package cn.evun.sweet.framework.rabbitmq;

//@Service
public class MQTestListener4 extends AbstractRabbitMessageListener{
	
	public static int value;
	public MQTestListener4() {
		super("q.convert.default");
	}

	@Override
	public void handleMessage(Object object) {
		System.out.println("listener4 works:"+(Integer)object);
		value = (Integer)object;
	}
}
