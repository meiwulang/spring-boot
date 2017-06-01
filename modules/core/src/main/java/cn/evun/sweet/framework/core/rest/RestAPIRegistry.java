package cn.evun.sweet.framework.core.rest;

/**
 * Created by zlbbq on 16/6/23.
 */


import cn.evun.sweet.framework.common.util.Assert;
import cn.evun.sweet.framework.core.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

@Deprecated
public class RestAPIRegistry {
    private static final Logger logger = LoggerFactory.getLogger(RestAPIRegistry.class);

    protected String group;

    protected String urlPrefix;

    protected Properties apis = new Properties();

    public RestAPIRegistry(String group, String urlPrefix) {
        Assert.notNull(group, "Rest API group should not be null");
        Assert.notNull(urlPrefix, "Rest API urlPrefix should not be null");
        this.group = group;
        this.urlPrefix = urlPrefix;
    }

    public void register(String name, String uri) {
        this.apis.setProperty(name, uri);
    }

    public String findAPI(String name) {
        String uri = apis.getProperty(name);
        if(uri == null) {
            throw new RestAPINotFoundException(this.group, name);
        }
        String url = this.urlPrefix + "/" + uri;
        url = url.replaceAll("//", "/");
        return url;
    }

    public String getGroup() {
        return this.group;
    }

    public String getUrlPrefix() {
        return this.urlPrefix;
    }

    // resourcePathPattern 可以是通配符
    public void loadFromResource(String resourcePathPattern) throws IOException {
        this.apis.clear();
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources(resourcePathPattern);
        for (Resource resource : resources) {
            if (resource.isReadable()) {
                InputStream is = resource.getInputStream();
                Properties props = new Properties();
                props.load(is);
                Iterator<Object> iterator = props.keySet().iterator();
                while (iterator.hasNext()) {
                    String key = (String)iterator.next();
                    String value = props.getProperty(key);
                    value = new String(value.getBytes(Constants.Charsets.CONFIG_ITEM_CHARSET), Constants.Charsets.APPLICATION_CHARSET);
                    this.register(key, value);
                }
            }
        }
    }

    public Set<String> getAPINames() {
        return this.apis.stringPropertyNames();
    }

    public void list(PrintWriter pw) {
        this.apis.list(pw);
    }

    public void list() {
        PrintWriter pw = null;
        StringWriter sw = new StringWriter();
        try {
            new PrintWriter(sw);
            this.apis.list(pw);
            logger.info(sw.toString());
        }catch(Exception e){
            logger.error(e.getMessage(), e);
        }
        finally {
            if(pw != null) {
                pw.close();
            }
        }
    }
}
