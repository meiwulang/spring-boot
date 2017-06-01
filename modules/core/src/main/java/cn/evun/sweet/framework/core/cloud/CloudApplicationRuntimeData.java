package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/12/22.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 应用实例运行时数据
 * */
public class CloudApplicationRuntimeData {
    private static final Logger logger = LoggerFactory.getLogger(CloudApplicationRuntimeData.class);

    //负载均衡权重
    private int loadBalanceWeight = 50;

    //多版本路由强制版本匹配策略（参考: MultiVersionSupportClientSideServiceLookup）
    private boolean multiVersionForceMatch = false;

    public int getLoadBalanceWeight() {
        return loadBalanceWeight;
    }

    public void setLoadBalanceWeight(int loadBalanceWeight) {
        this.loadBalanceWeight = loadBalanceWeight;
    }

    public boolean isMultiVersionForceMatch() {
        return multiVersionForceMatch;
    }

    public void setMultiVersionForceMatch(boolean multiVersionForceMatch) {
        this.multiVersionForceMatch = multiVersionForceMatch;
    }
}
