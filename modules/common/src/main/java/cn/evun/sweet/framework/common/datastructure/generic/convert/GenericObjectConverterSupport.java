package cn.evun.sweet.framework.common.datastructure.generic.convert;

import cn.evun.sweet.framework.common.datastructure.generic.GenericObject;

import java.util.LinkedList;
import java.util.List;

/**
 * 通过寻求匹配的转换器，实现java数据结构到GenericData的转换。<br/> 
 * 
 * @author yangw
 * @since V1.0.0
 */
public class GenericObjectConverterSupport{
	
	private static class SingletonHolder {  
	    private static final GenericObjectConverterSupport INSTANCE = new GenericObjectConverterSupport();  
	}  
	     
	public static final GenericObjectConverterSupport getInstance() {  
	    return SingletonHolder.INSTANCE;  
	}  
	
	public static GenericObject convert(Object source){
		return GenericObjectConverterSupport.getInstance().convertObject(source);
	}
	    
	/**用户自定义的转化方案*/	
	private List<GenericObjectConverter> customContextDataConverter;
	
	/**转化方案集合*/
	private GenericObjectConverterComposite contextDataConverter;
	
	/**创建使用默认转换器的对象*/
	private GenericObjectConverterSupport(){
		setContextDataConverters(getDefaultConverters());
	}
	
	public final void setCustomContextDataConverter(List<GenericObjectConverter> converters){
		this.customContextDataConverter = converters;
		//如果有自定义的转化方案
		if(this.customContextDataConverter != null){		
			this.contextDataConverter.addConverters(this.customContextDataConverter);		
		}
	}
	
	public final List<GenericObjectConverter> getCustomContextDataConverter(){
		return this.customContextDataConverter;
	}

	public void setContextDataConverters(List<GenericObjectConverter> converters) {
		if(converters == null){
			this.contextDataConverter = null;
		}else {
			this.contextDataConverter = new GenericObjectConverterComposite();
			this.contextDataConverter.addConverters(converters);
		}
	}
	
	public GenericObject convertObject(Object source){
		return this.contextDataConverter.convertObject(source);
	}
	
	private List<GenericObjectConverter> getDefaultConverters(){
		List<GenericObjectConverter> defaultConverters = new LinkedList<GenericObjectConverter>();
		//defaultConverters.add(new HttpRequestConverter());//直接在渠道解析时使用
		defaultConverters.add(new MapConverter());
		defaultConverters.add(new CollectConverter());
		defaultConverters.add(new DateConverter());
		defaultConverters.add(new PrimitiveConverter());
		return defaultConverters;
	}

}
