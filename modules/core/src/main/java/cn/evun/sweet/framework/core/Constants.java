package cn.evun.sweet.framework.core;


/**
 * Created by zlbbq on 16/5/11.
 */

public class Constants {
    public static final class Charsets {
        public static final String CONFIG_ITEM_CHARSET = "ISO-8859-1";

        public static final String APPLICATION_CHARSET = "utf8";
    }

    public static final class FilterOrderGroups {

        public static final int TOP_FILTER = 100;

        public static final int TRACE_FILTER = 200;

        public static final int SECURITY_FILTER = 300;

        public static final int SESSION_FILTER = 1000;

    }

    public static final class ApplicationProfiles {

        public static final String DEVELOPMENT = "dev";

        public static final String TEST = "test";

        public static final String PRODUCTION = "production";
    }

    public static final class HttpRequestTrace {

        public static final String HEADER_TRACE_ID = "X-SWEET-REQUEST-ID";

        public static final String HEADER_APP = "X-SWEET-APP";

        public static final String HEADER_APP_ID = "X-SWEET-APP-ID";

        public static final String REQUEST_ATTRIBUTE_TRACE_ID = "ATTR-SWEET-TRACE-ID";

        public static final String REQUEST_ATTRIBUTE_IS_BUSINESS_EXCEPTION = "ATTR-SWEET-IS-BUSINESS-EXCEPTION";
    }

    public static final class Http {
        public static final String SESSION_USER_KEY = "SWEET-SESSION-USER";

        //表示业务异常的响应码, 这个只能是200, 否则在Hystrix干预下, 会由于底层的业务异常导致熔断逻辑
        public static final int HTTP_SC_BUSINESS_ERROR = 200;
    }

}
