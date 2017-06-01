package cn.evun.sweet.framework.core.mvc.error;

/**
 * Created by zlbbq on 16/6/14.
 */


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface ErrorHandler {
    void handle404(HttpServletRequest request, HttpServletResponse response) throws Exception;

    void handleError(Throwable t, HttpServletRequest request, HttpServletResponse response) throws Exception;
}
