package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/12/7.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CloudServiceReference {
    private static final Logger logger = LoggerFactory.getLogger(CloudServiceReference.class);

    private String serviceName;

    private String serviceVersion;

    public CloudServiceReference() {

    }

    public CloudServiceReference(String serviceName, String serviceVersion) {
        this.serviceName = serviceName;
        this.serviceVersion = serviceVersion;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceVersion() {
        return serviceVersion;
    }

    public void setServiceVersion(String serviceVersion) {
        this.serviceVersion = serviceVersion;
    }
}
