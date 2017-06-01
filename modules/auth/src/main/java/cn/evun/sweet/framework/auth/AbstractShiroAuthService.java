package cn.evun.sweet.framework.auth;

/**
 * Created by zlbbq on 2017/3/16.
 */


import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

public abstract class AbstractShiroAuthService<T> implements ShiroAuthService<T> {
    private static final Logger logger = LoggerFactory.getLogger(AbstractShiroAuthService.class);

    protected WorkMode workMode;

    @Override
    public String[] getWhiteListResources() {
        return new String[0];
    }

    @Override
    public String getDefaultResourceFilterName() {
        return SWEET_STANDARD_RESOURCE_FILTER_NAME;
    }

    @Override
    public Map<String, Filter> getExtendFilters() {
        return null;
    }

    @Override
    public LinkedHashMap<String, String> getPatternMatchedFilters() {
        return null;
    }

    @Override
    public void setWorkMode(WorkMode workMode) {
        this.workMode = workMode;
    }

    public WorkMode getWorkMode() {
        return this.workMode;
    }

    @Override
    public T doLogin(AuthenticationToken token) {
        throw new AuthenticationException("功能未实现. 使用复杂凭证登录时, 请在子类实现此方法");
    }

    public static class Default extends AbstractShiroAuthService<Object> {

        private static final Default instance = new Default();

        public static Default getInstance() {
            return instance;
        }

        private Default() {
        }

        @Override
        public Set<String> getRoles(Object userId) {
            throw new AuthorizationException("功能未实现, 请实现ShiroAuthService并注入到Spring容器");
        }

        @Override
        public Set<String> getPermissions(Object userId) {
            throw new AuthorizationException("功能未实现, 请实现ShiroAuthService并注入到Spring容器");
        }

        @Override
        public Object doLogin(String userId, String password) {
            throw new AuthenticationException("功能未实现, 请实现ShiroAuthService并注入到Spring容器");
        }

        @Override
        public Object doLogin(AuthenticationToken token) {
            throw new AuthenticationException("功能未实现, 请实现ShiroAuthService并注入到Spring容器");
        }

        @Override
        public String getLoginUrl() {
            return "/login";
        }
    }
}
