package cn.evun.sweet.framework.core.logging;

/**
 * Created by zlbbq on 2017/2/16.
 */


import ch.qos.logback.classic.BasicConfigurator;
import ch.qos.logback.classic.LoggerContext;

public class SweetLogbackConfigurator extends BasicConfigurator {
    public void configure(LoggerContext lc) {
        //使用logback ContextSelector替换Logback LoggerContext默认实现
        //写这段代码是看了logback的源码: ch.qos.logback.classic.util.ContextSelectorStaticBinder#init()
        System.setProperty("logback.ContextSelector", SweetLogbackLoggerContextSelector.class.getName());
    }
}
