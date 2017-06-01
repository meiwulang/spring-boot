package cn.evun.sweet.framework.common.datastructure.generic;

import cn.evun.sweet.framework.common.datastructure.generic.convert.GenericObjectConverterSupport;

import java.util.*;

/**   
 * Bean或基础数据的数据结构的抽象。<br/>
 * <p>注意：该对象操作是线程不安全的，在实际业务处理时，需要考虑线程安全问题。
 * 
 * @author yangw   
 * @since V1.0.0   
 */
public class SingleGenericObject implements GenericObject{
	
	private final Map<String, GenericObject> sourceObj = new HashMap<String, GenericObject>(50);

	private String sourceValue = null;
	
	private GenericDataType type = GenericDataType.OBJECT;
	
	/**
	 * 创建一个没有任何内容的对象
	 */
	public SingleGenericObject() {
	}
	
	/**
	 * 创建一个提供了初始化内容的对象
	 */
	public SingleGenericObject(Map<String, SingleGenericObject> obj) {
		this.sourceObj.putAll(obj);
	} 
	
	/**
	 * 创建一个String类型的值对象
	 */
	public SingleGenericObject(String value) {
		this.sourceValue = value;
		this.type = GenericDataType.VALUE;
	} 

	/*******************************************************************************************************/
	
	@Override
	public boolean isValueObject(){
		return GenericDataType.VALUE == this.type;
	}
	
	@Override
	public String getValue(){
		if(isValueObject()){
			return this.sourceValue;
		}else {
			return null;
		}
		
	}
	
	@Override
	public void setValue(String objValue){
		if(isValueObject()){
			this.sourceValue = objValue;
		}
	}
	
	/*******************************************************************************************************/	
	
	@Override
	public GenericObject getProperty(String propertyName) {
		if(isObject()){
			return this.sourceObj.get(propertyName);
		}
		return null;
	}
	
	@Override
	public void setProperty(String propertyName, Object perpertyValue){
		setProperty(propertyName, GenericObjectConverterSupport.convert(perpertyValue));
	}
	
	@Override
	public void setProperty(String propertyName, GenericObject perpertyValue){
		if(isObject()){
			this.sourceObj.put(propertyName, perpertyValue);
		}
	}

	@Override
	public Set<String> getAllPropertyNames(){
		if(isObject()){
			return this.sourceObj.keySet();
		}
		return Collections.emptySet();
	}
	
	@Override
	public GenericObject getComponentByIndex(int index) {
		return (isObject()&&index==0) ? this : null;
	}

	@Override
	public List<GenericObject> getAllComponents() {
		if(isObject()){
			List<GenericObject> result = new ArrayList<GenericObject>();
			result.add(this);
			return result;
		}
		return null;
	}

	@Override
	public void addComponent(GenericObject component) {		
	}

	@Override
	public void delComponent(GenericObject component) {		
	}

	@Override
	public void delComponent(int index) {	
	}
	
	@Override
	public boolean isCompositeObject() {
		return false;
	}

	@Override
	public boolean isObject() {
		return !isValueObject();
	}	
	
	@Override
	public GenericDataType getType(){
		return this.type;
	}
	
	/*******************************************************************************************************/
	
	public static SingleGenericObject valueOf(String value){
		return new SingleGenericObject(value);
	}
	
	public static SingleGenericObject valueOf(int value){
		return new SingleGenericObject(String.valueOf(value));
	}
	
	public static SingleGenericObject valueOf(boolean value){
		return new SingleGenericObject(String.valueOf(value));
	}
	
	public static SingleGenericObject valueOf(long value){
		return new SingleGenericObject(String.valueOf(value));
	}
	
	public static SingleGenericObject valueOf(char value){
		return new SingleGenericObject(String.valueOf(value));
	}
	
	public static SingleGenericObject valueOf(double value){
		return new SingleGenericObject(String.valueOf(value));
	}
	
	public static SingleGenericObject valueOf(float value){
		return new SingleGenericObject(String.valueOf(value));
	}
}
