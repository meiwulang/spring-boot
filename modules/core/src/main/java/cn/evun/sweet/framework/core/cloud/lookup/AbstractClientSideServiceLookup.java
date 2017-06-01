package cn.evun.sweet.framework.core.cloud.lookup;

/**
 * Created by zlbbq on 2016/12/12.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.cloud.CloudException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;

import java.util.List;

public abstract class AbstractClientSideServiceLookup implements CloudServiceLookup {
    private static final Logger logger = LoggerFactory.getLogger(AbstractClientSideServiceLookup.class);

    private static final String SERVICE_PATTERN = "http://${host}:${port}${contextPath}";

    protected LinkedMultiValueMap<String, ApplicationInfo> serviceBitmap;

    protected List<ApplicationInfo> applicationInfos;

    protected boolean nativeServiceFirstEnabled = false;

    protected ApplicationInfo applicationInfo;

    public AbstractClientSideServiceLookup() {
        this.initialize();
    }

    protected void initialize() {
        this.serviceBitmap = new LinkedMultiValueMap<>();
    }

    public synchronized void cleanRegisteredServices() {
        this.serviceBitmap.clear();
    }

    public synchronized void setServices(List<ApplicationInfo> applicationInfos) {
        this.serviceBitmap.clear();
        this.applicationInfos = applicationInfos;
        for (ApplicationInfo applicationInfo : applicationInfos) {
            this.serviceBitmap.add(applicationInfo.getAppName(), applicationInfo);
        }
    }

    public synchronized void registerService(ApplicationInfo applicationInfo) {
        this.serviceBitmap.add(applicationInfo.getAppName(), applicationInfo);
    }

    public synchronized void deregisterService(ApplicationInfo applicationInfo) {
        if (applicationInfo == null) {
            return;
        }
        List<ApplicationInfo> applicationInfoList = this.serviceBitmap.get(applicationInfo.getAppName());
        if (applicationInfoList != null) {
            for (ApplicationInfo appInfo : applicationInfoList) {
                if (appInfo.equals(applicationInfo)) {
                    applicationInfoList.remove(appInfo);
                    return;
                }
            }
        }
        logger.warn("要取消注册的云服务不存在: " + applicationInfo.toString(true));
    }

    @Override
    public String lookupService(String name, String version) {
        StringBuffer sb = new StringBuffer();
        if (logger.isInfoEnabled()) {
            sb.append("looking up service => " + name + "(" + version + ")\n");
        }
        List<ApplicationInfo> found = this.serviceBitmap.get(name);
        if (found == null || found.size() == 0) {
            throw new CloudException("未找到云服务 -> " + name + "(" + version + ")");
        }
        if (logger.isInfoEnabled()) {
            sb.append("found cloud services for " + name + "(" + version + ") ==> \n");
            for (ApplicationInfo app : found) {
                sb.append("==>").append(app.toString(true)).append("\n");
            }
            sb.append("picking up a matched service for " + name + "(" + version + ")\n");
        }
        ApplicationInfo matched = this.doPick(name, version, found);
        if (matched != null) {
            if (logger.isInfoEnabled()) {
                sb.append("An application picked : " + matched.toString(true));
                logger.info(sb.toString());
            }
            String serviceUrl = SERVICE_PATTERN.replaceAll("\\$\\{host\\}", matched.getAppHost())
                    .replaceAll("\\$\\{port\\}", String.valueOf(matched.getAppPort()))
                    .replaceAll("\\$\\{contextPath\\}", matched.getAppContextPath());
            return serviceUrl;
        } else {
            if (logger.isInfoEnabled()) {
                logger.info(sb.toString());
            }
            throw new CloudException("未找到云服务 -> " + name + "(" + version + ")");
        }
    }

    protected abstract ApplicationInfo pick(String name, String version, List<ApplicationInfo> found);

    protected ApplicationInfo doPick(String name, String version, List<ApplicationInfo> found) {
        ApplicationInfo nativeService = this.pickNativeService(name, version, found);
        if (nativeService != null) {
            return nativeService;
        }
        return this.pick(name, version, found);
    }

    @Override
    public void getHeadersShouldWrite(String name, String version, HttpHeaders headers) {
        //no header to write
    }

    public List<ApplicationInfo> getApplicationInfos() {
        return applicationInfos;
    }

    public LinkedMultiValueMap<String, ApplicationInfo> getServiceBitmap() {
        return serviceBitmap;
    }

    public boolean isNativeServiceFirstEnabled() {
        return nativeServiceFirstEnabled;
    }

    public void setNativeServiceFirstEnabled(boolean nativeServiceFirstEnabled) {
        this.nativeServiceFirstEnabled = nativeServiceFirstEnabled;
    }

    protected ApplicationInfo pickNativeService(String name, String version, List<ApplicationInfo> found) {
        if (this.isNativeServiceFirstEnabled()) {
            for (ApplicationInfo info : found) {
                String host = this.applicationInfo.getAppHost();
                if (host.equals(info.getAppHost())) {
                    logger.info("服务查找: 本地服务优先模式已开启, 返回本地服务【" + info.toString(true) + "】");
                    return info;
                }
            }
        }

        return null;
    }

    public void setApplicationInfo(ApplicationInfo applicationInfo) {
        this.applicationInfo = applicationInfo;
    }
}
