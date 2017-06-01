package cn.evun.sweet.framework.core.configuration;


/**
 * Created by zlbbq on 16/5/5.
 */

import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.mvc.controller.DateRequestParameterBinder;
import cn.evun.sweet.framework.core.mvc.controller.validation.ControllerParameterValidationAspect;
import cn.evun.sweet.framework.core.mvc.filter.SessionUserFetcher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.text.SimpleDateFormat;
import java.util.Date;

@Configuration
@ControllerAdvice
public class MVCConfiguration {
//    private static final Logger logger = LoggerFactory.getLogger(MVCConfiguration.class);

    @Value("${sweet.framework.core.mvc.data-binder.date.useGMTTimeZone:false}")
    private boolean useGMTTimeZone;

    @Bean
    @ConditionalOnMissingBean(SessionUserFetcher.class)
    public SessionUserFetcher sessionUserFetcher() {
        return new SessionUserFetcher() {
            @Override
            public String getUserId(HttpServletRequest request) {
                Object o = request.getSession().getAttribute(Constants.Http.SESSION_USER_KEY);
                if(o != null) {
                    return o.toString();
                }
                return null;
            }
        };
    }

    @Bean
    public ControllerParameterValidationAspect controllerParameterValidationAspect() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        return new ControllerParameterValidationAspect(validator);
    }

    //支持日期型参数
    @InitBinder
//    public void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
    //modified by zlbbq, 1.0.24-SNAPSHOT: sonar reports an unused parameter error, but I'm not sure whether it works as expected
    public void initBinder(ServletRequestDataBinder binder) throws Exception {
        binder.registerCustomEditor(Date.class, new DateRequestParameterBinder(false));
    }
}
