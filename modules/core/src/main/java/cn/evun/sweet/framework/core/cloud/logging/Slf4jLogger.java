package cn.evun.sweet.framework.core.cloud.logging;

/**
 * Created by zlbbq on 2017/3/27.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Slf4jLogger implements CloudServiceInvocationLogger {
    private static final Logger logger = LoggerFactory.getLogger(Slf4jLogger.class);

    @Override
    public void logRequest(String url, String sourceApp, String sourceAppId, String targetApp, String traceId) {
        logger.info("【云服务请求】" + new Request(sourceApp, sourceAppId, targetApp, traceId, url).toString());
    }

    @Override
    public void logResponse(String traceId, String targetApp, String targetAppId, boolean success, Throwable error) {
        logger.info("【云服务响应】" + new Response(error, success, targetApp, targetAppId, traceId).toString());
    }

    static class Request {
        String url;
        String sourceApp;
        String sourceAppId;
        String targetApp;
        String traceId;

        public Request(String sourceApp, String sourceAppId, String targetApp, String traceId, String url) {
            this.sourceApp = sourceApp;
            this.sourceAppId = sourceAppId;
            this.targetApp = targetApp;
            this.traceId = traceId;
            this.url = url;
        }

        public String getSourceApp() {
            return sourceApp;
        }

        public void setSourceApp(String sourceApp) {
            this.sourceApp = sourceApp;
        }

        public String getSourceAppId() {
            return sourceAppId;
        }

        public void setSourceAppId(String sourceAppId) {
            this.sourceAppId = sourceAppId;
        }

        public String getTargetApp() {
            return targetApp;
        }

        public void setTargetApp(String targetApp) {
            this.targetApp = targetApp;
        }

        public String getTraceId() {
            return traceId;
        }

        public void setTraceId(String traceId) {
            this.traceId = traceId;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        @Override
        public String toString() {
            return "Request{" +
                    "sourceApp='" + sourceApp + '\'' +
                    ", url='" + url + '\'' +
                    ", sourceAppId='" + sourceAppId + '\'' +
                    ", targetApp='" + targetApp + '\'' +
                    ", traceId='" + traceId + '\'' +
                    '}';
        }
    }

    static class Response {
        String traceId;
        String targetApp;
        String targetAppId;
        boolean success;
        Throwable error;

        public Response(Throwable error, boolean success, String targetApp, String targetAppId, String traceId) {
            this.error = error;
            this.success = success;
            this.targetApp = targetApp;
            this.targetAppId = targetAppId;
            this.traceId = traceId;
        }

        public Throwable getError() {
            return error;
        }

        public void setError(Throwable error) {
            this.error = error;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getTargetApp() {
            return targetApp;
        }

        public void setTargetApp(String targetApp) {
            this.targetApp = targetApp;
        }

        public String getTargetAppId() {
            return targetAppId;
        }

        public void setTargetAppId(String targetAppId) {
            this.targetAppId = targetAppId;
        }

        public String getTraceId() {
            return traceId;
        }

        public void setTraceId(String traceId) {
            this.traceId = traceId;
        }

        @Override
        public String toString() {
            return "Response{" +
                    "error=" + (error == null ? "null" : error.getMessage()) +
                    ", traceId='" + traceId + '\'' +
                    ", targetApp='" + targetApp + '\'' +
                    ", targetAppId='" + targetAppId + '\'' +
                    ", success=" + success +
                    '}';
        }
    }
}
