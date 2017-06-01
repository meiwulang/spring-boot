package cn.evun.sweet.framework.auth;

import org.apache.shiro.authc.AuthenticationToken;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

/**
 * <p>Title: AuthService</p>
 * <p>Date: 17/3/7 </p>
 * <p>Description: </p>
 *
 * @author xinhe.sun
 */
public interface ShiroAuthService<T> {

    //this filter name is supplied by shiro itself
    String DEFAULT_RESOURCE_FILTER_NAME = "authc";

    //Sweet前后端分离标准过滤器名称, 它实现了未登录时响应JSON输出而不是302重定向
    String SWEET_STANDARD_RESOURCE_FILTER_NAME = "sweet_standard";

    /**
     * 实现为获取用户的角色清单
     */
    Set<String> getRoles(T userId);

    /**
     * 实现为获取用户的权限资源清单, URL模式时, 返回URL匹配字串（请实现者注意自己实现最大化正向匹配, 框架仅会按照返回的集合顺序校验）
     * ANNOTATION模式时, 返回权限资源表
     */
    Set<String> getPermissions(T userId);

    /**
     * 如果是通过用户名和密码登录, 可以实现此方法
     * 实现为校验用户的身份信息, Object类型由应用自行定义, 校验失败应该抛出BusinessException,
     * 一旦成功返回, 此值将作为存储在Session的用户对象, KEY参考cn.evun.sweet.framework.core.Constants.Http.SESSION_USER_KEY
     * 参考: SweetAuthorizingRealm
     */
    T doLogin(String userId, String password);

    /**
     * 用于复杂场景的登录凭证登录
     * 实现为校验用户的身份信息, Object类型由应用自行定义, 校验失败应该抛出BusinessException,
     * 一旦成功返回, 此值将作为存储在Session的用户对象, KEY参考cn.evun.sweet.framework.core.Constants.Http.SESSION_USER_KEY
     * 参考: SweetAuthorizingRealm
     */
    T doLogin(AuthenticationToken loginToken);

    /**
     * 实现为返回登录首页地址, Shiro在未取到用户登录信息又需要授权的时候会302重定向到此地址
     */
    String getLoginUrl();

    /**
     * 实现为获取系统中的白名单资源URI, 支持Ant规则匹配
     */
    String[] getWhiteListResources();

    /**
     * 实现为默认资源(/**)的处理Filter, 当返回ShiroAuthService.DEFAULT_RESOURCE_FILTER_NAME(authc)时, 使用Shiro默认的注解验证规则
     * 如果不使用注解验证, 通常应返回一个在ShiroAuthService#getExtendFilters()中返回的自定义Filter
     */
    String getDefaultResourceFilterName();

    /**
     * 实现为返回自定义的Filter名称, 这些Filter, 请不要加入到SpringContext中管理, 它的生命周期应由Shiro管理, 并统一由Shiro的Filter处理
     */
    Map<String/**filter name*/, Filter/**filter instance*/> getExtendFilters();

    /**
     * 实现为返回自定义的pattern匹配和filter处理,
     * 其中: filter name可以为getExtendFilters()返回的filter name
     */
    LinkedHashMap<String/** pattern(Ant rule) */, String/** filter name */> getPatternMatchedFilters();

    /**
     * 设置工作模式
     */
    void setWorkMode(WorkMode workMode);
}
