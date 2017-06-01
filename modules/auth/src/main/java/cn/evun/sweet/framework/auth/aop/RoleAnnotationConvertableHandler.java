package cn.evun.sweet.framework.auth.aop;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.auth.AuthUtils;
import cn.evun.sweet.framework.auth.converter.MultiPurposeAuthorizingObjectConverter;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.authz.aop.RoleAnnotationHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.annotation.Annotation;
import java.util.Arrays;

public class RoleAnnotationConvertableHandler extends RoleAnnotationHandler {
    private static final Logger logger = LoggerFactory.getLogger(RoleAnnotationConvertableHandler.class);

    protected MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter;

    public RoleAnnotationConvertableHandler(MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter) {
        this.multiPurposeAuthorizingObjectConverter = multiPurposeAuthorizingObjectConverter;
    }

    @Override
    public void assertAuthorized(Annotation a) throws AuthorizationException {
        if (!(a instanceof RequiresRoles)) return;

        RequiresRoles rrAnnotation = (RequiresRoles) a;
        String[] roles = rrAnnotation.value();

        //这里使用转换接口转换, 以支持多租户的情况
        roles = multiPurposeAuthorizingObjectConverter.convertRolesWhenAnnotationDriven(AuthUtils.getSessionUser(), roles);

        if (roles.length == 1) {
            getSubject().checkRole(roles[0]);
            return;
        }
        if (Logical.AND.equals(rrAnnotation.logical())) {
            getSubject().checkRoles(Arrays.asList(roles));
            return;
        }
        if (Logical.OR.equals(rrAnnotation.logical())) {
            // Avoid processing exceptions unnecessarily - "delay" throwing the exception by calling hasRole first
            boolean hasAtLeastOneRole = false;
            for (String role : roles) if (getSubject().hasRole(role)) hasAtLeastOneRole = true;
            // Cause the exception if none of the role match, note that the exception message will be a bit misleading
            if (!hasAtLeastOneRole) getSubject().checkRole(roles[0]);
        }
    }
}
