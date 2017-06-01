package cn.evun.sweet.framework.core.cloud.common.model.message;

/**
 * Created by zlbbq on 2016/12/8.
 */


import cn.evun.sweet.framework.core.cloud.CloudApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ApplicationLogMessage {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationLogMessage.class);

    protected String appName;

    protected String appId;

    protected String appVersion;

    protected long logTime;

    protected ApplicationLogMessage(CloudApplication cloudApplication) {
        this.appName = cloudApplication.getAppName();
        this.appId = cloudApplication.getAppId();
        this.appVersion = cloudApplication.getAppVersion();
        this.logTime = System.currentTimeMillis();
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

    public long getLogTime() {
        return logTime;
    }

    public void setLogTime(long logTime) {
        this.logTime = logTime;
    }
}
