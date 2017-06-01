package cn.evun.sweet.framework.core.cloud.resource;

/**
 * Created by zlbbq on 2016/12/5.
 */


import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.cloud.CloudApplication;
import cn.evun.sweet.framework.core.cloud.CloudServiceResourceFilter;
import cn.evun.sweet.framework.core.cloud.annotation.CloudServiceResource;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.*;

public class CloudResourceScanner {
    private static final Logger logger = LoggerFactory.getLogger(CloudResourceScanner.class);

    private CloudServiceResourceFilter cloudServiceResourceFilter;

    private CloudApplication cloudApplication = CloudApplication.getInstance();

    public CloudResourceScanner() {
    }

    public List<CloudResource> scan(ApplicationContext applicationContext) {
        this.initializeCloudResourceFilter(applicationContext);
        return this.doScan(applicationContext.getBean(RequestMappingHandlerMapping.class));
    }

    protected void initializeCloudResourceFilter(ApplicationContext applicationContext) {
        //可由外部定义CloudServiceFilter实现对云服务过滤的自定义
        //默认云服务定义参考: CloudServiceRegistry.DefaultCloudServiceFilter
        CloudServiceResourceFilter cloudServiceFilter = null;
        try {
            cloudServiceFilter = applicationContext.getBean(CloudServiceResourceFilter.class);
        } catch (NoSuchBeanDefinitionException e) {
            logger.info(e.getMessage() + ", 使用默认CloudServiceFilter");
        }
        cloudServiceFilter = cloudServiceFilter == null ? new CloudResourceScanner.DefaultCloudServiceFilter() : cloudServiceFilter;
        this.setCloudServiceResourceFilter(cloudServiceFilter);
    }

    protected List<CloudResource> doScan(RequestMappingHandlerMapping handlerMapping) {
        List<CloudResource> cloudResources = new ArrayList<>();
        Map<RequestMappingInfo, HandlerMethod> map = handlerMapping.getHandlerMethods();
        for (RequestMappingInfo info : map.keySet()) {
            String uriPattern = info.getPatternsCondition().toString();
            HandlerMethod handlerMethod = map.get(info);
            CloudResource.Type type = getResourceType(handlerMethod);
            if (this.cloudServiceResourceFilter.isCloudServiceResource(cloudApplication, info, handlerMethod)) {
                CloudServiceResource cloudServiceResource = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), CloudServiceResource.class);
                Set<RequestMethod> requestMethods = info.getMethodsCondition().getMethods();
                if (requestMethods.size() == 0) {
                    //未定义HTTP请求方法时默认使用GET请求
                    requestMethods = new TreeSet<>();
                    requestMethods.add(RequestMethod.GET);
                }
                String description = getRequestMappingHandlerSwaggerDescription(handlerMethod);
                for (RequestMethod m : requestMethods) {
                    CloudResource cloudResource = new CloudResource(type, cloudServiceResource.scope().name(), description, uriPattern, m.toString());
                    cloudResources.add(cloudResource);
                    logger.info("正在向Sweet云[" + this.cloudApplication.getCloudJointUrl() + "]注册服务: " + cloudResource.toString());
                }
            }
        }
        return cloudResources;
    }

    private CloudResource.Type getResourceType(HandlerMethod method) {
        if (AnnotationUtils.isAnnotationDeclaredLocally(Controller.class, method.getBeanType())) {
            return CloudResource.Type.Controller;
        }

        if (AnnotationUtils.isAnnotationDeclaredLocally(RestController.class, method.getBeanType())) {
            return CloudResource.Type.RestController;
        }

        return CloudResource.Type.Unknown;
    }

    private String getRequestMappingHandlerSwaggerDescription(HandlerMethod method) {
        String description = method.getBeanType().getSimpleName() + "#" + method.getMethod().getName();
        ApiOperation swaggerOperation = AnnotationUtils.findAnnotation(method.getMethod(), ApiOperation.class);
        if (swaggerOperation != null) {
            description = swaggerOperation.nickname();
            if (!StringUtils.hasText(description)) {
                description = swaggerOperation.value();
            }
        }
        return description;
    }

    public CloudServiceResourceFilter getCloudServiceResourceFilter() {
        return cloudServiceResourceFilter;
    }

    public void setCloudServiceResourceFilter(CloudServiceResourceFilter cloudServiceResourceFilter) {
        this.cloudServiceResourceFilter = cloudServiceResourceFilter;
    }

    private static class DefaultCloudServiceFilter implements CloudServiceResourceFilter {
        private static final String[] INCLUDE_RESOURCES = {
        };

        private static final Class[] INCLUDE_CONTROLLERS = {
        };

        private boolean isTarget(CloudApplication cloudApplication, String uriPattern, Class handlerClass) {
            for (Class clazz : INCLUDE_CONTROLLERS) {
                if (clazz.equals(handlerClass)) {
                    return true;
                }
            }

            for (String uri : INCLUDE_RESOURCES) {
                if (uriPattern.startsWith(uri)) {
                    return true;
                }
            }

            CloudServiceResource cloudService = AnnotationUtils.findAnnotation(handlerClass, CloudServiceResource.class);
            if (cloudService == null) {
                return false;
            }

            return true;
        }

        @Override
        public boolean isCloudServiceResource(CloudApplication cloudApplication, RequestMappingInfo requestMappingInfo, HandlerMethod handlerMethod) {
            return isTarget(cloudApplication, requestMappingInfo.getPatternsCondition().toString(), handlerMethod.getBeanType());
        }
    }
}
