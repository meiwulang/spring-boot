package cn.evun.sweet.framework.auth.aop;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.auth.AuthUtils;
import cn.evun.sweet.framework.auth.converter.MultiPurposeAuthorizingObjectConverter;
import org.apache.shiro.authz.aop.PermissionAnnotationHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.annotation.Annotation;

public class PermissionAnnotationConvertableHandler extends PermissionAnnotationHandler {
    private static final Logger logger = LoggerFactory.getLogger(PermissionAnnotationConvertableHandler.class);

    protected MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter;

    public PermissionAnnotationConvertableHandler(MultiPurposeAuthorizingObjectConverter multiPurposeAuthorizingObjectConverter) {
        this.multiPurposeAuthorizingObjectConverter = multiPurposeAuthorizingObjectConverter;
    }

    @Override
    protected String[] getAnnotationValue(Annotation a) {
        String[] originalPermissions = super.getAnnotationValue(a);
        return this.multiPurposeAuthorizingObjectConverter.convertPermissionsWhenAnnotationDriven(AuthUtils.getSessionUser(), originalPermissions);
    }
}
