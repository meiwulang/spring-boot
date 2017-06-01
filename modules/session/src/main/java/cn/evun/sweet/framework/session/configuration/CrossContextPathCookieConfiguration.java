package cn.evun.sweet.framework.session.configuration;

import cn.evun.sweet.framework.common.util.RegExps;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zlbbq on 2016/12/17
 */

/**
 * 默认Spring Session的Cookie是绑定到应用的ContextPath的, 在多应用集成环境下这个值需要默认设置到根目录以在各种应用之间共享Session
 * @Since 2.0.0
 * */

@Configuration
public class CrossContextPathCookieConfiguration {

    @Value("${sweet.session.sso.enabled:true}")
    private boolean enableSSO;

    @Value("${sweet.session.cross-context.enabled:true}")
    private boolean enableCrossDomain;

    @Value("${sweet.session.parse-request.enabled:true}")
    private boolean enableParseRequest;

    @Value("${sweet.session.request-param.name:__ticket__}")
    private String requestParamName;

    @Bean
    public CookieSerializer cookieSerializer() {
        return new CrossContextCookieSerializer(enableSSO, enableCrossDomain, enableParseRequest, requestParamName);
    }

    private static class CrossContextCookieSerializer extends DefaultCookieSerializer {
        private boolean enableParseRequest;

        private String requestParamName;

        public CrossContextCookieSerializer(boolean enableSSO, boolean enableCrossDomain, boolean enableParseRequest, String requestParamName) {
            if(enableSSO) {
                this.setDomainNamePattern(RegExps.TOP_DOMAIN_PATTERN_STRING);
            }

            if(enableCrossDomain) {
                this.setCookiePath("/");
            }

            this.enableParseRequest = enableParseRequest;
            this.requestParamName = requestParamName;
        }

        @Override
        public List<String> readCookieValues(HttpServletRequest request) {
            List<String> ret = super.readCookieValues(request);

            if(enableParseRequest) {
                //这里赋予当前请求读取session的权利
                String sessionId = request.getParameter(requestParamName);
                if(StringUtils.hasText(sessionId)) {
                    ret.clear();        //以URL参数为准, TODO, 测试易用性
                    ret.add(0, sessionId);
                }
            }

            return ret;
        }

        @Override
        public void writeCookieValue(CookieValue cookieValue) {
            super.writeCookieValue(cookieValue);
        }
    }
}
