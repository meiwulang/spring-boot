package cn.evun.sweet.framework.rabbitmq;

public class MultiMQTestListener extends AbstractRabbitMessageListener{
	private static int count = 0;
	private final int id = count++;
	
	public static int value =-1;
	public MultiMQTestListener() {
		super("q.multi.listen");
	}

	@Override
	public void handleMessage(Object object) {
		
		System.out.println("multiListener"+id+" works:"+(Integer)object);
		value = (Integer)object;
	}
}
