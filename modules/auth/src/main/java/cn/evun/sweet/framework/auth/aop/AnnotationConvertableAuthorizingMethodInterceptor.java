package cn.evun.sweet.framework.auth.aop;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.auth.converter.MultiPurposeAuthorizingObjectConverter;
import org.apache.shiro.authz.aop.AuthenticatedAnnotationMethodInterceptor;
import org.apache.shiro.authz.aop.GuestAnnotationMethodInterceptor;
import org.apache.shiro.authz.aop.UserAnnotationMethodInterceptor;
import org.apache.shiro.spring.aop.SpringAnnotationResolver;
import org.apache.shiro.spring.security.interceptor.AopAllianceAnnotationsAuthorizingMethodInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;

public class AnnotationConvertableAuthorizingMethodInterceptor extends AopAllianceAnnotationsAuthorizingMethodInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(AnnotationConvertableAuthorizingMethodInterceptor.class);

    public AnnotationConvertableAuthorizingMethodInterceptor(MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter) {
        ArrayList interceptors = new ArrayList(5);
        SpringAnnotationResolver resolver = new SpringAnnotationResolver();
        interceptors.add(new RoleAnnotationConvertableMethodInterceptor(resolver, multiPurposeAuthorizingObjectConverter));
        interceptors.add(new PermissionAnnotationConvertableMethodInterceptor(resolver, multiPurposeAuthorizingObjectConverter));
        interceptors.add(new AuthenticatedAnnotationMethodInterceptor(resolver));
        interceptors.add(new UserAnnotationMethodInterceptor(resolver));
        interceptors.add(new GuestAnnotationMethodInterceptor(resolver));
        this.setMethodInterceptors(interceptors);
    }

}
