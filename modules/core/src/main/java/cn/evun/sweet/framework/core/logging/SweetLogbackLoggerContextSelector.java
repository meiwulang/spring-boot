package cn.evun.sweet.framework.core.logging;

/**
 * Created by zlbbq on 2017/2/16.
 */


import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.selector.DefaultContextSelector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SweetLogbackLoggerContextSelector extends DefaultContextSelector {
    private static final Logger logger = LoggerFactory.getLogger(SweetLogbackLoggerContextSelector.class);

    public SweetLogbackLoggerContextSelector(LoggerContext lc) {
        super(new SweetLogbackLoggerContext(lc));
    }
}
