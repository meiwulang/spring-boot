package cn.evun.sweet.framework.dubbo.filter;
/**
 * @author ruanrj
 * @description
 * @create 2017-02-15.
 */

import cn.evun.sweet.framework.common.tracer.ProcessContext;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import cn.evun.sweet.framework.dubbo.Constants;
import com.alibaba.dubbo.common.extension.Activate;
import com.alibaba.dubbo.rpc.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Activate(group = "consumer")
public class ConsumerTraceFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(ConsumerTraceFilter.class);

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {

        ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
        RpcContext.getContext().setAttachment(Constants.SWEET_DUBBO_TRACE_ID, tracer.getTraceId());
        ProcessContext ctx = tracer.join(ProcessContext.Type.DubboConsumer, invocation.getMethodName() + "()");

        Result result = null;
        try {
            result = invoker.invoke(invocation);
        } catch (RpcException e) {
            ctx.setAttribute("error", true);
            throw e;
        } finally {
            ctx.stop();
        }
        return result;
    }
}