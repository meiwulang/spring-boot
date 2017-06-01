package cn.evun.sweet.framework.core.mvc.freemarker;

import java.util.Map;

/**
 * Created by zlbbq on 2017/3/9.
 */


public interface FreemarkerDirectiveConfigurer {
    Map<String, Object> getSupportedDirectives();
}
