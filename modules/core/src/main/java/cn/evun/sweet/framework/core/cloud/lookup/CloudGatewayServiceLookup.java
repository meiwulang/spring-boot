package cn.evun.sweet.framework.core.cloud.lookup;

/**
 * Created by zlbbq on 2016/12/13.
 */


import cn.evun.sweet.framework.core.cloud.CloudConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;

public class CloudGatewayServiceLookup implements CloudServiceLookup {
    private static final Logger logger = LoggerFactory.getLogger(CloudGatewayServiceLookup.class);

    protected String gatewayPattern;

    public CloudGatewayServiceLookup(String gatewayPattern) {
        this.gatewayPattern = gatewayPattern;
    }

    @Override
    public String lookupService(String name, String version) {
        return gatewayPattern.replaceAll("\\$\\{appName\\}", name);
    }

    @Override
    public void getHeadersShouldWrite(String name, String version, HttpHeaders headers) {
        headers.add(CloudConstants.HEADER_CLOUD_SERVICE_TARGET, name);
        headers.add(CloudConstants.HEADER_CLOUD_SERVICE_TARGET_VERSION, version);
    }
}
