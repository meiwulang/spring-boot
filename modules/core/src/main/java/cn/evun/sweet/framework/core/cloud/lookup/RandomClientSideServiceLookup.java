package cn.evun.sweet.framework.core.cloud.lookup;

/**
 * Created by zlbbq on 2016/12/21.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class RandomClientSideServiceLookup extends MultiVersionSupportClientSideServiceLookup {
    private static final Logger logger = LoggerFactory.getLogger(RandomClientSideServiceLookup.class);

    @Override
    protected ApplicationInfo doPick(List<ApplicationInfo> versionMatched) {
        if (versionMatched.size() == 0) {
            return null;
        }
        if (versionMatched.size() == 1) {
            return versionMatched.get(0);
        }
        return versionMatched.get(ensureIndex(versionMatched));
    }

    protected int ensureIndex(List<ApplicationInfo> versionMatched) {
        return (int) (Math.random() * versionMatched.size());
    }
}
