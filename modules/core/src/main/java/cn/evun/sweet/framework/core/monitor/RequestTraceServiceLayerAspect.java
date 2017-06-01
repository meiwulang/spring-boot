package cn.evun.sweet.framework.core.monitor;

/**
 * Created by zlbbq on 16/6/4.
 */


import cn.evun.sweet.framework.common.tracer.ProcessContext;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;


@Aspect
public class RequestTraceServiceLayerAspect {
//    private static final Logger logger = LoggerFactory.getLogger(RequestTraceServiceLayerAspect.class);

    @Pointcut(value="within(@org.springframework.stereotype.Service *)")
    private void serviceMethod() {}


    @Around("serviceMethod()")
    public Object doTrace(ProceedingJoinPoint pjp) throws Throwable{
        ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
        String serviceClass = pjp.getTarget().getClass().getSimpleName();
        String serviceMethod = pjp.getSignature().getName();
        ProcessContext ctx = tracer.join(ProcessContext.Type.Service, serviceClass + "." + serviceMethod + "()");
        try {
            Object object = pjp.proceed();//执行该方法
            return object;
        }catch(Exception e) {
            ctx.setAttribute("error", true);
            throw e;
        }
        finally {
            ctx.stop();
        }
    }
}
