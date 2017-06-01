package cn.evun.sweet.framework.common.util;

import java.util.regex.Pattern;

/**
 * Created by zlbbq on 2017/3/13.
 */


public interface RegExps {

    /**
     * 取顶级域名的正则, 可以匹配到xxx.xxx.com, 不能匹配到xxx.com及IP, localhost等
     * */
    String TOP_DOMAIN_PATTERN_STRING = "[a-zA-Z0-9][-a-zA-Z0-9]{0,62}\\.([a-zA-Z0-9][-a-zA-Z0-9]{0,62}\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})";

    Pattern TOP_DOMAIN_PATTERN = Pattern.compile(TOP_DOMAIN_PATTERN_STRING);


    /**
     * 手机号正则
     * */
    String MOBILE_PATTERN_STRING = "^1[3,4,5,6,7,8,9]\\d{9}$";

    Pattern MOBILE_PATTERN = Pattern.compile(MOBILE_PATTERN_STRING);
}
