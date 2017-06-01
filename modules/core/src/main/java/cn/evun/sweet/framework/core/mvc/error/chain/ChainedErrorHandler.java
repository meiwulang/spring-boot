package cn.evun.sweet.framework.core.mvc.error.chain;

/**
 * Created by zlbbq on 2017/3/8.
 */


import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//ChainedErrorHandler需要自己控制异常的输出, 框架错误处理类(SweetErrorController)会将异常输出控制权完全交给匹配的ChainedErrorHandler
public abstract class ChainedErrorHandler {
    private static final Logger logger = LoggerFactory.getLogger(ChainedErrorHandler.class);

    private static JSONSerializer jsonSerializer = new JSONSerializer();

    protected String name;

    protected int order;

    protected ChainedErrorHandler(String name) {
        this(name, 0);
    }

    protected ChainedErrorHandler(String name, int order) {
        this.setName(name);
        this.setOrder(order);
    }

    protected void outputAPIResponse(APIResponse apiResponse, HttpServletRequest request, HttpServletResponse response, int httpStatus) {
        logger.debug("output request [{}] error with json representation ", request.getRequestURI());
        try {
            byte[] data = jsonSerializer.serialize(apiResponse);
            response.setStatus(httpStatus);
            response.setContentType("application/json;charset=utf-8");
            response.setContentLength(data.length);
            response.getOutputStream().write(data);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    public boolean isTarget(Throwable t) {
        return false;
    }

    public abstract void handleError(Throwable t, HttpServletRequest request, HttpServletResponse response);

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
