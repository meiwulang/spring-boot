package cn.evun.sweet.framework.core.mvc.filter;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zlbbq on 16/6/4.
 */
public interface SessionUserFetcher {
    String getUserId(HttpServletRequest request);
}
