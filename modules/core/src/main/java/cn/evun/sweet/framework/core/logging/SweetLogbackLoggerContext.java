package cn.evun.sweet.framework.core.logging;

/**
 * Created by zlbbq on 2017/2/16.
 */


import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.layout.TTLLLayout;
import ch.qos.logback.core.ConsoleAppender;
import ch.qos.logback.core.encoder.LayoutWrappingEncoder;
import ch.qos.logback.core.pattern.Converter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import java.util.HashMap;
import java.util.Map;

//这里继续LoggerContext的目的在于通过代码在SpringBoot的logging自动配置下加入框架自定义的ConversionRules
public class SweetLogbackLoggerContext extends LoggerContext {
    private static final Logger logger = LoggerFactory.getLogger(SweetLogbackLoggerContext.class);

    public SweetLogbackLoggerContext(LoggerContext loggerContext) {
        this.configure(this);
    }

    private void configure(LoggerContext lc) {
        ConsoleAppender ca = new ConsoleAppender();
        ca.setContext(lc);
        ca.setName("console");
        //这边的配置只会影响到spring启动之前的log输出,因此有没有ANSI无所谓了
        ca.setWithJansi(false);
        //TODO 使用org.springframework.boot.ansi.AnsiOutput和继承LayoutWrappingEncoder实现对刚启动的日志的颜色输出
        LayoutWrappingEncoder encoder = new LayoutWrappingEncoder();
        encoder.setContext(lc);
        TTLLLayout layout = new TTLLLayout();
        layout.setContext(lc);
        layout.start();
        encoder.setLayout(layout);
        ca.setEncoder(encoder);
        ca.start();
        ch.qos.logback.classic.Logger rootLogger = lc.getLogger("ROOT");
        rootLogger.addAppender(ca);
        rootLogger.setLevel(Level.INFO);
        ch.qos.logback.classic.Logger zkLogger = lc.getLogger("org.apache.zookeeper");
        zkLogger.setLevel(Level.WARN);
    }

    private void conversionRule(String conversionWord, Class<? extends Converter> converterClass) {
        Assert.hasLength(conversionWord, "Conversion word must not be empty");
        Assert.notNull(converterClass, "Converter class must not be null");
        Map registry = (Map)this.getObject("PATTERN_RULE_REGISTRY");
        if(registry == null) {
            registry = new HashMap();
            this.putObject("PATTERN_RULE_REGISTRY", registry);
        }

        registry.put(conversionWord, converterClass.getName());
    }

    public void reset() {
        super.reset();
        this.conversionRule("rid", LogbackRequestIdPatternConverter.class);
        this.conversionRule("appId", ApplicationIdPatternConverter.class);
    }
}
