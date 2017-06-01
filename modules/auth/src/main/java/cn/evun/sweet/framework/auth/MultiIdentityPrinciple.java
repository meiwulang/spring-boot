package cn.evun.sweet.framework.auth;

/**
 * Created by zlbbq on 2017/3/16.
 */

import java.io.Serializable;

/**
 * 这个接口用来表达会话中存储的对象具有多重身份, 可以用来表述多租户的情况, 返回一个租户ID
 * */
public interface MultiIdentityPrinciple extends Serializable {
    String getCurrentIdentity();
}
