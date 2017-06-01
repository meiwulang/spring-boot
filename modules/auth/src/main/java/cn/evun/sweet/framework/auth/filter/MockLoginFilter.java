package cn.evun.sweet.framework.auth.filter;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.auth.AuthUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.servlet.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class MockLoginFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(MockLoginFilter.class);

    protected AuthenticationToken mockedLoginUser;

    public MockLoginFilter(AuthenticationToken mockedLoginUser) {
        this.mockedLoginUser = mockedLoginUser;
    }

    protected void mockLogin() {
        if (AuthUtils.getSessionUser() == null && this.mockedLoginUser != null) {
            Subject subject = SecurityUtils.getSubject();
            try {
                Object principle = AuthUtils.login(mockedLoginUser);
                logger.info("模拟登录成功: " + principle);
            } catch (Exception e) {
                logger.error("模拟登录失败", e);
            }
        }
    }
}
