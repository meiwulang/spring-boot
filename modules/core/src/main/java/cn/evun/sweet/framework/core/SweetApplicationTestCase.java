package cn.evun.sweet.framework.core;

/**
 * Created by zlbbq on 16/10/10.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SweetApplicationTestCase {
    private static final Logger logger = LoggerFactory.getLogger(SweetApplicationTestCase.class);

    private static final int AUTOWIRE_MODE = 1;

    public static void enable(Object testCase) {
        SweetApplicationEntry.applicationContext.getAutowireCapableBeanFactory().autowireBeanProperties(testCase, AUTOWIRE_MODE, true);
    }
}
