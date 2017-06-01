package cn.evun.sweet.framework.dubbo.configuration;
/**
 * @author ruanrj
 * @description
 * @create 2017-02-14.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource("classpath*:/META-INF/dubbo/dubbo.xml")
public class DubboConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(DubboConfiguration.class);
}