package cn.evun.sweet.framework.common.datastructure;

import java.util.List;
import java.util.Map;

/**
 * 扩展 {@code Map} 接口以存储复合数据结构.
 *
 * @author yangw
 * @since 1.0.0
 */
public interface MultiValueMap<K, V> extends Map<K, List<V>> {

	/**
	 * 返回指定key的values(List)中的第一个value.
	 */
	V getFirst(K key);

	/**
	 * 向指定key的values(List)中增加一个value.
	 */
	void add(K key, V value);

	/**
	 * 向map中增加一个key:valuses，并将value放入values中.
	 */
	void set(K key, V value);

	/**
	 * 将map植入到复合map中
	 */
	void setAll(Map<K, V> values);

	/**
	 * 转换为普通map，value取values中的第一个值
	 */
	Map<K, V> toSingleValueMap();

}
