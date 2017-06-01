package cn.evun.sweet.framework.core.spring;

/**
 * Created by zlbbq on 2017/3/9.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.util.Assert;

public class DelegateBean implements ApplicationContextAware {
    private static final Logger logger = LoggerFactory.getLogger(DelegateBean.class);

    protected ApplicationContext applicationContext;

    protected Object target;

    protected String targetBeanName;

    protected Class targetBeanType;

    public DelegateBean(String targetBeanName) {
        this.targetBeanName = targetBeanName;
    }

    public DelegateBean(Class targetBeanType) {
        this.targetBeanType = targetBeanType;
    }

    public DelegateBean(ApplicationContext applicationContext, String targetBeanName) {
        this.applicationContext = applicationContext;
        this.targetBeanName = targetBeanName;
    }

    public DelegateBean(ApplicationContext applicationContext, Class targetBeanType) {
        this.applicationContext = applicationContext;
        this.targetBeanType = targetBeanType;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public Object target() {
        Assert.notNull(this.applicationContext, "A DelegateBean should be managed by ApplicationContext or pass ApplicationContext though constructor arg");
        if (this.target == null) {
            synchronized (this) {
                if (this.target != null) {
                    return this.target;
                }

                return this.target = this.doGetBeanFromApplicationContext();
            }
        }
        return this.target;
    }

    protected Object doGetBeanFromApplicationContext() {
        if (this.targetBeanName != null) {
            return this.applicationContext.getBean(this.targetBeanName);
        }

        if (this.targetBeanType != null) {
            return this.applicationContext.getBean(this.targetBeanType);
        }

        return null;    //never happen
    }
}
