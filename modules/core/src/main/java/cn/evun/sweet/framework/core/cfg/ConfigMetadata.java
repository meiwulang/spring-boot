package cn.evun.sweet.framework.core.cfg;

/**
 * Created by zlbbq on 2016/11/30.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class ConfigMetadata {
    private static final Logger logger = LoggerFactory.getLogger(ConfigMetadata.class);

    private String group;

    private List<ConfigItem> items;

    public ConfigMetadata() {
        this("其他配置");
    }

    public ConfigMetadata(String group) {
        this.group = group;
        this.items = new ArrayList<>();
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public List<ConfigItem> getItems() {
        return items;
    }

    public void setItems(List<ConfigItem> items) {
        this.items = items;
    }

    public void addItem(ConfigItem configItem) {
        this.items.add(configItem);
    }

    public Properties exportDefaults() {
        Properties properties = new Properties();
        for(ConfigItem item : this.items) {
            if(item.getDefaultValue() != null) {
                properties.put(item.getKey(), item.getDefaultValue());
            }
        }
        return properties;
    }
}
