package cn.evun.sweet.framework.auth.converter;

/**
 * Created by zlbbq on 2017/3/16.
 */


import cn.evun.sweet.framework.auth.MultiIdentityPrinciple;
import cn.evun.sweet.framework.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MultiIdentityPrincipleAuthorizingObjectConverter implements MultiPurposeAuthorizingObjectConverter {
    private static final Logger logger = LoggerFactory.getLogger(MultiIdentityPrincipleAuthorizingObjectConverter.class);

    @Override
    public boolean isURLPermission(Object principle, String permission) {
        if (!StringUtils.hasText(permission)) {
            return false;
        }

        if (principle instanceof MultiIdentityPrinciple) {
            String identity = ((MultiIdentityPrinciple) principle).getCurrentIdentity();
            return permission.startsWith(identity + ":/");
        }

        return permission.startsWith("/");
    }

    @Override
    public String convertURIWhenPathMatching(Object principle, String uri) {
        if (principle instanceof MultiIdentityPrinciple) {
            return convertAuthorizingObject(((MultiIdentityPrinciple) principle).getCurrentIdentity(), uri);
        }
        return uri;
    }

    @Override
    public String[] convertPermissionsWhenAnnotationDriven(Object principle, String[] requiredPermissionsInAnnotation) {
        if (requiredPermissionsInAnnotation == null) {
            return null;
        }

        if (principle instanceof MultiIdentityPrinciple) {
            String identity = ((MultiIdentityPrinciple) principle).getCurrentIdentity();
            String ret[] = new String[requiredPermissionsInAnnotation.length];
            int idx = 0;
            for (String el : requiredPermissionsInAnnotation) {
                if (StringUtils.hasText(el)) {
                    ret[idx++] = doConvert(identity, el);
                } else {
                    ret[idx++] = "";
                }
            }
            return ret;
        }

        return requiredPermissionsInAnnotation;
    }

    @Override
    public String[] convertRolesWhenAnnotationDriven(Object principle, String[] requiredRolesInAnnotation) {
        if (requiredRolesInAnnotation == null) {
            return null;
        }

        if (principle instanceof MultiIdentityPrinciple) {
            String identity = ((MultiIdentityPrinciple) principle).getCurrentIdentity();
            String ret[] = new String[requiredRolesInAnnotation.length];
            int idx = 0;
            for (String authorizingObject : requiredRolesInAnnotation) {
                if (StringUtils.hasText(authorizingObject)) {
                    ret[idx++] = doConvert(identity, authorizingObject);
                } else {
                    ret[idx++] = "";
                }
            }
            return ret;
        }

        return requiredRolesInAnnotation;
    }

    protected String doConvert(String identity, String authorizingObject) {
        return convertAuthorizingObject(identity, authorizingObject);
    }

    public static String convertAuthorizingObject(String identity, String authorizingObject) {
        return identity + ":" + authorizingObject;
    }
}
