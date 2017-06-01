package cn.evun.sweet.framework.common.datastructure.generic;

import cn.evun.sweet.framework.common.datastructure.generic.convert.GenericObjectConverterSupport;
import cn.evun.sweet.framework.common.util.collection.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

/**   
 * 集合等数据结构的抽象。<br/>
 * <p>注意：该对象操作是线程不安全的，在实际业务处理时，需要考虑线程安全问题。
 * 
 * @author yangw   
 * @since V1.0.0   
 */
public class CollectGenericObject implements GenericObject {
	
	private final List<GenericObject> sourceObj = new ArrayList<GenericObject>();
	
	private GenericDataType compType;
	
	public CollectGenericObject() {		
	}
	
	public CollectGenericObject(GenericDataType componentType) {	
		this.compType = componentType;
	}
	
	public CollectGenericObject(GenericObject source) {			
		this.addComponent(source);
	}

	@Override
	public GenericObject getProperty(String propertyName) {
		CollectGenericObject propValuelist = new CollectGenericObject();
		boolean allIsNull = true;
		for(GenericObject obj : this.sourceObj){
			GenericObject value = obj.getProperty(propertyName);
			if(value != null){
				allIsNull = false;
			}
			propValuelist.addComponent(value);
		}
		return allIsNull?null:propValuelist;
	}

	@Override
	public void setProperty(String propertyName, GenericObject propertyValue) {
		for(GenericObject obj : this.sourceObj){
			obj.setProperty(propertyName, propertyValue);
		}
	}

	@Override
	public void setProperty(String propertyName, Object propertyValue) {
		setProperty(propertyName, GenericObjectConverterSupport.convert(propertyValue));
	}

	@Override
	public Set<String> getAllPropertyNames() {
		if(!isEmpty()){
			return this.sourceObj.get(0).getAllPropertyNames();
		}
		return Collections.emptySet();
	}

	@Override
	public GenericObject getComponentByIndex(int index) {
		if(!isEmpty() && index>-1 && index<this.sourceObj.size()){
			return this.sourceObj.get(index);
		}
		return null;
	}

	@Override
	public List<GenericObject> getAllComponents() {
		return Collections.unmodifiableList(this.sourceObj);
	}

	@Override
	public void addComponent(GenericObject component) {
		if(component == null) 
			return;
		if(CollectionUtils.isEmpty(this.sourceObj)){
			if(component.isValueObject()){
				this.compType = GenericDataType.VALUE;
			}else if(component.isObject()){
				this.compType = GenericDataType.OBJECT;
			}else {
				this.compType = GenericDataType.COMPOSITE;
			}
		}else {
			if(component.getType() != this.compType){//类型匹配检查
				return;
			}
		}
		this.sourceObj.add(component);
	}

	@Override
	public void delComponent(GenericObject component) {
		if(!isEmpty()){
			this.sourceObj.remove(component);
		}
	}

	@Override
	public void delComponent(int index) {
		if(!isEmpty()){
			this.sourceObj.remove(index);
		}
	}

	@Override
	public String getValue() {
		return null;
	}

	@Override
	public void setValue(String objValue) {		
	}

	@Override
	public boolean isValueObject() {
		return false;
	}

	@Override
	public boolean isCompositeObject() {
		return true;
	}

	@Override
	public boolean isObject() {
		return false;
	}

	@Override
	public GenericDataType getType(){
		return GenericDataType.COMPOSITE;
	}
	
	public boolean isEmpty(){
		return CollectionUtils.isEmpty(this.sourceObj);
	}
}
