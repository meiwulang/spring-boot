package cn.evun.sweet.framework.core.mvc.freemarker;

/**
 * Created by zlbbq on 2017/3/27.
 */


import freemarker.cache.TemplateLoader;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;

public class SweetSpringTemplateLoader implements TemplateLoader {
    private static final Logger logger = LoggerFactory.getLogger(SweetSpringTemplateLoader.class);

    private static final String HTML_ESCAPE_PREFIX = "<#escape x as x?html>";

    private static final String HTML_ESCAPE_SUFFIX = "</#escape>";

    private PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver;

    private String templatePath;

    private boolean autoEscapeEnabled;

    public SweetSpringTemplateLoader(String templatePath, boolean autoEscapeEnabled) {
        this.autoEscapeEnabled = autoEscapeEnabled;
        this.pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
        this.setTemplatePath(templatePath);
    }

    private void setTemplatePath(String templatePath) {
        if (!templatePath.endsWith("/")) {
            templatePath += "/";
        }
        this.templatePath = templatePath;
    }

    @Override
    public Object findTemplateSource(String name) throws IOException {
        Resource[] resources = this.pathMatchingResourcePatternResolver.getResources(this.templatePath + name);
        if (resources.length == 1) {
            return resources[0];
        } else if (resources.length > 1) {
            logger.warn("FreeMarker template file name conflict");
        }
        return null;
    }

    @Override
    public Reader getReader(Object templateSource, String encoding) throws IOException {
        Resource resource = (Resource) templateSource;
        try {
            Reader reader = new InputStreamReader(resource.getInputStream(), encoding);
            return this.getAutoEscapeReader(reader);
        } catch (IOException ex) {
            logger.debug("Could not find FreeMarker template: " + resource);
            throw ex;
        }
    }

    @Override
    public long getLastModified(Object templateSource) {
        Resource resource = (Resource) templateSource;
        try {
            return resource.lastModified();
        } catch (IOException ex) {
            logger.debug("Could not obtain last-modified timestamp for FreeMarker template in " +
                    resource + ": " + ex);
            return -1;
        }
    }

    @Override
    public void closeTemplateSource(Object templateSource) throws IOException {
    }

    protected Reader getAutoEscapeReader(Reader reader) throws IOException {
        if (!this.autoEscapeEnabled) {
            return reader;
        }

        String templateText = IOUtils.toString(reader);
        reader.close();
        return new StringReader(HTML_ESCAPE_PREFIX + templateText + HTML_ESCAPE_SUFFIX);
    }
}
