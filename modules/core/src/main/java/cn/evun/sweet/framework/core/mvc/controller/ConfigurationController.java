package cn.evun.sweet.framework.core.mvc.controller;

/**
 * Created by zlbbq on 2016/12/16.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.cfg.ConfigMetadata;
import cn.evun.sweet.framework.core.mvc.APIResponse;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.PropertyResolver;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@Profile("configuration")
@Controller
@RequestMapping("/sweet-framework/configuration")
@ApiIgnore
public class ConfigurationController {
    private static final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);

    @Autowired
    private ApplicationInfo applicationInfo;

    @Autowired
    private PropertyResolver propertyResolver;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ApiOperation("显示应用当前配置项")
    @ResponseBody
    public void getApplicationRuntimeConfiguration(
            HttpServletResponse response
    ) throws IOException {
        response.setContentType("text/html;charset=utf-8");
        Properties runtimeConfigurations = applicationInfo.getRuntimeConfiguration();
        SortedMap<String, String> props = new TreeMap<>();
        Set<Object> configItems = runtimeConfigurations.keySet();
        StringBuffer sb = new StringBuffer();
        for (Object s : configItems) {
            //sb.append(s.toString() + "=" + applicationProperties.getProperty(s.toString())).append("\n");
            props.put(s.toString(), runtimeConfigurations.getProperty(s.toString()));
        }
        Set<String> sortedConfigItems = props.keySet();
        for (Object s : sortedConfigItems) {
            String val = propertyResolver.getProperty(s.toString(), "");
            if("spring.datasource.password".equals(s.toString())) {
                val = "******";
            }
            sb.append(s.toString()).append("=").append(val).append("\n");
        }
        PrintWriter printWriter = response.getWriter();
        printWriter.println("<h1>Sweet应用[" + applicationInfo.getIdentifier() + "]配置列表</h1>");
        printWriter.println("<pre>");
        printWriter.println(sb.toString());
        printWriter.println("</pre>");
    }

    @RequestMapping(value = "/metadata", method = RequestMethod.GET)
    @ApiOperation("查询应用当前配置元数据")
    @ResponseBody
    public APIResponse<Map<String, ConfigMetadata>> getApplicationConfigurationMetadata() {
        return APIResponse.success(applicationInfo.getConfigMetadataMap());
    }

    @RequestMapping(value = "/metadata/preview", method = RequestMethod.GET)
    @ApiOperation("显示应用当前配置元数据")
    public void previewMetadata(
            HttpServletResponse response) throws Exception {
        response.getWriter().write("<script type='text/javascript'>window.location='../views/index.html';</script>");
    }
}
