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

@Activate(group = "provider")
public class ProviderTraceFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(ProviderTraceFilter.class);

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {

        ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get(getTraceIdFromRpcContext());
        tracer.beginTrace();
        ProcessContext ctx = tracer.join(ProcessContext.Type.DubboProvider, invocation.getMethodName() + "()");
        Result result = null;
        try {
            result = invoker.invoke(invocation);
        } catch (RpcException e) {
            ctx.setAttribute("error", true);
            throw e;
        } finally {
            ctx.stop();
            tracer.stopTrace();
            tracer.log("DUBBO PROVIDER TRACE");
            ThreadLocalProcessTracer.clean();
        }
        return result;
    }

    private String getTraceIdFromRpcContext() {
        return RpcContext.getContext().getAttachment(Constants.SWEET_DUBBO_TRACE_ID);
    }
}