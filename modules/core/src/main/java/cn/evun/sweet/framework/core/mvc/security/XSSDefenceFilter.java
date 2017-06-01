package cn.evun.sweet.framework.core.mvc.security;

/**
 * Created by zlbbq on 16/6/12.
 */


import cn.evun.sweet.framework.core.mvc.filter.SweetFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class XSSDefenceFilter extends SweetFilter {
//    private static final Logger logger = LoggerFactory.getLogger(XSSDefenceFilter.class);


    @Override
    public void doFilterInternal(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException {
        filterChain.doFilter(new XSSDefenceRequestWrapper((HttpServletRequest) servletRequest), servletResponse);
    }
}
