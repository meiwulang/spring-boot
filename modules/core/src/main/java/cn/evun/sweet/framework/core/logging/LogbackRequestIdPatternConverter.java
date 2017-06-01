package cn.evun.sweet.framework.core.logging;

/**
 * Created by zlbbq on 2017/2/16.
 */


import ch.qos.logback.classic.pattern.ClassicConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogbackRequestIdPatternConverter extends ClassicConverter {
    private static final Logger logger = LoggerFactory.getLogger(LogbackRequestIdPatternConverter.class);

    private static final String FORMAT = "[rid - %s]";

    @Override
    public String convert(ILoggingEvent iLoggingEvent) {
        String rid = ThreadLocalProcessTracer.getThreadLocalTraceId();
        if(StringUtils.hasText(rid)) {
            return String.format(FORMAT, rid);
        }
        else {
            return "";
        }
    }
}
