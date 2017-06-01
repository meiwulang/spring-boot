package cn.evun.sweet.framework.auth;

import cn.evun.sweet.framework.common.util.Assert;
import cn.evun.sweet.framework.common.util.StringUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.authz.permission.RolePermissionResolver;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.CollectionUtils;

import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * <p>Title: SweetAuthorizingRealm</p>
 * <p>Date: 17/3/7 </p>
 * <p>Description: </p>
 *
 * @author xinhe.sun
 */
public class SweetAuthorizingRealm extends AuthorizingRealm {

    private ShiroAuthService shiroAuthService;

    public SweetAuthorizingRealm(ShiroAuthService shiroAuthService) {
        this.shiroAuthService = shiroAuthService;
    }

    /**
     * 授权
     *
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        Object objPrincipal = this.getAvailablePrincipal(principals);
        if (objPrincipal == null) {
            return null;
        }

        //两个扩展点，支持角色和权限, URL权限(以"/"开头)也认为是权限
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.setRoles(shiroAuthService.getRoles(objPrincipal));
        authorizationInfo.setStringPermissions(shiroAuthService.getPermissions(objPrincipal));
        return authorizationInfo;
    }

    /**
     * 认证
     *
     * @param loginToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken loginToken) throws AuthenticationException {
        Assert.notNull(loginToken, "loginToken can not be null");
        if (loginToken.getClass().equals(UsernamePasswordToken.class)) {
            //使用用户名和密码登录
            UsernamePasswordToken upToken = (UsernamePasswordToken) loginToken;
            String userName = upToken.getUsername();
            String password = String.copyValueOf(upToken.getPassword());

            Object obj = shiroAuthService.doLogin(userName, password);
            return new SimpleAuthenticationInfo(obj, password, this.getName());
        } else {
            //使用复杂凭证登录
            Object obj = shiroAuthService.doLogin(loginToken);
            return new SimpleAuthenticationInfo(obj, loginToken.getCredentials(), this.getName());
        }
    }

    public Set<String> getPermissions(PrincipalCollection principals) {
        AuthorizationInfo info = this.getAuthorizationInfo(principals);
        Set<String> permissions = new LinkedHashSet<>();
        Collection<Permission> perms = info.getObjectPermissions();
        if (!CollectionUtils.isEmpty(perms)) {
            for (Permission p : perms) {
                if (p != null) {
                    permissions.add(p.toString());
                }
            }
        }

        Collection<String> sPerms = info.getStringPermissions();
        if (!CollectionUtils.isEmpty(sPerms)) {
            for (String sp : sPerms) {
                if (StringUtils.hasText(sp)) {
                    permissions.add(sp);
                }
            }
        }

        perms = resolveRolePermissions(info.getRoles());
        if (!CollectionUtils.isEmpty(perms)) {
            for (Permission p : perms) {
                if (p != null) {
                    permissions.add(p.toString());
                }
            }
        }

        return Collections.unmodifiableSet(permissions);
    }

    private Collection<Permission> resolveRolePermissions(Collection<String> roleNames) {
        Collection<Permission> perms = Collections.emptySet();
        RolePermissionResolver resolver = getRolePermissionResolver();
        if (resolver != null && !CollectionUtils.isEmpty(roleNames)) {
            perms = new LinkedHashSet<>(roleNames.size());
            for (String roleName : roleNames) {
                Collection<Permission> resolved = resolver.resolvePermissionsInRole(roleName);
                if (!CollectionUtils.isEmpty(resolved)) {
                    perms.addAll(resolved);
                }
            }
        }
        return perms;
    }
}
