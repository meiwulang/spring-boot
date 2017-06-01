package cn.evun.sweet.framework.rabbitmq;

import org.springframework.stereotype.Service;

@Service
public class MQTestListener extends AbstractRabbitMessageListener {

    public static int value = -1;

    public MQTestListener() {
        super("q.shiguiming", 0);
    }

    @Override
    public void handleMessage(Object object) {
    	
        System.out.println("litener1 works:"+object);
        value = (Integer) object;
    }
}
