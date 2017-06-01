package cn.evun.sweet.framework.auth.filter;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.common.serialize.support.JSONSerializer;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 替代shiro标准"authc"的功能
 * */
public class SweetStandardResourceFilter extends FormAuthenticationFilter {
    private static final Logger logger = LoggerFactory.getLogger(SweetStandardResourceFilter.class);

    private static final JSONSerializer jsonSerializer = new JSONSerializer();

    protected void redirectToLogin(ServletRequest request, ServletResponse response) throws IOException {
        APIResponse apiResponse = new APIResponse(APIResponse.USER_NOT_LOGIN, this.getLoginUrl());
        this.outputAPIResponse((HttpServletResponse) response, apiResponse);
    }

    //这里, 原来FormAuthenticationFilter的实现是响应了302, 然后跳转到登录页
    //在前后端分离的应用下, 应直接响应一个JSON错误, SWEET标准错误码APIResponse.USER_NOT_LOGIN
    protected void outputAPIResponse(HttpServletResponse response, APIResponse apiResponse) throws IOException {
        String output = jsonSerializer.serialize2JSON(apiResponse);
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(output);
    }
}
