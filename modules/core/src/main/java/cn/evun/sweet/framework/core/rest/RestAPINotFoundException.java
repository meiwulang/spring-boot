package cn.evun.sweet.framework.core.rest;

/**
 * Created by zlbbq on 16/6/23.
 */


@Deprecated
public class RestAPINotFoundException extends RuntimeException {
//    private static final Logger logger = LoggerFactory.getLogger(RestAPINotFoundException.class);

    public RestAPINotFoundException(String group, String api) {
        super("Rest API [" + api + "] not found in registry [" + group + "]");
    }
}
