package cn.evun.sweet.framework.core.mvc;

/**
 * Created by zlbbq on 2017/3/15.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Enumeration;
import java.util.Locale;
import java.util.Properties;
import java.util.Set;

public class ErrorTable {
    private static final Logger logger = LoggerFactory.getLogger(ErrorTable.class);

    private final static PathMatchingResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();

    private static Properties DEFAULT_ERROR_MESSAGES = new Properties();

    private static final String DEFAULT_LOCAL = "zh_CN";

    private final static Properties messages = new Properties();

    static {
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.SUCCESS, "API调用成功");
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.FAIL, "API调用失败");
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.VALIDATION_FAIL, "请求参数验证失败");
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.BAD_PARAMETER, "拒绝访问, 请求参数错误");
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.UNAUTHORIZED, "拒绝访问, 您没有权限请求该资源");
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.NOT_INITIALIZED, "返回值未初始化");
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.USER_NOT_LOGIN, "用户未登录");
        DEFAULT_ERROR_MESSAGES.setProperty(APIResponse.RPC_FAIL, "远程调用失败【{0}】");
    }

    public static void init(String i18nBaseNames, String sLocale) throws IOException {
        if (!StringUtils.hasText(sLocale)) {
            sLocale = DEFAULT_LOCAL;
        }
        String[] resourceNames = i18nBaseNames.split(",");
        for (String resourceName : resourceNames) {
            Resource[] resources = resourcePatternResolver.getResources(resourceName + "*_" + sLocale + ".properties");
            Properties properties = new Properties();
            for (Resource resource : resources) {
                String resourcePath;
                URL path = resource.getURL();
                if (path == null) {
                    resourcePath = resource.getFilename();
                } else {
                    resourcePath = path.getPath();
                }
                logger.info("Loading APIResponse i18n source(ONLY support 'UTF-8' file encoding) => " + resourcePath);
                InputStreamReader reader = null;
                try {
                    properties.load(new InputStreamReader(resource.getInputStream(), "utf-8"));
                    Set<String> keys = properties.stringPropertyNames();
                    for (String key : keys) {
                        if (messages.containsKey(key)) {
                            logger.warn("duplicated APIResponse message key => " + key);
                        }
                        messages.setProperty(key, properties.getProperty(key));
                    }
                }catch (IOException e) {
                    throw e;
                }
                finally {
                    if(reader != null) {
                        try {
                            reader.close();
                        }catch(Exception e) {
                            ; // handled
                        }
                    }
                }
            }
        }
    }

    public static String convertCode2LocaleMessage(String strCode) {
        String message = messages.getProperty(strCode);
        if (message == null) {
            message = DEFAULT_ERROR_MESSAGES.getProperty(strCode);
        }
        if(!StringUtils.hasText(message)) {
            message = strCode;
        }
        return message;
    }

    @Deprecated
    public String convertCode2LocaleMessage(String strCode, Locale locale) {
        return convertCode2LocaleMessage(strCode);
    }

    public static Properties getErrors() {
        Properties ret = (Properties)messages.clone();
        return mergeProperties(ret, DEFAULT_ERROR_MESSAGES);
    }

    private static Properties mergeProperties(Properties src, Properties overwrite) {
        Properties ret = new Properties();
        if (src != null) {
            Enumeration keyEnum = src.keys();
            while (keyEnum.hasMoreElements()) {
                String key = keyEnum.nextElement().toString();
                ret.put(key, src.getProperty(key));
            }
        }

        if (overwrite != null) {
            Enumeration keyEnum = overwrite.keys();
            while (keyEnum.hasMoreElements()) {
                String key = keyEnum.nextElement().toString();
                if (!ret.containsKey(key)) {
                    ret.put(key, overwrite.getProperty(key));
                }
            }
        }

        return ret;
    }
}
