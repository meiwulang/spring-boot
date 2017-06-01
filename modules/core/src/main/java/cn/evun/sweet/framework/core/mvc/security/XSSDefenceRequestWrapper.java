package cn.evun.sweet.framework.core.mvc.security;

/**
 * Created by zlbbq on 16/6/12.
 */


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.regex.Pattern;

public class XSSDefenceRequestWrapper extends HttpServletRequestWrapper {
//    private static final Logger logger = LoggerFactory.getLogger(XSSDefenceRequestWrapper.class);

    public XSSDefenceRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    public String[] getParameterValues(String parameter) {
        String[] values = super.getParameterValues(parameter);
        if (values == null) {
            return null;
        }
        int count = values.length;
        String[] encodedValues = new String[count];
        for (int i = 0; i < count; i++) {
            encodedValues[i] = cleanXSS(values[i]);
        }
        return encodedValues;
    }

    public String getParameter(String parameter) {
        String value = super.getParameter(parameter);
        if (value == null) {
            return null;
        }
        return cleanXSS(value);
    }

    public String getHeader(String name) {
        String value = super.getHeader(name);
        if (value == null)
            return null;
        return cleanXSS(value);
    }

//    private String cleanXSS(String value) {
//        value = StringEscapeUtils.escapeHtml(value);
//        value = StringEscapeUtils.escapeJavaScript(value);
//        return value;
//    }

//    private String cleanXSS(String value) {
////        value = StringEscapeUtils.escapeHtml(value);
////        value = StringEscapeUtils.escapeJavaScript(value);
////        value = StringEscapeUtils.escapeSql(value);
//
//
//        value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
//        value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
//        value = value.replaceAll("'", "&#39;");
//        value = value.replaceAll("eval\\((.*)\\)", "");
//        value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
//        value = value.replaceAll("script", "");
//        return value;
//    }

    private String cleanXSS(String value) {
        if(value !=null){
            // NOTE: It's highly recommended to use the ESAPI library and uncomment the following line to
            // avoid encoded attacks.
            // value = ESAPI.encoder().canonicalize(value);
            // Avoid null characters
            value = value.replaceAll("","");
            // Avoid anything between script tags
            Pattern scriptPattern =Pattern.compile("(.*?)",Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid anything in a src="http://www.yihaomen.com/article/java/..." type of e­xpression
            scriptPattern =Pattern.compile("src[\r\n]*=[\r\n]*\\\'(.*?)\\\'",Pattern.CASE_INSENSITIVE |Pattern.MULTILINE |Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern =Pattern.compile("src[\r\n]*=[\r\n]*\\\"(.*?)\\\"",Pattern.CASE_INSENSITIVE |Pattern.MULTILINE |Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Remove any lonesome  tag
            scriptPattern =Pattern.compile("",Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Remove any lonesome  tag
            scriptPattern =Pattern.compile("",Pattern.CASE_INSENSITIVE |Pattern.MULTILINE |Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid eval(...) e­xpressions
            scriptPattern =Pattern.compile("eval\\((.*?)\\)",Pattern.CASE_INSENSITIVE |Pattern.MULTILINE |Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid e­xpression(...) e­xpressions
            scriptPattern =Pattern.compile("e­xpression\\((.*?)\\)",Pattern.CASE_INSENSITIVE |Pattern.MULTILINE |Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid javascript:... e­xpressions
            scriptPattern =Pattern.compile("javascript:",Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid vbscript:... e­xpressions
            scriptPattern =Pattern.compile("vbscript:",Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid onload= e­xpressions
            scriptPattern =Pattern.compile("onload(.*?)=",Pattern.CASE_INSENSITIVE |Pattern.MULTILINE |Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
        }
        return value;
    }
}
