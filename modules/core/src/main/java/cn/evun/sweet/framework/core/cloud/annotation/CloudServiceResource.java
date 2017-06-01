package cn.evun.sweet.framework.core.cloud.annotation;

import java.lang.annotation.*;

/**
 * Created by zlbbq on 2016/12/5.
 */

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
public @interface CloudServiceResource {

    Scope scope() default Scope.Group;

    enum Scope {
        Global/** 云共享资源 */, Group/** 组内私有资源 */
    }
}
