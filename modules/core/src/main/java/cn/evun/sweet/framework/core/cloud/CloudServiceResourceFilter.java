package cn.evun.sweet.framework.core.cloud;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;

/**
 * Created by zlbbq on 2016/11/29.
 */
public interface CloudServiceResourceFilter {
    boolean isCloudServiceResource(CloudApplication cloudApplication, RequestMappingInfo requestMappingInfo, HandlerMethod handlerMethod);
}
