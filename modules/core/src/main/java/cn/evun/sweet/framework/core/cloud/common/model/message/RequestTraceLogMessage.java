package cn.evun.sweet.framework.core.cloud.common.model.message;

/**
 * Created by zlbbq on 2016/12/8.
 */


import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.core.cloud.CloudApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestTraceLogMessage extends ApplicationLogMessage {
    private static final Logger logger = LoggerFactory.getLogger(RequestTraceLogMessage.class);

    private ThreadLocalProcessTracer tracer;

    public RequestTraceLogMessage(CloudApplication cloudApplication, ThreadLocalProcessTracer tracer) {
        super(cloudApplication);
        this.tracer = tracer;
    }

    public ThreadLocalProcessTracer getTracer() {
        return tracer;
    }

    public void setTracer(ThreadLocalProcessTracer tracer) {
        this.tracer = tracer;
    }
}
