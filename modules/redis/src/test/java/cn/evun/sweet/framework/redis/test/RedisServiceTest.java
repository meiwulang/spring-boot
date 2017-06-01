package cn.evun.sweet.framework.redis.test;

/**
 * Created by zlbbq on 16/6/1.
 */


import cn.evun.sweet.framework.common.tracer.ProcessContext;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.redis.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.io.IOException;
import java.io.InputStream;

public class RedisServiceTest {
    private static final Logger logger = LoggerFactory.getLogger(RedisServiceTest.class);

    RedisServiceTestAnnotationConfigApplicationContext applicationContext = null;
    RedisServiceFacade redisService = null;

    @Before
    public void loadSpringContext() {
        loadConfigurationFromResource("/sweet-redis.properties");
        setSystemProperties();
        applicationContext = new RedisServiceTestAnnotationConfigApplicationContext("cn.evun.sweet.framework.redis");
        redisService = (RedisServiceFacade) (applicationContext.getBean("redisService"));
    }

    private void loadConfigurationFromResource(String resource) {
        InputStream is = RedisServiceTest.class.getResourceAsStream(resource);
        try {
            if (is != null) {
                System.getProperties().load(is);
            }
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
    }

    private void setSystemProperties() {
        System.setProperty("sweet.framework.redis.keys.group", "cn.evun.redis.test.case");
        System.setProperty("logging.level", "INFO");
    }

    @Test
    public void cacheTest() throws Exception {
        redisService.set("test", "ABC123", 3);
        Assert.assertEquals(redisService.get("test"), "ABC123");

        Thread.sleep(5000);

        String test = redisService.get("test");
        Assert.assertNull(test);

        SampleModel sampleModel = new SampleModel();
        sampleModel.setId(1);
        sampleModel.setAge(33);
        sampleModel.setName("zlbbq");

        redisService.set("zlbbq", sampleModel);
        SampleModel zlbbq = redisService.get("zlbbq", SampleModel.class);
        Assert.assertEquals(zlbbq.getName(), sampleModel.getName());

        redisService.delete("zlbbq");
        zlbbq = redisService.get("zlbbq", SampleModel.class);
        Assert.assertNull(zlbbq);
    }

    @Test
    public void queueTest() throws Exception {
        final SampleModel sampleModel = new SampleModel();
        sampleModel.setId(1);
        sampleModel.setAge(33);
        sampleModel.setName("zlbbq");

        RedisQueueObject queue = new RedisQueueObject("test-queue");
        redisService.listen(queue, SampleModel.class, 5, new RedisMessageListener() {
            public void onMessage(RedisKeyBindingObject source, Object message) {
                logger.info("received from queue");
                ProcessContext ctx = ThreadLocalProcessTracer.get().join(ProcessContext.Type.RedisMessageConsumer, "queueTest");
                Assert.assertEquals(message.getClass().getName(), SampleModel.class.getName());
                sampleModel.setAge(100);
                ctx.stop();
            }
        });

        for (int i = 0; i < 10; i++) {
            redisService.push(queue, sampleModel);
            Thread.sleep(3000);
        }
        Assert.assertEquals(100, sampleModel.getAge());
    }

    @Test
    public void topicTest() throws Exception {
        final SampleModel sampleModel = new SampleModel();
        sampleModel.setId(1);
        sampleModel.setAge(33);
        sampleModel.setName("zlbbq");

        RedisTopicObject topic = new RedisTopicObject("test-topic");
        RedisSubscriptionWrapper subscriptionWrapper = new RedisSubscriptionWrapper();
        redisService.subscribe(topic, SampleModel.class, subscriptionWrapper, new RedisMessageListener() {
            public void onMessage(RedisKeyBindingObject source, Object message) {
                logger.info("received from subscription");
                ProcessContext ctx = ThreadLocalProcessTracer.get().join(ProcessContext.Type.RedisMessageConsumer, "topicTest");
                Assert.assertEquals(message.getClass().getName(), SampleModel.class.getName());
                sampleModel.setAge(100);
                ctx.stop();
            }
        });
        Thread.sleep(1000);
        redisService.publish(topic, sampleModel);
        Thread.sleep(1000);
        Assert.assertEquals(100, sampleModel.getAge());

        sampleModel.setAge(33);
        redisService.unsubscribe(topic, subscriptionWrapper);
        Thread.sleep(1000);
        redisService.publish(topic, sampleModel);                   //因为unsubscribed, 所以此值未被listener处理,还是33

        Thread.sleep(1000);
        Assert.assertEquals(33, sampleModel.getAge());
    }

    @Test
    public void dlockTest() throws Exception {
        int n = 0;
        RedisDistributedLockObject dlock = new RedisDistributedLockObject("dlock");

        // clean lock
        redisService.unlock(dlock);
        Thread.sleep(1000);

        if (redisService.lock(dlock)) {
            n = 1;
        }
        Assert.assertEquals(1, n);
        Thread.sleep(1000);
        if (redisService.lock(dlock)) {
            n = 2;
        }
        Assert.assertNotEquals(2, n);

        redisService.unlock(dlock);
        Thread.sleep(1000);
        if (redisService.lock(dlock)) {
            n = 2;
        }
        Assert.assertEquals(2, n);
        redisService.unlock(dlock);
        Thread.sleep(1000);

        // self release test
        n = 0;
        dlock = new RedisDistributedLockObject("dlock", 3);
        if (redisService.lock(dlock)) {
            n = 1;
        }
        Assert.assertEquals(1, n);
        Thread.sleep(1000);

        Thread.sleep(3000);
        if (redisService.lock(dlock)) {
            n = 2;
        }
        Assert.assertEquals(2, n);
    }

    @Test
    public void dcounterTest() throws Exception {
        RedisDistributedCounterObject dcounter = new RedisDistributedCounterObject("dcounter");
        redisService.delete(dcounter);
        Thread.sleep(1000);


        redisService.increase(dcounter, 1);

        long val = redisService.getCurrent(dcounter);
        Assert.assertEquals(1, val);

        val = redisService.decrease(dcounter, 1);
        Assert.assertEquals(0, val);

        val = redisService.increase(dcounter, 2);
        Assert.assertEquals(2, val);

        redisService.delete(dcounter);
        Thread.sleep(1000);
        val = redisService.getCurrent(dcounter);
        Assert.assertEquals(0, val);
    }

    @Test
    public void monitorTest() throws Exception {
        logger.info("please wait a long while for monitor metrics reporting...");
        Thread.sleep(35000);
    }

    @Test
    public void namespaceTest() throws Exception {
        RedisKeyNamespace redisKeyNamespace = new RedisKeyNamespace("cn.evun.redis.test");
        String key = redisKeyNamespace.key("keyGroupTest");

        Assert.assertEquals("cn:evun:redis:test:keyGroupTest", key);

        redisKeyNamespace = new RedisKeyNamespace("cn", "evun", "redis", "test");
        key = redisKeyNamespace.key("keyGroupTest");

        Assert.assertEquals("cn:evun:redis:test:keyGroupTest", key);
    }
}

class RedisServiceTestAnnotationConfigApplicationContext extends AnnotationConfigApplicationContext {
    RedisServiceTestAnnotationConfigApplicationContext(String... basePackages) {
        super();
        GenericBeanDefinition gbd = new GenericBeanDefinition();
        gbd.setBeanClass(PropertyPlaceholderConfigurer.class);
        this.registerBeanDefinition("propertyPlaceholderConfigurer", gbd);
        this.scan(basePackages);
        this.refresh();
    }
}
