package cn.evun.sweet.framework.auth;

/**
 * Created by zlbbq on 2017/3/16.
 */
public enum WorkMode {
    URL, ANNOTATION, MIXED;

    public static WorkMode parse(String workMode) {
        if("ANNOTATION".equalsIgnoreCase(workMode)) {
            return ANNOTATION;
        }
        else if("URL".equalsIgnoreCase(workMode)) {
            return URL;
        }
        else if("MIXED".equalsIgnoreCase(workMode)) {
            return MIXED;
        }
        throw new IllegalArgumentException("错误的权限工作模式, 只支持URL/ANNOTATION/MIXED");
    }

    public boolean isURLMode() {
        return this.equals(URL);
    }

    public boolean isAnnotationMode() {
        return this.equals(ANNOTATION);
    }

    public boolean isMixedMode() {
        return this.equals(MIXED);
    }
}
