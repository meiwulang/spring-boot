package cn.evun.sweet.framework.auth.converter;

/**
 * Created by zlbbq on 2017/3/16.
 */

import cn.evun.sweet.framework.common.util.StringUtils;

/**
 * 类接口为了实现多租户, 多应用模式下的权限, 也许是对Shiro的Realm理解不够, 感觉它也应该能做.
 * <p>
 * 分布式应用环境下, 权限分离应由各应用的权限接入实现完成(参考: ShiroAuthService接口)
 */
public interface MultiPurposeAuthorizingObjectConverter {
    /**
     * 在执行URL过滤时, 转换uri, 以支持SaaS权限模式下的多租户, 多应用权限问题, 简单来说, 在SaaS模式下, 实现方式参考如下:
     * 1. 用户当前所属的租户信息保存在principle中(principle理解为会话中存储的用户信息)
     * 2. ShiroAuthService查询出用户所有租户的当前应用的角色和权限, 并通过前缀来标识, 如(${tenant}:${permissionCode}, ${tenant}:${roleCode})
     * 3. 在PathMatching时, 将uri(HttpServletRequest#getRequestURI())转换为${tenant}:${uri}, 这个${tenant}就是用户当前所属租户信息, 在principle中
     */
    String convertURIWhenPathMatching(Object principle, String uri);

    /**
     * 返回当前的这个permission是不是一个URI的permission
     */
    boolean isURLPermission(Object principle, String permission);

    /**
     * 在执行通过AOP实现的权限校验时, 转换写在Annotation上的权限码(@RequiresPermissions)与用户当前租户有关
     */
    String[] convertPermissionsWhenAnnotationDriven(Object principle, String[] requiredPermissionsInAnnotation);

    /**
     * 在执行通过AOP实现的权限校验时, 转换写在Annotation上的角色码(@RequiresRoles)与用户当前租户有关
     */
    String[] convertRolesWhenAnnotationDriven(Object principle, String[] requiredRolesInAnnotation);

    /**
     * 默认实现与多租户环境无关, 来什么返回什么
     */
    class Default implements MultiPurposeAuthorizingObjectConverter {
        private static final Default instance = new Default();

        public static Default getInstance() {
            return instance;
        }

        @Override
        public boolean isURLPermission(Object principle, String permission) {
            return StringUtils.hasText(permission) && permission.startsWith("/");
        }

        @Override
        public String convertURIWhenPathMatching(Object principle, String uri) {
            return uri;
        }

        @Override
        public String[] convertPermissionsWhenAnnotationDriven(Object principle, String[] requiredPermissionsInAnnotation) {
            return requiredPermissionsInAnnotation;
        }

        @Override
        public String[] convertRolesWhenAnnotationDriven(Object principle, String[] requiredRolesInAnnotation) {
            return requiredRolesInAnnotation;
        }
    }
}
