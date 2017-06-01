package cn.evun.sweet.framework.common.web;

/**
 * Created by zlbbq on 2017/3/8.
 */


import cn.evun.sweet.framework.common.util.RegExps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static cn.evun.sweet.framework.common.web.WebUtils.getRealIpAddr;

public class RequestUtils {
    private static final Logger logger = LoggerFactory.getLogger(RequestUtils.class);

    private static final String reg = "(10|172|192|127)\\.([0-1][0-9]{0,2}|[2][0-5]{0,2}|[3-9][0-9]{0,1})\\.([0-1][0-9]{0,2}|[2][0-5]{0,2}|[3-9][0-9]{0,1})\\.([0-1][0-9]{0,2}|[2][0-5]{0,2}|[3-9][0-9]{0,1})";

    private static final Pattern INTRANET_PATTERN = Pattern.compile(reg);

    private RequestUtils() {
    }

    public static String getDomainFromRequest(HttpServletRequest request) {
        return request.getServerName();
    }

    public static String getTopDomainFromRequest(HttpServletRequest request) {
        String domain = getDomainFromRequest(request);
        Matcher matcher = RegExps.TOP_DOMAIN_PATTERN.matcher(domain);
        if (matcher.matches()) {
            return matcher.group(1);
        }
        return domain;
    }

    public static boolean isRequestFromIntranet(HttpServletRequest request) {
        String ip = getRealIpAddr(request);
        return INTRANET_PATTERN.matcher(ip).find();
    }

    public static String getRealIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }

        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }

        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

    public static String getUserAgentSummary(HttpServletRequest request) {
        return request.getHeader("user-agent");
    }
}
