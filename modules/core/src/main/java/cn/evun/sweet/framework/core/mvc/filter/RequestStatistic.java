package cn.evun.sweet.framework.core.mvc.filter;

import java.util.concurrent.atomic.AtomicLong;

/**
 * @author ruanrj
 * @description
 * @create 2017-02-10.
 */

public class RequestStatistic {

    private static AtomicLong REQUEST_COUNT = new AtomicLong(0);

    public void increaseRequestCount() {
        REQUEST_COUNT.getAndIncrement();
    }

    public void decreaseRequestCount() {
        REQUEST_COUNT.getAndDecrement();
    }

    public long getRequestCount() {
        return REQUEST_COUNT.get();
    }
}