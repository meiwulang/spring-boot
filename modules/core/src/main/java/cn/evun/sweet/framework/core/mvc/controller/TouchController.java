package cn.evun.sweet.framework.core.mvc.controller;

/**
 * Created by zlbbq on 2016/11/29.
 */


import cn.evun.sweet.framework.core.mvc.APIResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

//该Controller作为Sweet Cloud Registry确认服务状态的回调接口
@RestController
@ApiIgnore
@RequestMapping("/sweet-framework")
public class TouchController {
    private static final Logger logger = LoggerFactory.getLogger(TouchController.class);

    @RequestMapping(value = "/touch", method = RequestMethod.GET)
    public APIResponse<Boolean> touch() {
        return APIResponse.success(true);
    }
}
