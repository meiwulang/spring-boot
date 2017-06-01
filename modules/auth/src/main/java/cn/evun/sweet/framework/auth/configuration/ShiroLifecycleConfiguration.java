package cn.evun.sweet.framework.auth.configuration;

/**
 * Created by zlbbq on 2017/3/16.
 */


import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
/**
 * 因为@Value的注入不能在BeanPostProcessor中执行, @Configuration的对象生命周期取决于其定义的@Bean的生命周期,
 * LifecycleBeanPostProcessor是一个BeanPostProcessor, 需要把它移出来, 否则@Value取不到值(ShiroAutoConfiguration.workMode)
 * */
public class ShiroLifecycleConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(ShiroLifecycleConfiguration.class);

    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }
}
