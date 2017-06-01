package cn.evun.sweet.framework.auth;

import cn.evun.sweet.framework.auth.converter.MultiPurposeAuthorizingObjectConverter;
import cn.evun.sweet.framework.auth.filter.PathMatchingPermissionFilter;
import cn.evun.sweet.framework.auth.filter.SweetStandardResourceFilter;
import cn.evun.sweet.framework.common.web.RequestUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.AnonymousFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Filter;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by zlbbq on 2017/3/10.
 */
public interface ShiroFilterConfigurer {

    void config(
            ShiroFilterFactoryBean shiroFilterFactoryBean,
            SecurityManager securityManager,
            SweetAuthorizingRealm sweetAuthorizingRealm,
            ShiroAuthService shiroAuthService,
            WorkMode workMode,
            MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter,
            AuthenticationToken mockedUser);

    /**
     * Shiro标准配置类, 请实现类或子类按标准方式来, 以后再优化这块代码. 现不搞抽象了
     */
    class Default implements ShiroFilterConfigurer {

        private static final Logger logger = LoggerFactory.getLogger(Default.class);

        private static final Default instance = new Default();

        public static Default getInstance() {
            return instance;
        }

        protected boolean logPerformance = true;

        protected Default() {
        }

        @Override
        public void config(
                ShiroFilterFactoryBean shiroFilterFactoryBean,
                SecurityManager securityManager,
                SweetAuthorizingRealm sweetAuthorizingRealm,
                ShiroAuthService shiroAuthService,
                WorkMode workMode,
                MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter,
                AuthenticationToken mockedLoginUser) {
            shiroFilterFactoryBean.setSecurityManager(securityManager);
            shiroAuthService.setWorkMode(workMode);
            Map<String, Filter> filterMap = new HashMap<>();
            //自定义FilterMap
            Map<String, Filter> extendFilters = shiroAuthService.getExtendFilters();
            if (extendFilters != null) {
                filterMap.putAll(extendFilters);
            }
            //框架白名单
            filterMap.put("sweet_intranet_anon", new AnonymousFilter() {
                @Override
                protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) {
                    if (RequestUtils.isRequestFromIntranet((HttpServletRequest) request)) {
                        return super.onPreHandle(request, response, mappedValue);
                    } else {
                        HttpServletResponse servletResponse = (HttpServletResponse) response;
                        try {
                            servletResponse.setContentType("text/html;charset=utf8");
                            servletResponse.getWriter().println("<h1>框架资源只能从内网访问</h1>");
                        } catch (IOException e) {
                            ; //handled
                        }
                        return false;
                    }
                }
            });
            //URL模式过滤器
            PathMatchingPermissionFilter pathMatchingPermissionFilter = new PathMatchingPermissionFilter(securityManager, shiroAuthService, sweetAuthorizingRealm, multiPurposeAuthorizingObjectConverter, mockedLoginUser);
            pathMatchingPermissionFilter.setLogPerformance(this.isLogPerformance());
            filterMap.put("sweet_url_mode", pathMatchingPermissionFilter);

            //Sweet框架标准APIResponse Filter
            filterMap.put(ShiroAuthService.SWEET_STANDARD_RESOURCE_FILTER_NAME, new SweetStandardResourceFilter());

            shiroFilterFactoryBean.setFilters(filterMap);
            Map<String, String> filterChainDefinition = new LinkedHashMap<>();
            //框架白名单
            String[] frameworkResources = {
                    "/swagger**",
                    "/configuration/**",
                    "/druid/**",
                    "/v2/api-docs/**",
                    "/webjars/**",
                    "/sweet-framework/**",
                    "/cds/**",
                    "/error"
            };
            for (String s : frameworkResources) {
                filterChainDefinition.put(s, "sweet_intranet_anon");
                logFilterInfo(s, "sweet_intranet_anon");
            }
            //静态资源白名单
            String[] staticResources = {
                    "/favicon.ico",
                    "/css/**",
                    "/js/**",
                    "/image/**",
                    "/resources/**",
                    "/static/**"
            };
            for (String s : staticResources) {
                filterChainDefinition.put(s, "anon");
                logFilterInfo(s, "anon");
            }
            //应用白名单
            if (shiroAuthService.getWhiteListResources() != null) {
                for (String s : shiroAuthService.getWhiteListResources()) {
                    filterChainDefinition.put(s, "anon");
                    logFilterInfo(s, "anon");
                }
            }

            if (shiroAuthService.getPatternMatchedFilters() != null) {
                LinkedHashMap<String, String> map = shiroAuthService.getPatternMatchedFilters();
                Set<String> patterns = map.keySet();
                for (String pattern : patterns) {
                    String filterName = map.get(pattern);
                    filterChainDefinition.put(pattern, filterName);
                    logFilterInfo(pattern, filterName);
                }
            }

            //URL模式时, 永远不会跑到最后定义的/**拦截, 这里不是BUG哦, URL模式的统一拦截由Sweet框架实现
            if (workMode.isURLMode() || workMode.isMixedMode()) {
                filterChainDefinition.put("/**", "sweet_url_mode");
                logFilterInfo("/**", "sweet_url_mode");
            } else {
                filterChainDefinition.put("/**", shiroAuthService.getDefaultResourceFilterName());
                logFilterInfo("/**", shiroAuthService.getDefaultResourceFilterName());
            }
            shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinition);
            shiroFilterFactoryBean.setLoginUrl(shiroAuthService.getLoginUrl());

            //模拟登录时, 输出信息
            if (mockedLoginUser != null) {
                if (workMode.isAnnotationMode()) {
                    logger.warn("【WARNING】Annotation权限模式下, 不支持模拟登录");
                } else {
                    logger.warn("\n********************************************************\n模拟了用户【" + mockedLoginUser.toString() + "】登录\n********************************************************");
                }
            }
        }

        private void logFilterInfo(String pattern, String filterName) {
            logger.info("资源【" + pattern + "】使用【" + filterName + "】过滤规则过滤, 资源匹配规则【Ant】");
        }

        public boolean isLogPerformance() {
            return logPerformance;
        }

        public void setLogPerformance(boolean logPerformance) {
            this.logPerformance = logPerformance;
        }
    }
}
