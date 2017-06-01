package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/11/29.
 */


public interface CloudConstants {
    String JOINT_SERVICE_URL_KEY = "sweet.cloud.joint.url";

    String CLOUD_GATEWAY_URL_KEY = "sweet.cloud.gateway.url";

    String DEFAULT_JOINT_SERVICE_URL = "http://cloud.sweet.evun.cn";

    String DEFAULT_GATEWAY_URL = "http://gateway.cloud.sweet.evun.cn";

    String HTTP_SERVER_PORT_KEY = "server.port";

    String HEADER_CLOUD_SERVICE_FROM = "X-SWEET-CLOUD-FROM";

    String HEADER_CLOUD_SERVICE_FROM_INDEX = "X-SWEET-CLOUD-FROM-INDEX";

    String HEADER_CLOUD_SERVICE_TARGET = "X-SWEET-CLOUD-TARGET";

    String HEADER_CLOUD_SERVICE_TARGET_VERSION = "X-SWEET-CLOUD-TARGET-VERSION";
}
