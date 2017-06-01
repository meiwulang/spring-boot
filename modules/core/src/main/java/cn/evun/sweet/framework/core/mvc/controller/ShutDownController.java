package cn.evun.sweet.framework.core.mvc.controller;
/**
 * @author ruanrj
 * @description
 * @create 2017-02-09.
 */

import cn.evun.sweet.framework.core.cloud.CloudApplication;
import cn.evun.sweet.framework.core.mvc.filter.RequestStatistic;
import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

@RestController
@ApiIgnore
@RequestMapping("/sweet-framework")
public class ShutDownController {

    private static final Logger logger = LoggerFactory.getLogger(ShutDownController.class);

    private static final long ONE_MINUTE = 60 * 1000L;

    @Autowired(required = false)
    private CloudApplication cloudApplication;

    @Autowired
    private RequestStatistic requestStatistic;

    /**
     * 1.限定127.0.0.1 访问(限定本机访问)
     * 2.云模式: zookeeper 修改当前应用信息为half,
     * 3.等待5s  等待处理同步应用状态时差,导致访问请求
     * 4.5s间隔轮询, 访问次数为0时,应用无其他请求,执行优雅停机（访问不统计白名单访问）
     * 5.存在阻塞线程,超时60s后,强制退出
     *
     * @param httpServletRequest
     * @param httpServletResponse
     * @throws Exception
     */
    @RequestMapping(value = "/shutdown", method = {RequestMethod.POST, RequestMethod.GET}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void shutdown(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {

        if ("127.0.0.1".equals(httpServletRequest.getRemoteAddr())) {
            logger.info("访问统计次数:[{}]", requestStatistic.getRequestCount());
            if (cloudApplication != null) {
                cloudApplication.getCloudClient().passivateApplication();
            }
            PrintWriter writer = httpServletResponse.getWriter();
            long startTime = System.currentTimeMillis();
            while (true) {
                try {
                    TimeUnit.SECONDS.sleep(5);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                long nRemaining = requestStatistic.getRequestCount();
                // nRemaining == 1表示只有一个shutdown请求在运行
                if (nRemaining == 1 || System.currentTimeMillis() - startTime > ONE_MINUTE) {
                    writer.println("Application had shutdown");
                    writer.flush();
                    new Thread(new ShutdownTask()).start();
                    break;
                }
            }
        } else {
            httpServletResponse.setStatus(HttpStatus.SC_FORBIDDEN);
            httpServletResponse.setContentType("text/html;charset=utf-8");
            httpServletResponse.getWriter().write("Shutdown commands can only be accessed locally<br/>");
            httpServletResponse.getWriter().flush();
        }
    }

    private class ShutdownTask implements Runnable {
        @Override
        public void run() {
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.exit(0);
        }
    }
}