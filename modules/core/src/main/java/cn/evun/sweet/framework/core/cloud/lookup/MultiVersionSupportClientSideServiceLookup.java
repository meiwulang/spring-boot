package cn.evun.sweet.framework.core.cloud.lookup;

/**
 * Created by zlbbq on 2016/12/12.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public abstract class MultiVersionSupportClientSideServiceLookup extends AbstractClientSideServiceLookup {
    private static final Logger logger = LoggerFactory.getLogger(MultiVersionSupportClientSideServiceLookup.class);

    private boolean forceMatch = false;

    @Override
    protected ApplicationInfo pick(String name, String version, List<ApplicationInfo> found) {
        if(!isForceMatch()) {
            //实现强制版本匹配开关
            //TODO 设置是否匹配应可以由平台管理, 并能在运行期间动态调整某个服务实例的选项
            return this.doPick(found);
        }
        List<ApplicationInfo> versionMatched = new ArrayList<>();
        for(ApplicationInfo applicationInfo : found) {
            if(isVersionMatched(applicationInfo.getAppVersion(), version)) {
                versionMatched.add(applicationInfo);
            }
        }
        //没有找到匹配版本, 则不管版本直接发请求, TODO: 版本兼容规则
        if(versionMatched.size() == 0) {
            versionMatched = found;
        }
        return this.doPick(versionMatched);
    }

    protected abstract ApplicationInfo doPick(List<ApplicationInfo> versionMatched);

    private boolean isVersionMatched(String v1, String v2) {
        return getVersionBase(v1).equals(getVersionBase(v2));
    }

    private String getVersionBase(String version) {
        int idx = version.indexOf("-");
        if(idx > 0) {
            return version.substring(0, idx);
        }
        return version;
    }

    public boolean isForceMatch() {
        return forceMatch;
    }

    public void setForceMatch(boolean forceMatch) {
        this.forceMatch = forceMatch;
    }
}
