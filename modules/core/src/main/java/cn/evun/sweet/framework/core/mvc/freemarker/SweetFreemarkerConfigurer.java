package cn.evun.sweet.framework.core.mvc.freemarker;

/**
 * Created by zlbbq on 2017/3/27.
 */


import freemarker.cache.TemplateLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.util.List;

public class SweetFreemarkerConfigurer extends FreeMarkerConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(SweetFreemarkerConfigurer.class);

    private String templateLoaderPath;

    private boolean autoEscapeEnabled;

    public SweetFreemarkerConfigurer(String templateLoaderPath, boolean autoEscapeEnabled) {
        this.templateLoaderPath = templateLoaderPath;
        this.autoEscapeEnabled = autoEscapeEnabled;
    }

    @Override
    protected void postProcessTemplateLoaders(List<TemplateLoader> templateLoaders) {
        templateLoaders.add(new SweetSpringTemplateLoader(this.templateLoaderPath, this.autoEscapeEnabled));
        super.postProcessTemplateLoaders(templateLoaders);
    }

    public boolean isAutoEscapeEnabled() {
        return autoEscapeEnabled;
    }

    public void setAutoEscapeEnabled(boolean autoEscapeEnabled) {
        this.autoEscapeEnabled = autoEscapeEnabled;
    }

    public String getTemplateLoaderPath() {
        return templateLoaderPath;
    }

    @Override
    public void setTemplateLoaderPath(String templateLoaderPath) {
        this.templateLoaderPath = templateLoaderPath;
    }
}
