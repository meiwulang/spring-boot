package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/29.
 */


import cn.evun.sweet.framework.core.module.ModuleConstants;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.github.pagehelper.PageHelper;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.util.*;

@Configuration
public class DataSourceConfiguration implements EnvironmentAware {
//    private static final Logger logger = LoggerFactory.getLogger(DataSourceConfiguration.class);

    private String mybatisMapperScanBasePackage;

    private String mybatisMapperAnnotation;

    public void setEnvironment(Environment environment) {
        this.mybatisMapperScanBasePackage = environment.resolvePlaceholders("${sweet.framework.core.mybatis.mapper.scan.basePackages:}");
        this.mybatisMapperAnnotation = environment.resolvePlaceholders("${sweet.framework.core.mybatis.mapper.scan.annotation:org.apache.ibatis.annotations.Mapper}");
        String modulesMapperScanBasePackage = environment.resolvePlaceholders("${"+ModuleConstants.LAUNCH_ARG_DAO_PACKAGES+":}");
        String comma = ",";
        if((!StringUtils.hasText(this.mybatisMapperScanBasePackage)) || this.mybatisMapperScanBasePackage.endsWith(",")) {
            comma = "";
        }
        if(StringUtils.hasText(modulesMapperScanBasePackage) && !("null".equals(modulesMapperScanBasePackage))) {
            this.mybatisMapperScanBasePackage = this.mybatisMapperScanBasePackage + comma + modulesMapperScanBasePackage;
        }
    }

    @Bean
    @Primary
    @ConfigurationProperties(prefix="spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().type(DruidDataSource.class).build();
    }

    @Bean
    public PageHelper pageHelper() {
        PageHelper pageHelper = new PageHelper();
        Properties p = new Properties();
        p.setProperty("offsetAsPageNum", "true");
        p.setProperty("rowBoundsWithCount", "true");
        p.setProperty("reasonable", "true");

        pageHelper.setProperties(p);
        return pageHelper;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() throws ClassNotFoundException {
        if(!StringUtils.hasText(mybatisMapperScanBasePackage)) {
            //hack code to avoid mapper scan error
            mybatisMapperScanBasePackage = "cn.evun.sweet.framework.core";
        }
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        mapperScannerConfigurer.setBasePackage(mybatisMapperScanBasePackage);
        if(StringUtils.hasText(mybatisMapperAnnotation)) {
            mapperScannerConfigurer.setAnnotationClass(Class.forName(mybatisMapperAnnotation).asSubclass(java.lang.annotation.Annotation.class));
        }
        return mapperScannerConfigurer;
    }

    @Bean
    public ServletRegistrationBean druidStatViewServlet() {
        ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean();
        servletRegistrationBean.setName("druidViewServlet");
        servletRegistrationBean.setServlet(new StatViewServlet());
        List<String> mappings = new ArrayList<>();
        mappings.add("/druid/*");
        servletRegistrationBean.setUrlMappings(mappings);
        Map<String, String> initParams = new HashMap<>();
        initParams.put("loginUsername", "sweet");
        initParams.put("loginPassword", "sweet123@!@#");
        servletRegistrationBean.setInitParameters(initParams);
        return servletRegistrationBean;
    }
}
