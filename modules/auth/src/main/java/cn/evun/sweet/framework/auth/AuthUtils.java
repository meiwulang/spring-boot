package cn.evun.sweet.framework.auth;

/**
 * Created by zlbbq on 2017/3/10.
 */


import cn.evun.sweet.framework.core.Constants;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

public class AuthUtils {
    private static final Logger logger = LoggerFactory.getLogger(AuthUtils.class);

    private AuthUtils() {
    }

    /**
     * 获取当前会话的登录用户信息
     */
    public static Object getSessionUser() {
        return SecurityUtils.getSubject().getSession().getAttribute(Constants.Http.SESSION_USER_KEY);
    }

    /**
     * 设置当前的登录用户信息到会话
     */
    public static void setSessionUser(Object userPrinciple) {
        Assert.notNull(userPrinciple, "User principle can not be null");
        SecurityUtils.getSubject().getSession().setAttribute(Constants.Http.SESSION_USER_KEY, userPrinciple);
    }

    /**
     * 使用用户名和密码登录, 它会调用ShiroAuthService#doLogin(userId, password)方法
     * 本方法要求调用端强制检查异常
     */
    public static Object login(String userId, String password) throws Exception {
        UsernamePasswordToken loginToken = new UsernamePasswordToken(userId, password);
        Subject subject = SecurityUtils.getSubject();
        subject.login(loginToken);
        Object principle = subject.getPrincipal();
        setSessionUser(principle);
        return principle;
    }

    /***
     * 使用复杂凭证登录, 它会调用ShiroAuthService#doLogin(loginToken)方法
     * 本方法要求调用端强制检查异常
     */
    public static Object login(AuthenticationToken loginToken) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        subject.login(loginToken);
        Object principle = subject.getPrincipal();
        setSessionUser(principle);
        return principle;
    }

    /**
     * 登出, Session会被一并清除
     */
    public static void logout() {
        SecurityUtils.getSubject().logout();
    }

    /**
     * 获取当前Session的ID
     */
    public static String getSessionId() {
        Object o = SecurityUtils.getSubject().getSession().getId();
        if(o != null) {
            return o.toString();
        }
        return null;
    }
}
