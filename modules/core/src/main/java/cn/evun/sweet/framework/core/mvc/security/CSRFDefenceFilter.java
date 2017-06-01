package cn.evun.sweet.framework.core.mvc.security;

/**
 * Created by zlbbq on 16/6/12.
 */


import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.mvc.filter.SweetFilter;
import org.springframework.http.HttpMethod;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;

public class CSRFDefenceFilter extends SweetFilter {
//    private static final Logger logger = LoggerFactory.getLogger(CSRFDefenceFilter.class);

    private static final String SESSION_CSRF_KEY = "__csrf__";

    private static final String HEADER_CSRF_TOKEN = "X-CSRF-TOKEN";

    private static final String BODY_CSRF_PARAMETER = "_csrf";

    @Override
    public void doFilterInternal(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest)servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse)servletResponse;
        HttpSession session = httpRequest.getSession();
        String uri = httpRequest.getRequestURI();
        String method = httpRequest.getMethod();
        // 不防御GET/HEAD/OPTIONS请求
        if(HttpMethod.GET.matches(method) || HttpMethod.HEAD.matches(method) || HttpMethod.OPTIONS.matches(method)) {
            filterChain.doFilter(servletRequest, servletResponse);
            return ;
        }

        if(checkToken(httpRequest, session)) {
            //新生成Token并写入session和response header
            updateToken(session, httpRequest, httpResponse);
            filterChain.doFilter(servletRequest, servletResponse);
            return ;
        }

        // 响应403
        httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
        httpResponse.getOutputStream().write(StringUtils.getBytes("Invalid CSRF token"));
    }

    private String updateToken(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        String token = UUID.randomUUID().toString();
        //将生成的csrf token放置到request(attribute), session and response header
        request.setAttribute(BODY_CSRF_PARAMETER, token);
        session.setAttribute(SESSION_CSRF_KEY, token);
        response.setHeader(HEADER_CSRF_TOKEN, token);
        return token;
    }

    private boolean checkToken(HttpServletRequest request, HttpSession session) {
        //获取session中的csrf
        String csrfSession = (String)session.getAttribute(SESSION_CSRF_KEY);
        if(csrfSession == null) {
            return true;
        }

        //从HTTP请求中取得CSRF TOKEN
        return csrfSession.equals(getTokenFromRequest(request));
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        // 请求body中先取
        String token = request.getParameter(BODY_CSRF_PARAMETER);
        if(token != null) {
            return token;
        }

        //取不到就取HEADER里的
        return request.getHeader(HEADER_CSRF_TOKEN);
    }
}
