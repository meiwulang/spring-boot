package cn.evun.sweet.framework.common.util;

/**
 * Created by zlbbq on 2017/3/29.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

public class BeanConvertUtils {
    private static final Logger logger = LoggerFactory.getLogger(BeanConvertUtils.class);

    private BeanConvertUtils() {
    }

    public static Map<String, Object> object2Map(Object obj) {
        if (obj == null) {
            return null;
        }

        Map<String, Object> map = new HashMap<>();
        try {

            Field[] declaredFields = obj.getClass().getFields();
            for (Field field : declaredFields) {
                field.setAccessible(true);
                map.put(field.getName(), field.get(obj));
            }
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }

        return map;
    }

    public static void map2Object(Map<String, Object> map, Object receiver) {
        if (map == null || receiver == null) {
            return;
        }

        try {
            Field[] fields = receiver.getClass().getFields();
            for (Field field : fields) {
                int mod = field.getModifiers();
                if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
                    continue;
                }

                field.setAccessible(true);
                field.set(receiver, map.get(field.getName()));
            }
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
