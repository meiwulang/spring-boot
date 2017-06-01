package cn.evun.sweet.framework.common.datastructure.generic;

import java.util.List;
import java.util.Set;

/**   
 * 统一数据结构的抽象。<br/>
 * 它将数据结构分为“值”、“对象”以及“集合”三种类型，并提供统一的操作方法。为基于OGNL的高度抽象的数据操作方式提供支持。
 * <p>注意：该对象操作是线程不安全的，在实际业务处理时，需要考虑线程安全问题。
 * 
 * @author yangw   
 * @since V1.0.0   
 */
public interface GenericObject {

	public static enum GenericDataType {
		VALUE, OBJECT, COMPOSITE
	}
	
	/**
	 * 获取“值”对象的值。
	 */
	String getValue();
	
	/**
	 * 设置“值”对象的值。
	 */
	void setValue(String objValue);
	
	/**
	 * 根据对象属性取值，对于集合类型的对象，将返回一个值的集合。
	 */
	GenericObject getProperty(String propertyName);
	
	/**
	 * 为对象新增属性，对于集合类型的对象，每个元素都将新增该属性。
	 */
	void setProperty(String propertyName, GenericObject propertyValue);
	
	/**
	 * 为对象新增属性，对于集合类型的对象，每个元素都将新增该属性。
	 */
	void setProperty(String propertyName, Object propertyValue);
	
	/**
	 * 获取对象的所有属性名称，对于集合类型的对象，将返回其元素的所有属性名称。
	 */
	Set<String> getAllPropertyNames();
	
	/**
	 * 根据索引获得集合对象的某个元素，如果是bean对象，将返回其自身。
	 */
	GenericObject getComponentByIndex(int index);
	
	/**
	 * 获得集合对象的所有元素。
	 */
	List<GenericObject> getAllComponents();
	
	/**
	 * 为集合对象新增一个元素，放置在尾端。其他类型的对象该操作无效。
	 */
	void addComponent(GenericObject component);
	
	/**
	 * 从集合对象中，删除一个元素。
	 */
	void delComponent(GenericObject component);
	
	/**
	 * 从集合对象中，删除一个元素。
	 */
	void delComponent(int index);
	
	/**
	 * 是否“值”对象。
	 */
	boolean isValueObject();
	
	/**
	 * 是否集合对象中。
	 */
	boolean isCompositeObject();
	
	/**
	 * 是否bean对象。
	 */
	boolean isObject();
	
	/**
	 * 得到对象类型。
	 */
	GenericDataType getType();
}
