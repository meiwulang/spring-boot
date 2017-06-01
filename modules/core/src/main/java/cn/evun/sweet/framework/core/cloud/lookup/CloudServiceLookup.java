package cn.evun.sweet.framework.core.cloud.lookup;

import org.springframework.http.HttpHeaders;

/**
 * Created by zlbbq on 2016/12/12.
 */


public interface CloudServiceLookup {
    String lookupService(String name, String version);

    void getHeadersShouldWrite(String name, String version, HttpHeaders headers);
}
