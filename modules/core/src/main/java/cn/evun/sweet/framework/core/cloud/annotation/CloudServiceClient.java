package cn.evun.sweet.framework.core.cloud.annotation;

import java.lang.annotation.*;

/**
 * Created by zlbbq on 2016/11/28.
 */

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
public @interface CloudServiceClient {
    String value();

    String version() default "0.0.0";
}
