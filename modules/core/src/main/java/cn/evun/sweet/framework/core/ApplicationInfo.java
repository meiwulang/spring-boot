package cn.evun.sweet.framework.core;
/**
 * Created by zlbbq on 16/5/4.
 */

import cn.evun.sweet.framework.core.cfg.ConfigMetadata;
import cn.evun.sweet.framework.core.monitor.ApplicationPerformanceMetrics;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.text.MessageFormat;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

public class ApplicationInfo implements ApplicationDescriptor {
    protected String appId;

    protected String appName;

    protected String appVersion;

    protected String appHost;

    protected int appPort;

    protected String appContextPath = "/";

    protected String sweetFrameworkVersion;

    @JsonIgnore
    protected static ApplicationInfo instance = null;

    @JsonIgnore
    protected ApplicationPerformanceMetrics applicationPerformanceMetrics;

    @JsonIgnore
    protected Properties runtimeConfiguration;

    @JsonIgnore
    private Map<String/** 配置组名 */, ConfigMetadata /**配置项*/> configMetadataMap;

    public static ApplicationInfo getInstance() {
        if (instance == null) {
            instance = new ApplicationInfo();
            return instance;
        }
        return instance;
    }

    protected ApplicationInfo() {
        this.initialize();
    }

    protected ApplicationInfo(String host, String appName, String appId, String appVersion) {
        this.appHost = host;
        this.appName = appName;
        this.appId = appId;
        this.appVersion = appVersion;
        this.initialize();
    }

    protected void initialize() {
        applicationPerformanceMetrics = new ApplicationPerformanceMetrics();
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getAppVersion() {
        return appVersion;
    }

    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }

    public String getAppHost() {
        return appHost;
    }

    public void setAppHost(String appHost) {
        this.appHost = appHost;
    }

    public int getAppPort() {
        return appPort;
    }

    public void setAppPort(int appPort) {
        this.appPort = appPort;
    }

    public Properties getRuntimeConfiguration() {
        return runtimeConfiguration;
    }

    public void setRuntimeConfiguration(Properties runtimeConfiguration) {
        this.runtimeConfiguration = runtimeConfiguration;
    }

    public String toString() {
        String pattern = "[ host={0}, port={1}, name={2}, id={3}, version={4}, sweet-version={5}, context-path={6} ]";
        String data[] = {this.appHost, String.valueOf(this.appPort), this.appName, this.appId, this.appVersion, this.sweetFrameworkVersion, this.appContextPath};
        return MessageFormat.format(pattern, data);
    }

    public String toString(boolean simple) {
        if (!simple) {
            return toString();
        }
        String pattern = "[ host={0}, port={1}, name={2}, id={3}, version={4}, sweet-version={5}, context-path={6} ]";
        String data[] = {this.appHost, String.valueOf(this.appPort), this.appName, this.appId, this.appVersion, this.sweetFrameworkVersion, this.appContextPath};
        return MessageFormat.format(pattern, data);
    }

    public Map<String, ConfigMetadata> getConfigMetadataMap() {
        return configMetadataMap;
    }

    public void setConfigMetadataMap(Map<String, ConfigMetadata> configMetadataMap) {
        this.configMetadataMap = configMetadataMap;
    }

    public Properties exportDefaultConfigAsProperties() {
        Set<String> groupNames = configMetadataMap.keySet();
        Properties config = new Properties();
        for (String groupName : groupNames) {
            Properties groupConfig = configMetadataMap.get(groupName).exportDefaults();
            Set<Object> groupConfigItems = groupConfig.keySet();
            for (Object itemKey : groupConfigItems) {
                if(System.getProperty(itemKey.toString()) == null) {
                    config.put(itemKey, groupConfig.get(itemKey));
                }
            }
        }
        return config;
    }

    public ApplicationPerformanceMetrics getApplicationPerformanceMetrics() {
        return applicationPerformanceMetrics;
    }

    public String getSweetFrameworkVersion() {
        return sweetFrameworkVersion;
    }

    public void setSweetFrameworkVersion(String sweetFrameworkVersion) {
        this.sweetFrameworkVersion = sweetFrameworkVersion;
    }

    public boolean equals(Object o) {
        if (o instanceof ApplicationInfo) {
            ApplicationInfo ai = (ApplicationInfo) o;
            return ai.getAppName().equals(this.getAppName()) && ai.getAppId().equals(this.getAppId());
        }
        return false;
    }

    public int hashCode() {
        return this.appName.hashCode() + this.appId.hashCode();
    }

    public String getAppContextPath() {
        return appContextPath;
    }

    public void setAppContextPath(String appContextPath) {
        this.appContextPath = appContextPath;
    }

    @JsonIgnore
    public String getIdentifier() {
        return getIdentifier(this.getAppName(), this.getAppId());
    }

    public static String getIdentifier(String appName, String appId) {
        return appName + "-" + appId;
    }

}
