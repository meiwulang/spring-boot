package cn.evun.sweet.framework.core.cloud.common.model;

/**
 * Created by zlbbq on 2016/12/8.
 */


import cn.evun.sweet.framework.core.cloud.CloudApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class JointRequest {
    private static final Logger logger = LoggerFactory.getLogger(JointRequest.class);

    private String appName;

    private String appId;

    private String appVersion;

    private String ticket;

    public JointRequest(CloudApplication cloudApplication) {
        this.appName = cloudApplication.getAppName();
        this.appId = cloudApplication.getAppId();
        this.appVersion = cloudApplication.getAppVersion();
        this.ticket = cloudApplication.getCloudTicket();
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppVersion() {
        return appVersion;
    }

    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }

    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }

    public MultiValueMap<String, String> toRestTemplateParameters() {
        MultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.set("application", this.getAppName());
        requestParams.set("index", this.getAppId());
        requestParams.set("version", this.getAppVersion());
        requestParams.set("ticket", this.getTicket());
        return requestParams;
    }
}
