package cn.evun.sweet.framework.common.datastructure.generic.convert;

import cn.evun.sweet.framework.common.datastructure.generic.CollectGenericObject;
import cn.evun.sweet.framework.common.datastructure.generic.GenericObject;

import java.lang.reflect.Array;
import java.util.Collection;

/**
 * 集合及数组数据类型转换器。
 * 
 * @author yangw
 * @since V1.0.0
 */
public class CollectConverter implements GenericObjectConverter {

	@Override
	public boolean isSupportsType(Object source) {
		if (source.getClass().isArray() || Collection.class.isAssignableFrom(source.getClass())) {
			return true;
		}
		return false;
	}

	@Override
	public GenericObject convertObject(Object object) {
		GenericObject obj = null;
		if(object.getClass().isArray()){  
        	obj = new CollectGenericObject();
        	for(int i = 0; i < Array.getLength(object); i++){
        		obj.addComponent(GenericObjectConverterSupport.convert(Array.get(object, i)));
        	}    	
        }
		
		if(Collection.class.isAssignableFrom(object.getClass())){
        	Collection<?> objColl = (Collection<?>)object;
        	obj = new CollectGenericObject();
        	for(Object component : objColl){
        		obj.addComponent(GenericObjectConverterSupport.convert(component));
        	}        	
        }
		return obj;
	}

}
