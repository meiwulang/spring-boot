package cn.evun.sweet.framework.core.cloud.controller;
/**
 * @author ruanrj
 * @description
 * @create 2017-02-10.
 */

import cn.evun.sweet.framework.core.cloud.lookup.AbstractClientSideServiceLookup;
import cn.evun.sweet.framework.core.cloud.lookup.CloudServiceLookup;
import cn.evun.sweet.framework.core.cloud.lookup.WeightRandomClientSideServiceLookup;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/sweet-framework")
@ApiIgnore
public class CloudServiceController {
    private static final Logger logger = LoggerFactory.getLogger(CloudServiceController.class);

    @Autowired(required = false)
    private CloudServiceLookup cloudServiceLookup;

    @RequestMapping(value = "/service-list", method = RequestMethod.GET)
    public APIResponse serviceList() {
        Map<String, Object> ret = new HashMap<>();
        if (cloudServiceLookup != null) {
            if (cloudServiceLookup instanceof AbstractClientSideServiceLookup) {
                ret.put("service-list", ((AbstractClientSideServiceLookup) cloudServiceLookup).getServiceBitmap());
            }
            if (cloudServiceLookup instanceof WeightRandomClientSideServiceLookup) {
                ret.put("service-weights", ((WeightRandomClientSideServiceLookup) cloudServiceLookup).getApplicationWeights());
            }
        }
        return APIResponse.success(ret);
    }

}