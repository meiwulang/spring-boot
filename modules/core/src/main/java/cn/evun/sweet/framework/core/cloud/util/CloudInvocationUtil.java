package cn.evun.sweet.framework.core.cloud.util;

/**
 * Created by zlbbq on 2017/3/28.
 */


import cn.evun.sweet.framework.core.ApplicationDescriptor;
import cn.evun.sweet.framework.core.cloud.CloudConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

public class CloudInvocationUtil {
    private static final Logger logger = LoggerFactory.getLogger(CloudInvocationUtil.class);

    private CloudInvocationUtil() {
    }

    /**
     * 返回请求来源应用名称
     * */
    public static String getInvocationFrom(HttpServletRequest request) {
        return request.getHeader(CloudConstants.HEADER_CLOUD_SERVICE_FROM);
    }

    public static ApplicationDescriptor getInvocationForm(HttpServletRequest request) {
        return new SimpleApplicationDescriptor(
                request.getHeader(CloudConstants.HEADER_CLOUD_SERVICE_FROM),
                request.getHeader(CloudConstants.HEADER_CLOUD_SERVICE_FROM_INDEX)
        );
    }

    private static class SimpleApplicationDescriptor implements ApplicationDescriptor {
        private String appName;

        private String appId;

        public SimpleApplicationDescriptor(String appName, String appId) {
            this.appName = appName;
            this.appId = appId;
        }

        @Override
        public String getAppId() {
            return this.appId;
        }

        @Override
        public String getAppName() {
            return this.appName;
        }
    }
}
