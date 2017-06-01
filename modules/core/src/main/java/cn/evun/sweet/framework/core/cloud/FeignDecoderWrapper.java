package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2017/3/15.
 */


import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.cloud.logging.CloudServiceInvocationLogger;
import feign.FeignException;
import feign.Response;
import feign.codec.Decoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collection;

public class FeignDecoderWrapper {
    private static final Logger logger = LoggerFactory.getLogger(FeignDecoderWrapper.class);

    private InnerDecoder decoder;

    private CloudServiceInvocationLogger[] cloudServiceInvocationLoggers;

    public FeignDecoderWrapper(Decoder decoder) {
        this.decoder = new InnerDecoder(decoder);
    }

    public Decoder getDecoder() {
        return this.decoder;
    }

    public CloudServiceInvocationLogger[] getCloudServiceInvocationLoggers() {
        return cloudServiceInvocationLoggers;
    }

    public void setCloudServiceInvocationLoggers(CloudServiceInvocationLogger[] cloudServiceInvocationLoggers) {
        this.cloudServiceInvocationLoggers = cloudServiceInvocationLoggers;
    }

    private final class InnerDecoder implements Decoder {
        private Decoder decoder;

        InnerDecoder(Decoder decoder) {
            this.decoder = decoder;
        }

        @Override
        public Object decode(Response response, Type type) throws IOException, FeignException {
            boolean success = true;
            Throwable error = null;
            String targetApp = getHeader(response, Constants.HttpRequestTrace.HEADER_APP);
            String targetAppId = getHeader(response, Constants.HttpRequestTrace.HEADER_APP_ID);
            String traceId = getHeader(response, Constants.HttpRequestTrace.HEADER_TRACE_ID);
            boolean isLog = StringUtils.hasText(traceId);
            try {
                Object ret = this.decoder.decode(response, type);
                /**
                 这里准备Hack到HystrixFeign中统一BusinessException的, 但是HystrixFeign没有给我机会,
                 关键类是final的, 关键方法扔了UnsupportedOperationException, 没得搞, 以后再说, 先用这个类实现日志功能
                 */
                return ret;
            } catch (Exception e) {
                success = false;
                error = e;
                throw e;
            }
            finally {
                if(isLog) {
                    doLog(traceId, targetApp, targetAppId, success, error);
                }
            }
        }

        private void doLog(String traceId, String targetApp, String targetAppId, boolean success, Throwable error) {
            if(cloudServiceInvocationLoggers != null) {
                for(CloudServiceInvocationLogger cloudServiceInvocationLogger : cloudServiceInvocationLoggers) {
                    cloudServiceInvocationLogger.logResponse(traceId, targetApp, targetAppId, success, error);
                }
            }
        }

        private String getHeader(Response response, String header) {
            Collection<String> headers = response.headers().get(header);
            if (headers != null && headers.size() > 0) {
                return headers.iterator().next();
            }
            return null;
        }
    }
}
