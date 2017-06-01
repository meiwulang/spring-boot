package cn.evun.sweet.framework.core.cfg;

/**
 * Created by zlbbq on 2016/11/30.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigItem {
    private static final Logger logger = LoggerFactory.getLogger(ConfigItem.class);

    public static final String VALUE_TYPE_STRING = "string";

    public static final String VALUE_TYPE_NUMBER = "number";

    public static final String VALUE_TYPE_BOOLEAN = "boolean";

    public static final String VALUE_TYPE_ENUM = "enum";

    private String key;

    private String name;

    private String type;

    private String[] candidateValues;

    private String defaultValue;

    private String description;

    public ConfigItem() {
    }

    public ConfigItem(String key, String name, String defaultValue) {
        this.setKey(key);
        this.setName(name);
        this.setType(VALUE_TYPE_STRING);
        this.setCandidateValues(null);
        this.setDefaultValue(defaultValue);
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getCandidateValues() {
        return candidateValues;
    }

    public void setCandidateValues(String[] candidateValues) {
        this.candidateValues = candidateValues;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }
}
