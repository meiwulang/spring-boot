package cn.evun.sweet.framework.session.cds.controller;

/**
 * Created by zlbbq on 2017/3/13.
 */


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.MessageFormat;

/**
 * 支持跨域(不同顶级域名)登录的Controller
 */
@Controller
@RequestMapping("/cds")
@Api("CDS(Cross Domain SignOn)控制器")
public class SweetCDSSessionController {
    private static final Logger logger = LoggerFactory.getLogger(SweetCDSSessionController.class);

    private static final String CDS_LOGIN_URI = "/cds/login";

    @Autowired
    private RedisOperationsSessionRepository sessionRepository;

    @Autowired
    private CookieSerializer cookieSerializer;

    @RequestMapping(value = "/redirect", method = RequestMethod.GET)
    @ApiOperation(value = "跳转到支持Sweet CDS的网站并使用当前登录的用户身份登录", notes = "支持Sweet CDS标准的网站必须支持/cds/login访问到CDS登录认证服务<br/>, 如: http://www.xxx.com/page1.html将会使用http://www.xxx.com/cds/login作为登录入口")
    public String redirect(
            @ApiIgnore
                    HttpSession session,

            @RequestParam(name = "page", required = true)
            @ApiParam(name = "page", value = "登录成功后的跳转地址", required = true)
                    String page
    ) throws Exception {
        URL url = new URL(page);
        String protocol = url.getProtocol();
        String host = url.getHost();
        int port = url.getPort();
        String sPort = port > 0 ? (":" + port) : "";
        String redirectPattern = "redirect:{0}://{1}{2}{3}?__ticket__={4}&redirect={5}"; // 0 - 协议, 1 - 主机, 2 - 端口, 3 - CDS_LOGIN_URI, 4 - ticket, 5 - 跳转页面
        return MessageFormat.format(redirectPattern, protocol, host, sPort, CDS_LOGIN_URI, session.getId(), URLEncoder.encode(page, "UTF-8"));
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    @ApiOperation(value = "使用指定的CDS登录凭证登录", notes = "建议不要主动调用此URL, 使用/cds/redirect作为入口")
    public String login(
            @ApiIgnore
                    HttpServletRequest request,

            @ApiIgnore
                    HttpServletResponse response,

            @RequestParam(name = "__ticket__", required = true)
            @ApiParam(name = "__ticket__", value = "登录会话凭证", required = true)
                    String __ticket__,

            @RequestParam(name = "redirect", required = false, defaultValue = "/")
            @ApiParam(name = "redirect", value = "重定向页面, 默认为\"/\"", defaultValue = "/", required = false)
                    String redirect

    ) throws IOException {
        if (sessionRepository.getSession(__ticket__) != null) {
            //登录成功, ticket有效
            cookieSerializer.writeCookieValue(new CookieSerializer.CookieValue(request, response, __ticket__));
            return getRedirectURL(request, redirect);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().println("<h1>无效的登录凭证</h1>");
        }
        return null;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    @ApiOperation(value = "在同一个CDS会话平台登出当前用户", notes = "注意: 一个会话登出后, 所有使用相同ticket的网站将同时登出")
    public String logout(
            @ApiIgnore
                    HttpServletRequest request,
            @ApiIgnore
                    HttpServletResponse response,
            @ApiIgnore
                    HttpSession session,
            @RequestParam(name = "redirect", required = false, defaultValue = "/")
            @ApiParam(name = "redirect", value = "重定向地址, 默认为\"/\"", defaultValue = "/", required = false)
                    String redirect
    ) {
        session.invalidate();
        return getRedirectURL(request, redirect);
    }

    private String getRedirectURL(HttpServletRequest request, String redirect) {
        String protocol = "http:";
        if (request.isSecure()) {
            protocol = "https:";
        }
        int port = request.getLocalPort();
        String sPort;
        if(port < 0 || port == 80) {
            sPort = "";
        }
        else {
            sPort = ":" + port;
        }
        if ("/".equals(redirect)) {
            return MessageFormat.format("redirect:{0}//{1}{2}", protocol, request.getServerName(), sPort);  // 0 - protocol, 1 - serverName, 2 - port
        }
        return MessageFormat.format("redirect:{0}", redirect);
    }
}
