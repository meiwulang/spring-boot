package cn.evun.sweet.framework.core.configuration;

/**
 * Created by zlbbq on 16/6/16.
 */


import cn.evun.sweet.framework.common.util.reflect.ClassUtils;
import cn.evun.sweet.framework.core.ApplicationInfo;
import cn.evun.sweet.framework.core.mvc.doc.AdditionalResolvedModelTypeConverter;
import com.fasterxml.classmate.ResolvedType;
import com.fasterxml.classmate.TypeResolver;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;

import static springfox.documentation.builders.PathSelectors.regex;

public class SwaggerDocketFactory implements FactoryBean<Docket> {
//    private static final Logger logger = LoggerFactory.getLogger(SwaggerDocketFactory.class);

    private String groupName;

    private String pathRegex;

    @Value("${sweet.framework.core.http.restful.doc.swagger.title:}")
    private String title;

    @Value("${sweet.framework.core.http.restful.doc.swagger.description:RESTFUL API Documentation}")
    private String description;

    @Value("${sweet.framework.core.http.restful.doc.swagger.termsOfServiceUrl:http://swagger.io/terms/}")
    private String termsOfServiceUrl;

    @Value("${sweet.framework.core.http.restful.doc.swagger.contract:sweet-group@geely.com}")
    private String contract;

    @Value("${sweet.framework.core.http.restful.doc.swagger.license:Apache 2.0}")
    private String license;

    @Value("${sweet.framework.core.http.restful.doc.swagger.licenseUrl:http://www.apache.org/licenses/LICENSE-2.0}")
    private String licenseUrl;

    @Value("${sweet.framework.core.http.restful.doc.modelPackages:cn.evun.sweet.framework.core.mvc.sample.model}")
    private String modelPackages;

    @Autowired
    private ApplicationInfo applicationInfo;

    @Autowired
    private TypeResolver typeResolver;

    @Autowired(required = false)
    private AdditionalResolvedModelTypeConverter additionalResolvedModelTypeConverter;

    public SwaggerDocketFactory(String groupName, String pathRegex) {
        this.groupName = groupName;
        this.pathRegex = pathRegex;
    }

    @Override
    public Docket getObject() throws Exception {
        Docket swaggerSpringMvcPlugin = new Docket(DocumentationType.SWAGGER_2)
                .groupName(this.groupName)
                .apiInfo(apiInfo())
                .genericModelSubstitutes(ResponseEntity.class)
                .select()
                .paths(regex(this.pathRegex)) // and by paths
                .build();
        List<ResolvedType> additionalModelTypes = this.findAdditionalModels();
        for (ResolvedType type : additionalModelTypes) {
            if(this.additionalResolvedModelTypeConverter != null) {
                type = this.additionalResolvedModelTypeConverter.convert(type);
            }
            swaggerSpringMvcPlugin.additionalModels(type);
        }
        return swaggerSpringMvcPlugin;
    }

    private List<ResolvedType> findAdditionalModels() throws Exception {
        List<ResolvedType> resolvedTypes = new ArrayList<>();
        String[] packages = this.modelPackages.split(",");
        for (String basePackage : packages) {
            if (StringUtils.hasText(basePackage)) {
                this.getPackageClasses(basePackage, resolvedTypes);
            }
        }
        return resolvedTypes;
    }

    private void getPackageClasses(String basePackage, List<ResolvedType> result) throws Exception {
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        String ex = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + ClassUtils.convertClassNameToResourcePath(basePackage) + "/**/*.class";
        Resource[] resources = resolver.getResources(ex);
        for (Resource resource : resources) {
            if (resource.isReadable()) {
                String className = ClassUtils.convertResourcePathToClassName(resource.getURI().toString());
                int index = className.indexOf(basePackage);
                className = className.substring(index);
                className = className.substring(0, className.length() - 6);
                Class clazz = Class.forName(className);
                result.add(this.typeResolver.resolve(clazz));
            }
        }
    }

    @Override
    public Class<?> getObjectType() {
        return Docket.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getPathRegex() {
        return pathRegex;
    }

    public void setPathRegex(String pathRegex) {
        this.pathRegex = pathRegex;
    }

    private ApiInfo apiInfo() {
        String docTitle = applicationInfo.getAppName() + " [" + groupName + "] Restful接口在线文档";
        if(StringUtils.hasText(title)) {
            docTitle = title.replaceAll("\\$groupName", groupName);
        }

        return new ApiInfo(
                docTitle,
                description,
                applicationInfo.getAppVersion(),
                termsOfServiceUrl,
                contract,
                license,
                licenseUrl
        );
    }
}
