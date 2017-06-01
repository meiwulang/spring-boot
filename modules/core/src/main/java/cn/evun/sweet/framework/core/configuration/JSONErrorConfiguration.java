package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/22.
 */


import cn.evun.sweet.framework.core.mvc.error.DefaultErrorHandler;
import cn.evun.sweet.framework.core.mvc.error.ErrorHandler;
import cn.evun.sweet.framework.core.mvc.error.chain.ChainedErrorHandler;
import cn.evun.sweet.framework.core.mvc.error.chain.DefaultBusinessExceptionHandler;
import cn.evun.sweet.framework.core.mvc.filter.SessionUserFetcher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnMissingBean(ErrorHandler.class)
@ConditionalOnExpression("'${sweet.framework.core.mvc.error.handle.json:true}'=='true'")
public class JSONErrorConfiguration {
    @Value("${sweet.framework.core.mvc.error.handler.outputStackTrace:false}")
    private boolean outputStackTrace;

    //如果应用定义了此bean, 则用此获取登录用户的ID
    @Bean
    public ErrorHandler defaultMVCErrorHandler() {
        return new DefaultErrorHandler(outputStackTrace);
    }

    @Bean
    @ConditionalOnMissingBean(name = "defaultBusinessExceptionHandler")
    public ChainedErrorHandler defaultBusinessExceptionHandler(SessionUserFetcher sessionUserFetcher) {
        return new DefaultBusinessExceptionHandler(sessionUserFetcher);
    }
}
