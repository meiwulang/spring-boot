package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/10/7.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import javax.servlet.MultipartConfigElement;

@Configuration
public class FileUploadConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(FileUploadConfiguration.class);

    @Value("${sweet.framework.core.mvc.upload.maxFileSize:10MB}")
    private String maxFileSize;

    @Value("${sweet.framework.core.mvc.upload.maxRequestSize:100MB}")
    private String maxRequestSize;

    @Value("${sweet.framework.core.mvc.upload.storageLocation:}")
    private String storageLocation;

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(maxFileSize);
        factory.setMaxRequestSize(maxRequestSize);
        if(StringUtils.hasText(storageLocation)) {
            factory.setLocation(storageLocation);
        }
        return factory.createMultipartConfig();
    }
}
