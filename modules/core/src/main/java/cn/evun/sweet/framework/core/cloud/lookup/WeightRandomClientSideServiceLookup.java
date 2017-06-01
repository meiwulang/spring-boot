package cn.evun.sweet.framework.core.cloud.lookup;

/**
 * Created by zlbbq on 2016/12/21.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class WeightRandomClientSideServiceLookup extends RandomClientSideServiceLookup {
    private static final Logger logger = LoggerFactory.getLogger(WeightRandomClientSideServiceLookup.class);

    private static Random random = new Random();

    protected Map<String, Integer> applicationWeights = new HashMap<>();

    private static final int DEFAULT_WEIGHT = 50;

    private static final int MIN_WEIGHT = 0;

    private static final int MAX_WEIGHT = 100;

    private static final int FIRST_INSTANCE = 0;

    @Override
    protected int ensureIndex(List<ApplicationInfo> versionMatched) {
        int weightSum = 0;
        for(ApplicationInfo applicationInfo : versionMatched) {
            weightSum += getApplicationWeight(applicationInfo);
        }

        Integer n = random.nextInt(weightSum); // n in [0, weightSum)
        Integer m = 0;
        for (int i = 0;i<versionMatched.size();i++) {
            ApplicationInfo applicationInfo = versionMatched.get(i);
            int weight = getApplicationWeight(applicationInfo);
            if (m <= n && n < m + weight) {
                return i;
            }
            m += weight;
        }

        return FIRST_INSTANCE;
    }

    protected int getApplicationWeight(ApplicationInfo applicationInfo) {
        Integer weight = applicationWeights.get(applicationInfo.getIdentifier());
        if(weight == null || weight < MIN_WEIGHT) {
            return DEFAULT_WEIGHT;
        }
        else if(weight > MAX_WEIGHT) {
            return DEFAULT_WEIGHT;
        }
        return weight;
    }

    public Map<String, Integer> getApplicationWeights() {
        return applicationWeights;
    }

    public void setApplicationWeights(Map<String, Integer> applicationWeights) {
        this.applicationWeights = applicationWeights;
    }
}
