package cn.evun.sweet.framework.common.datastructure.generic.convert;

import cn.evun.sweet.framework.common.datastructure.generic.GenericObject;
import cn.evun.sweet.framework.common.datastructure.generic.SingleGenericObject;

import java.util.Calendar;
import java.util.Date;

/**
 * 时间数据类型转换器。
 * 
 * @author yangw
 * @since V1.0.0
 */
public class DateConverter implements GenericObjectConverter {

	@Override
	public boolean isSupportsType(Object source) {
		if (source instanceof Date || source instanceof Calendar) {
			return true;
		}
		return false;
	}

	@Override
	public GenericObject convertObject(Object object) {
		if(object instanceof Date){
			Date time = (Date)object;
			return new SingleGenericObject(String.valueOf(time.getTime()));
		}		
		if(object instanceof Calendar){
			Calendar time = (Calendar)object;
			return new SingleGenericObject(String.valueOf(time.getTimeInMillis()));
		}
		return null;
	}

}
