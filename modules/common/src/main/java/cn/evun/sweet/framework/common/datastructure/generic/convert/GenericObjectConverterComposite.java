package cn.evun.sweet.framework.common.datastructure.generic.convert;

import cn.evun.sweet.framework.common.datastructure.generic.GenericObject;
import cn.evun.sweet.framework.common.util.collection.CollectionUtils;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * ContextData到java数据结构转换过程的实现。
 * 
 * @author yangw
 * @since V1.0.0
 */
public class GenericObjectConverterComposite implements GenericObjectConverter{
	
	private final List<GenericObjectConverter> converters = new LinkedList<GenericObjectConverter>();

	@Override
	public boolean isSupportsType(Object source) {
		return !CollectionUtils.isEmpty(getSupportConverters(source));
	}
	
	private List<GenericObjectConverter> getSupportConverters(Object source) {
		List<GenericObjectConverter> result = new LinkedList<GenericObjectConverter>();
		for(GenericObjectConverter converter : this.converters){
			if(converter.isSupportsType(source)){
				result.add(converter);
			}
		}
		return result;
	}
	
	@Override
	public GenericObject convertObject(Object source) {
		if(source == null){
			return null;
		}
		GenericObject result = null;
		for(GenericObjectConverter handler : getSupportConverters(source)){
			result = handler.convertObject(source);
			if(result != null) return result;
		}
		return new JavaBeanConverter().convertObject(source);
	}
	
	public List<GenericObjectConverter> getConverters() {
		return Collections.unmodifiableList(this.converters);
	}
	
	public GenericObjectConverterComposite addConverter(GenericObjectConverter converter){
		this.converters.add(0,converter);
		return this;
	}
	
	public GenericObjectConverterComposite addConverters(List<GenericObjectConverter> converters){
		if(this.converters != null){
			for(GenericObjectConverter converter : converters){
				this.converters.add(0,converter);//倒序排列
			}
		}
		return this;
	}
}
