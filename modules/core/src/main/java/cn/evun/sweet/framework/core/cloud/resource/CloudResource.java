package cn.evun.sweet.framework.core.cloud.resource;

/**
 * Created by zlbbq on 2016/11/28.
 */


import cn.evun.sweet.framework.core.cloud.CloudException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.MessageFormat;

public class CloudResource {
    private static final Logger logger = LoggerFactory.getLogger(CloudResource.class);

    private Type type;

    private Scope scope;

    private String name;

    private String uri;

    private String requestMethod;

    public enum Type {
        Controller, RestController, Unknown
    }

    public enum Scope {
        Global/** 云共享资源 */
        , Group /** 组内资源, 其他组不能使用 */
    }

    public CloudResource(Type type, String scope, String name, String uri, String requestMethod) {
        this.type = type;
        this.scope = convertScope(scope);
        this.name = name;
        this.uri = uri;
        this.requestMethod = requestMethod;
    }

    private Scope convertScope(String scope) {
        if (scope.equalsIgnoreCase(Scope.Global.name())) {
            return Scope.Global;
        } else if (scope.equalsIgnoreCase(Scope.Group.name())) {
            return Scope.Group;
        } else {
            throw new CloudException("错误的云资源范围[" + scope + "]");
        }
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getRequestMethod() {
        return requestMethod;
    }

    public void setRequestMethod(String requestMethod) {
        this.requestMethod = requestMethod;
    }

    public Scope getScope() {
        return scope;
    }

    public void setScope(Scope scope) {
        this.scope = scope;
    }

    public String toString() {
        String pattern = "[ type={0}, name={1}, uri={2}, method={3}]";
        String data[] = {this.type.name(), this.name, this.uri, this.requestMethod};
        return MessageFormat.format(pattern, data);
    }
}
