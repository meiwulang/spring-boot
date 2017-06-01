package cn.evun.sweet.framework.core.cloud.lookup;

/**
 * Created by zlbbq on 2016/12/12.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class RoundRobinClientSideServiceLookup extends MultiVersionSupportClientSideServiceLookup {
    private static final Logger logger = LoggerFactory.getLogger(RoundRobinClientSideServiceLookup.class);

    private ConcurrentHashMap<String, AtomicLong> counters = new ConcurrentHashMap<>();

    public RoundRobinClientSideServiceLookup() {
    }

    @Override
    protected ApplicationInfo doPick(List<ApplicationInfo> versionMatched) {
        if(versionMatched.size() == 0) {
            return null;
        }
        ApplicationInfo ret = null;
        long min = -1L;
        AtomicLong counter = null;
        //TODO 高效排序
        for(int i = 0;i<versionMatched.size();i++) {
            ApplicationInfo applicationInfo = versionMatched.get(i);
            String tmpKey = getKey(applicationInfo);
            AtomicLong number = counters.get(tmpKey);
            if (number == null) {
                AtomicLong newNumber = new AtomicLong(0);
                number = counters.putIfAbsent(tmpKey, newNumber);
                if (number == null) {
                    number = newNumber;
                }
            }
            long val = number.get();
            if(min == -1L || val <= min) {
                min = val;
                ret = applicationInfo;
                counter = number;
            }
        }
        counter.incrementAndGet();
        return ret;
    }

    protected String getKey(ApplicationInfo applicationInfo) {
        return applicationInfo.getAppName() + "-" + applicationInfo.getAppId();
    }

    protected void resetCounters() {
        this.counters.clear();
    }

    @Override
    public synchronized void setServices(List<ApplicationInfo> applicationInfos) {
        super.setServices(applicationInfos);
        this.resetCounters();
    }
}
