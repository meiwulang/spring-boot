package cn.evun.sweet.framework.common.datastructure.generic.convert;

import cn.evun.sweet.framework.common.datastructure.generic.GenericObject;

/**
 * 定义ContextData与java数据结构的转换功能接口。
 * 
 * @author yangw
 * @since V1.0.0
 */
public interface GenericObjectConverter {

	boolean isSupportsType(Object source);
	
	GenericObject convertObject(Object source);
	
}
