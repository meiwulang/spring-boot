package cn.evun.sweet.framework.core.cloud.common.model.message;

/**
 * Created by zlbbq on 2016/12/8.
 */


import cn.evun.sweet.framework.core.cloud.CloudApplication;
import cn.evun.sweet.framework.core.monitor.ApplicationPerformanceMetrics;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APMLogMessage extends ApplicationLogMessage {
    private static final Logger logger = LoggerFactory.getLogger(APMLogMessage.class);

    private ApplicationPerformanceMetrics apm;

    public APMLogMessage(CloudApplication cloudApplication) {
        super(cloudApplication);
        this.apm = cloudApplication.getApplicationPerformanceMetrics();
    }

    public ApplicationPerformanceMetrics getApm() {
        return apm;
    }

    public void setApm(ApplicationPerformanceMetrics apm) {
        this.apm = apm;
    }
}
