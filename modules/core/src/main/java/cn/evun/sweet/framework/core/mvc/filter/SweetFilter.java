package cn.evun.sweet.framework.core.mvc.filter;
/**
 * @author ruanrj
 * @description
 * @create 2017-02-08.
 */

import javax.servlet.*;
import java.io.IOException;

//请使用"FilterAdapter"
//Deprecated Since 2.0.2
@Deprecated
public abstract class SweetFilter extends FilterAdapter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilterInternal(request, response, chain);
    }

    @Override
    public void destroy() {
    }

    public abstract void doFilterInternal(ServletRequest request, ServletResponse response, FilterChain filterChain) throws ServletException, IOException;
}