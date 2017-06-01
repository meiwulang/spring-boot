package cn.evun.sweet.framework.auth.aop;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.auth.converter.MultiPurposeAuthorizingObjectConverter;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuthorizationAttributeSourceConvertableAdvisor extends AuthorizationAttributeSourceAdvisor {
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationAttributeSourceConvertableAdvisor.class);


    protected MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter;

    public AuthorizationAttributeSourceConvertableAdvisor(MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter) {
        this.multiPurposeAuthorizingObjectConverter = multiPurposeAuthorizingObjectConverter;
        this.setAdvice(new AnnotationConvertableAuthorizingMethodInterceptor(multiPurposeAuthorizingObjectConverter));
    }
}
