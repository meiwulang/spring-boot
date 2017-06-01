package cn.evun.sweet.framework.auth.aop;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.auth.converter.MultiPurposeAuthorizingObjectConverter;
import org.apache.shiro.aop.AnnotationResolver;
import org.apache.shiro.authz.aop.RoleAnnotationMethodInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RoleAnnotationConvertableMethodInterceptor extends RoleAnnotationMethodInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(RoleAnnotationConvertableMethodInterceptor.class);

    public RoleAnnotationConvertableMethodInterceptor(AnnotationResolver annotationResolver, MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter) {
        this.setResolver(annotationResolver);
        this.setHandler(new RoleAnnotationConvertableHandler(multiPurposeAuthorizingObjectConverter));
    }
}
