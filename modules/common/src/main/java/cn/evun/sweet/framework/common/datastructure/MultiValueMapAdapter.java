package cn.evun.sweet.framework.common.datastructure;

import cn.evun.sweet.framework.common.util.Assert;

import java.io.Serializable;
import java.util.*;

/**
 * MultiValueMap实现类.
 * 
 * @author yangw
 * @since 1.0.0
 */
public class MultiValueMapAdapter<K, V> implements MultiValueMap<K, V>, Serializable {

	private static final long serialVersionUID = -5102272799094164283L;
	
	private final Map<K, List<V>> map;

	public MultiValueMapAdapter(Map<K, List<V>> map) {
		Assert.notNull(map, "'map' must not be null");
		this.map = map;
	}

	@Override
	public void add(K key, V value) {
		List<V> values = this.map.get(key);
		if (values == null) {
			values = new LinkedList<V>();
			this.map.put(key, values);
		}
		values.add(value);
	}

	@Override
	public V getFirst(K key) {
		List<V> values = this.map.get(key);
		return (values != null ? values.get(0) : null);
	}

	@Override
	public void set(K key, V value) {
		List<V> values = new LinkedList<V>();
		values.add(value);
		this.map.put(key, values);
	}

	@Override
	public void setAll(Map<K, V> values) {
		for (Entry<K, V> entry : values.entrySet()) {
			set(entry.getKey(), entry.getValue());
		}
	}

	@Override
	public Map<K, V> toSingleValueMap() {
		LinkedHashMap<K, V> singleValueMap = new LinkedHashMap<K,V>(this.map.size());
		for (Entry<K, List<V>> entry : map.entrySet()) {
			singleValueMap.put(entry.getKey(), entry.getValue().get(0));
		}
		return singleValueMap;
	}

	@Override
	public int size() {
		return this.map.size();
	}

	@Override
	public boolean isEmpty() {
		return this.map.isEmpty();
	}

	@Override
	public boolean containsKey(Object key) {
		return this.map.containsKey(key);
	}

	@Override
	public boolean containsValue(Object value) {
		return this.map.containsValue(value);
	}

	@Override
	public List<V> get(Object key) {
		return this.map.get(key);
	}

	@Override
	public List<V> put(K key, List<V> value) {
		return this.map.put(key, value);
	}

	@Override
	public List<V> remove(Object key) {
		return this.map.remove(key);
	}

	@Override
	public void putAll(Map<? extends K, ? extends List<V>> m) {
		this.map.putAll(m);
	}

	@Override
	public void clear() {
		this.map.clear();
	}

	@Override
	public Set<K> keySet() {
		return this.map.keySet();
	}

	@Override
	public Collection<List<V>> values() {
		return this.map.values();
	}

	@Override
	public Set<Entry<K, List<V>>> entrySet() {
		return this.map.entrySet();
	}

	@Override
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		return map.equals(other);
	}

	@Override
	public int hashCode() {
		return this.map.hashCode();
	}

	@Override
	public String toString() {
		return this.map.toString();
	}
}
