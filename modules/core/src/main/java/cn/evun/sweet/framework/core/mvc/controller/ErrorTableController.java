package cn.evun.sweet.framework.core.mvc.controller;

/**
 * Created by zlbbq on 2017/3/15.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.mvc.ErrorTable;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Properties;
import java.util.Set;
import java.util.SortedMap;
import java.util.TreeMap;

@RestController
@RequestMapping("/sweet-framework")
@ApiIgnore
public class ErrorTableController {
    private static final Logger logger = LoggerFactory.getLogger(ErrorTableController.class);

    @Autowired
    private ApplicationInfo applicationInfo;

    @RequestMapping(value = "/errors", method = RequestMethod.GET)
    @ApiOperation("显示系统中所有的错误码")
    public void listErrors(
            @ApiIgnore
                    HttpServletResponse response
    ) throws IOException {
        response.setContentType("text/html;charset=utf-8");
        Properties errorTable = ErrorTable.getErrors();
        SortedMap<String, String> props = new TreeMap<>();
        Set<Object> configItems = errorTable.keySet();
        StringBuffer sb = new StringBuffer("<h1>Sweet应用【" + applicationInfo.getAppName() + "】错误码表</h1>\n");
        sb.append("<pre>\n");
        for (Object s : configItems) {
            props.put(s.toString(), errorTable.getProperty(s.toString()));
        }
        Set<String> sortedConfigItems = props.keySet();
        for (Object s : sortedConfigItems) {
            sb.append(s.toString()).append("=").append(errorTable.getProperty(s.toString())).append("\n");
        }
        sb.append("</pre>");
        response.getWriter().println(sb.toString());
    }
}
