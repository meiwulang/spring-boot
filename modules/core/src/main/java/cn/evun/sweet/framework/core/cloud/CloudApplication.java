package cn.evun.sweet.framework.core.cloud;

/**
 * Created by zlbbq on 2016/12/5.
 */


import cn.evun.sweet.framework.core.ApplicationInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.MessageFormat;
import java.util.*;

public final class CloudApplication extends ApplicationInfo {
    private static final Logger logger = LoggerFactory.getLogger(CloudApplication.class);

    private Layer layer;

    private State state;

    @JsonIgnore
    private String cloudJointUrl;

    @JsonIgnore
    private String cloudTicket;

    @JsonIgnore
    private CloudClient cloudClient;

    @JsonIgnore
    private static final CloudApplication cloudInstance = new CloudApplication();

    @JsonIgnore
    private List<CloudServiceReference> cloudServiceReferences;

    //服务状态
    public enum State {
        Starting/**表示应用实例正在启动, 不接受请求*/
        ,
        Running/**表示应用实例处于运行状态, 不接受请求*/
        ,
        HangingUp/**表示应用实例处于挂起状态, 不接受请求*/
        ,
        Halt/**表示应用实例处于停机状态, 此状态为虚拟状态, 使用Zookeeper的临时ZNode管理*/
    }

    //服务分层
    public enum Layer {
        Kernel/**核心服务层*/
        ,
        Business/**业务服务层*/
        ,
        Integration/**整合层*/
        ,
        Portal/**服务入口, 通常指前端*/
        ;

        static Map<String, Layer> map = new HashMap();

        static {
            map.put("Kernel", Kernel);
            map.put("Business", Business);
            map.put("Integration", Integration);
            map.put("Portal", Portal);
        }

        public static Layer fromString(String s) {
            return map.get(s);
        }
    }

    public static CloudApplication getInstance() {
        if (ApplicationInfo.instance == null) {
            ApplicationInfo.instance = cloudInstance;
        }

        return cloudInstance;
    }

    private CloudApplication() {
        cloudServiceReferences = new ArrayList<>();
    }

    public void connect2Cloud() {
        this.cloudClient = new CloudClient(this);
        this.cloudClient.connect();
    }

    public Properties loadApplicationConfiguration() {
        return this.cloudClient.getApplicationConfiguration();
    }

    @JsonIgnore
    public String getCloudGatewayPattern() {
        return this.cloudClient.getCloudGatewayUrl();
    }

    public String getApplicationGatewayRealUrl(String name) {
        return this.getCloudGatewayPattern().replaceAll("\\$\\{appName\\}", name);
    }

    public String toString() {
        String pattern = "[ host={0}, port={1}, name={2}, id={3}, version={4}, sweet-version={5}, cloud-joint={6}, context-path={7} ]";
        String data[] = {this.appHost, String.valueOf(this.appPort), this.appName, this.appId, this.appVersion, this.sweetFrameworkVersion, this.cloudJointUrl, this.appContextPath};
        return MessageFormat.format(pattern, data);
    }

    public String toString(boolean simple) {
        if (!simple) {
            return toString();
        }
        String pattern = "[ host={0}, port={1}, name={2}, id={3}, version={4}, sweet-version={5}, cloud-joint={6}, context-path={7} ]";
        String data[] = {this.appHost, String.valueOf(this.appPort), this.appName, this.appId, this.appVersion, this.sweetFrameworkVersion, this.cloudJointUrl, this.appContextPath};
        return MessageFormat.format(pattern, data);
    }

    public String getCloudJointUrl() {
        return cloudJointUrl;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public void setCloudJointUrl(String cloudJointUrl) {
        this.cloudJointUrl = cloudJointUrl;
    }

    public String getCloudTicket() {
        return cloudTicket;
    }

    public void setCloudTicket(String cloudTicket) {
        this.cloudTicket = cloudTicket;
    }

    public CloudClient getCloudClient() {
        return this.cloudClient;
    }

    public List<CloudServiceReference> getCloudServiceReferences() {
        return cloudServiceReferences;
    }

    public void setCloudServiceReferences(List<CloudServiceReference> cloudServiceReferences) {
        this.cloudServiceReferences = cloudServiceReferences;
    }

    public void addCloudServiceReference(String serviceName, String serviceVersion) {
        this.cloudServiceReferences.add(new CloudServiceReference(serviceName, serviceVersion));
    }

    public Layer getLayer() {
        return layer;
    }

    public void setLayer(Layer layer) {
        this.layer = layer;
    }
}
