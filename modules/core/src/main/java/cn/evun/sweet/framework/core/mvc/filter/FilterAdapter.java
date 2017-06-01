package cn.evun.sweet.framework.core.mvc.filter;

/**
 * Created by zlbbq on 2017/3/8.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import java.io.IOException;

public class FilterAdapter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(FilterAdapter.class);

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

    }

    @Override
    public void destroy() {

    }
}
