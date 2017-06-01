package cn.evun.sweet.framework.core.mvc.error.chain;

/**
 * Created by zlbbq on 2017/3/9.
 */


import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.core.Constants;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import cn.evun.sweet.framework.core.mvc.BusinessException;
import cn.evun.sweet.framework.core.mvc.filter.SessionUserFetcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.MessageFormat;

public class DefaultBusinessExceptionHandler extends ChainedErrorHandler {
    private static final Logger logger = LoggerFactory.getLogger(DefaultBusinessExceptionHandler.class);

    private static final int DEFAULT_ORDER = Integer.MAX_VALUE;

    private static final String DEFAULT_NAME = "defaultBusinessExceptionHandler";

    private SessionUserFetcher sessionUserFetcher;

    private static final String ERROR_MESSAGE_PATTERN = "Business Exception: 用户=[{0}], 错误码=[{1}], 错误消息=[{2}]";

    public DefaultBusinessExceptionHandler(SessionUserFetcher sessionUserFetcher) {
        super(DEFAULT_NAME, DEFAULT_ORDER);
        this.sessionUserFetcher = sessionUserFetcher;
    }

    @Override
    public boolean isTarget(Throwable t) {
        return BusinessException.class.equals(t.getClass());
    }

    @Override
    public void handleError(Throwable t, HttpServletRequest request, HttpServletResponse response) {
        BusinessException businessException = (BusinessException) t;
        APIResponse apiResponse = businessException.response();
        String userInfo = this.sessionUserFetcher.getUserId(request);
        if(!StringUtils.hasText(userInfo)) {
            userInfo = "UNKNOWN-USER";
        }
        logger.error(MessageFormat.format(ERROR_MESSAGE_PATTERN, userInfo, apiResponse.getCode(), apiResponse.getMessage()));
        if(logger.isDebugEnabled()) {
            logger.debug(businessException.getMessage(), businessException);
        }
        //注意, 只能响应200, 否则业务逻辑错误也会导致Hystrix断路器发生
        super.outputAPIResponse(apiResponse, request, response, Constants.Http.HTTP_SC_BUSINESS_ERROR);
    }
}
