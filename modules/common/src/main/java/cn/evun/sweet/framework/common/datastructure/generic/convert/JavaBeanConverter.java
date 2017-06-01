package cn.evun.sweet.framework.common.datastructure.generic.convert;

import cn.evun.sweet.framework.common.datastructure.generic.GenericObject;
import cn.evun.sweet.framework.common.datastructure.generic.SingleGenericObject;
import org.apache.commons.beanutils.PropertyUtils;

import java.util.Map;

/**
 * POJO数据类型转换器。该转化器由组合器在最后调用
 * 
 * @author yangw
 * @since V1.0.0
 */
public class JavaBeanConverter implements GenericObjectConverter {

	@Override
	public boolean isSupportsType(Object source) {
		return true;
	}

	@Override
	public GenericObject convertObject(Object object) {
		GenericObject obj = new SingleGenericObject();//PropertyAccessorUtils		
		/*BeanWrapperImpl wrapper = new BeanWrapperImpl(object);
    	for(PropertyDescriptor prop : wrapper.getPropertyDescriptors()){//遍历所有可读属性（getXXX）
    		if("class".equals(prop.getName()))
    			continue;
    		obj.setProperty(prop.getName(), wrapper.getPropertyValue(prop.getName()));
    	}*/		
		try{
			Map<String, Object> prop = PropertyUtils.describe(object);//根据所有的pulic的getXXX方法，解析获得属性名XXX
			for(Map.Entry<String, Object> entry : prop.entrySet()){				
				obj.setProperty(entry.getKey(), entry.getValue());
			}	    	
		} catch (Exception e) {
			throw new RuntimeException("exception in convert object["+object+"] to GenericObject", e);
		}
		return obj;
	}
}
