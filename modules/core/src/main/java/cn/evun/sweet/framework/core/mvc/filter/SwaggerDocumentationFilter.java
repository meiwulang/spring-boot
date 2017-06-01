package cn.evun.sweet.framework.core.mvc.filter;

/**
 * Created by zlbbq on 16/6/17.
 */


import cn.evun.sweet.framework.common.util.StringUtils;
import org.springframework.http.HttpStatus;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SwaggerDocumentationFilter extends SweetFilter {
//    private static final Logger logger = LoggerFactory.getLogger(SwaggerDocumentationFilter.class);

    @Override
    public void doFilterInternal(ServletRequest request, ServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setStatus(HttpStatus.NOT_FOUND.value());
        byte[] responseData = StringUtils.getBytes("<h1>Swagger rest documentation is disabled</h1>");
        httpServletResponse.setContentType("text/html;charset=utf-8");
        httpServletResponse.setContentLength(responseData.length);
        httpServletResponse.getOutputStream().write(responseData);
    }
}
