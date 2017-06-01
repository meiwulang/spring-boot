package cn.evun.sweet.framework.core.cloud.logging;

/**
 * Created by zlbbq on 2017/3/27.
 */

/**
 * 云服务调用日志接口, 便于事件总线等模块接入后处理云服务调用日志
 */
public interface CloudServiceInvocationLogger {
    void logRequest(String url, String sourceApp, String sourceAppId, String targetApp, String traceId);

    void logResponse(String traceId, String targetApp, String targetAppId, boolean success, Throwable error);
}
