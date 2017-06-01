package cn.evun.sweet.framework.storage.spi.fastdfs.configuration;

/**
 * Created by zlbbq on 2017/3/14.
 */


import cn.evun.sweet.framework.storage.StorageService;
import cn.evun.sweet.framework.storage.spi.fastdfs.FastDFS;
import cn.evun.sweet.framework.storage.spi.fastdfs.FastDFSStorageService;
import org.csource.fastdfs.ClientGlobal;
import org.csource.fastdfs.TrackerGroup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.InetSocketAddress;

@ConditionalOnExpression("'fastdfs'.equalsIgnoreCase('${sweet.framework.storage.type:fastdfs}')")
@Configuration
public class FastDFSStorageConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(FastDFSStorageConfiguration.class);

    @Value("${sweet.framework.storage.fastdfs.connection-timeout:5}")
    private int connectionTimeout;

    @Value("${sweet.framework.storage.fastdfs.network-timeout:30}")
    private int networkTimeout;

    @Value("${sweet.framework.storage.fastdfs.charset:UTF-8}")
    private String charset;

    @Value("${sweet.framework.storage.fastdfs.http.port:80}")
    private int httpPort;

    @Value("${sweet.framework.storage.fastdfs.http.anti-steal-token:false}")
    private boolean httpAntiStealToken;

    @Value("${sweet.framework.storage.fastdfs.http.secret-key:FastDFS1234567890}")
    private String httpSecretKey;

    @Value("${sweet.framework.storage.fastdfs.tracker-servers:10.86.87.208:22122,10.86.87.208:22122,10.86.87.208:22122}")
    private String trackerServers;

    @Value("${sweet.framework.storage.fastdfs.tracker-domain:http://www.igap.cc/}")
    private String trackerDomain;

    @Bean
    public FastDFS fastDFS() {
        //配置FastDFS全局配置
        logger.info("正在配置FastDFS客户端...");
        ClientGlobal.g_connect_timeout = connectionTimeout * 1000;
        ClientGlobal.g_network_timeout = connectionTimeout * 1000;
        ClientGlobal.g_charset = charset;
        String []servers = trackerServers.split(",");
        InetSocketAddress[] trackerServerAddresses = new InetSocketAddress[servers.length];
        for(int i = 0;i<servers.length;i++) {
            String s = servers[i];
            String parts[] = s.split("\\:");
            trackerServerAddresses[i] = new InetSocketAddress(parts[0].trim(), Integer.parseInt(parts[1].trim()));
        }
        ClientGlobal.g_tracker_group = new TrackerGroup(trackerServerAddresses);
        ClientGlobal.g_tracker_http_port = httpPort;
        ClientGlobal.g_anti_steal_token = httpAntiStealToken;
        if(httpAntiStealToken) {
            ClientGlobal.g_secret_key = httpSecretKey;
        }
        return new FastDFS(trackerDomain);
    }

    @Bean
    public StorageService fastDFSStorageService(FastDFS factory) {
        return new FastDFSStorageService(factory);
    }
}
