package cn.evun.sweet.framework.auth.configuration;

import cn.evun.sweet.framework.auth.*;
import cn.evun.sweet.framework.auth.aop.AuthorizationAttributeSourceConvertableAdvisor;
import cn.evun.sweet.framework.auth.converter.MultiIdentityPrincipleAuthorizingObjectConverter;
import cn.evun.sweet.framework.auth.converter.MultiPurposeAuthorizingObjectConverter;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import cn.evun.sweet.framework.core.mvc.error.chain.ChainedErrorHandler;
import cn.evun.sweet.framework.core.mvc.error.chain.TypeMatchedChainedErrorHandler;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.config.CacheConfiguration;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>Title: ShiroAutoConfiguration</p>
 * <p>Date: 17/3/7 </p>
 * <p>Description: </p>
 *
 * @author xinhe.sun
 */
@Configuration
public class ShiroAutoConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(ShiroAutoConfiguration.class);

    @Value("${sweet.framework.auth.mode:MIXED}")
    private String workMode;

    @Value("${sweet.framework.auth.path-matching.performance.log:true}")
    private boolean logPerformance;

    @Autowired(required = false)
    @Qualifier("mockedLoginUser")
    /**
     * 模拟登录的用户, 请业务系统配置spring profiles使用
     * */
    private UsernamePasswordToken mockedLoginUser;

    //应用可自定义authService
    @ConditionalOnMissingBean
    @Bean
    public ShiroAuthService shiroAuthService() {
        return AbstractShiroAuthService.Default.getInstance();
    }

    @Bean
    public SweetAuthorizingRealm realm(ShiroAuthService shiroAuthService) {
        return new SweetAuthorizingRealm(shiroAuthService);
    }

    //应用可自定义shiroCacheManager
    @ConditionalOnMissingBean
    @Bean
    public org.apache.shiro.cache.CacheManager shiroCacheManager() {
        EhCacheManager ehCacheManager = new EhCacheManager();
        net.sf.ehcache.config.Configuration configuration = new net.sf.ehcache.config.Configuration();
        CacheConfiguration cacheConfiguration = new CacheConfiguration();
        cacheConfiguration.setMaxEntriesLocalHeap(10000);
        cacheConfiguration.setEternal(false);
        cacheConfiguration.setTimeToIdleSeconds(3600);
        cacheConfiguration.setTimeToLiveSeconds(0);
        cacheConfiguration.setOverflowToDisk(false);
        cacheConfiguration.setStatistics(true);

        configuration.setDefaultCacheConfiguration(cacheConfiguration);
        CacheManager cacheManager = new CacheManager(configuration);
        ehCacheManager.setCacheManager(cacheManager);
        return ehCacheManager;
    }

    @Bean
    public DefaultWebSecurityManager securityManager(SweetAuthorizingRealm realm, org.apache.shiro.cache.CacheManager shiroCacheManager) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(realm);
        securityManager.setCacheManager(shiroCacheManager);
        return securityManager;
    }

    /**
     * Shiro默认的AOP实现已经被改掉了, 原因是为了支持用户多租户的场景. by zlbbq, 2017-03-18
     * */
//    @Bean
//    @ConditionalOnExpression("'ANNOTATION'.equalsIgnoreCase('${sweet.framework.auth.mode:MIXED}') || 'MIXED'.equalsIgnoreCase('${sweet.framework.auth.mode:MIXED}')")
//    //ANNOTATION模式或MIXED工作模式
//    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(DefaultWebSecurityManager defaultWebSecurityManager) {
//        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
//        authorizationAttributeSourceAdvisor.setSecurityManager(defaultWebSecurityManager);
//        return authorizationAttributeSourceAdvisor;
//    }

    @Bean
    @ConditionalOnExpression("'ANNOTATION'.equalsIgnoreCase('${sweet.framework.auth.mode:MIXED}') || 'MIXED'.equalsIgnoreCase('${sweet.framework.auth.mode:MIXED}')")
    //ANNOTATION模式或MIXED工作模式
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(
            DefaultWebSecurityManager defaultWebSecurityManager,
            MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter
    ) {
        AuthorizationAttributeSourceConvertableAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceConvertableAdvisor(multiPurposeAuthorizingObjectConverter);
        authorizationAttributeSourceAdvisor.setSecurityManager(defaultWebSecurityManager);
        return authorizationAttributeSourceAdvisor;
    }

    //应用可自行配置shiro过滤器
    @Bean
    @ConditionalOnMissingBean(ShiroFilterConfigurer.class)
    public ShiroFilterConfigurer defaultShiroConfigurer() {
        ShiroFilterConfigurer.Default configurer = ShiroFilterConfigurer.Default.getInstance();
        configurer.setLogPerformance(logPerformance);
        return configurer;
    }

    @Bean
    public ShiroFilterFactoryBean shiroFilter(
            DefaultWebSecurityManager securityManager,
            ShiroAuthService shiroAuthService,
            ShiroFilterConfigurer shiroFilterConfigurer,
            SweetAuthorizingRealm sweetAuthorizingRealm,
            MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter
    ) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterConfigurer.config(shiroFilterFactoryBean,
                                     securityManager,
                                     sweetAuthorizingRealm,
                                     shiroAuthService,
                                     WorkMode.parse(workMode),
                                     multiPurposeAuthorizingObjectConverter,
                                     mockedLoginUser);
        return shiroFilterFactoryBean;
    }

    @Bean
    @ConditionalOnMissingBean
    public MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter() {
        return new MultiIdentityPrincipleAuthorizingObjectConverter();
    }

    @Bean
    @ConditionalOnMissingBean(name = "sweetAuthChainedErrorHandler")
    public ChainedErrorHandler sweetAuthChainedErrorHandler() {
        return new TypeMatchedChainedErrorHandler("sweetAuthChainedErrorHandler", new Class[]{UnauthorizedException.class}) {
            @Override
            public void handleError(Throwable t, HttpServletRequest request, HttpServletResponse response) {
                if (t.getClass().equals(UnauthorizedException.class)) {
                    UnauthorizedException e = (UnauthorizedException) t;
                    response.setStatus(HttpServletResponse.SC_OK);
                    APIResponse<String> apiResponse = new APIResponse<>(APIResponse.UNAUTHORIZED);
                    this.outputAPIResponse(apiResponse, request, response, HttpStatus.UNAUTHORIZED.value());
                }
            }
        };
    }
}
