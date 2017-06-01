package cn.evun.sweet.framework.core.monitor;

/**
 * Created by zlbbq on 16/6/5.
 */


import cn.evun.sweet.framework.common.tracer.ProcessContext;
import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import java.util.Properties;

@Intercepts({
        @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class})
        ,
        @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class})

})
public class DaoTraceInterceptor implements Interceptor {
//    private static final Logger logger = LoggerFactory.getLogger(DaoTraceInterceptor.class);

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object firstArg = invocation.getArgs()[0];
        String daoAPIName = "[Parse-Failed]";
        if(firstArg instanceof MappedStatement) {
            daoAPIName = this.toShortId(((MappedStatement)firstArg).getId() + "()");
        }

        ProcessContext ctx = ThreadLocalProcessTracer.get().join(ProcessContext.Type.DataAccess, daoAPIName);
        try {
            return invocation.proceed();
        }catch(Exception e) {
            ctx.setAttribute("error", true);
            throw e;
        }
        finally {
            ctx.stop();
        }
    }

    private String toShortId(String longId) {
        for(int i = 0;i<longId.length();i++) {
            char c = longId.charAt(i);
            if(Character.isUpperCase(c)) {
                return longId.substring(i);
            }
        }
        return longId;
    }

    @Override
    public Object plugin(Object target) {
        return target instanceof Executor? Plugin.wrap(target, this):target;
    }

    @Override
    public void setProperties(Properties properties) {
    }
}
