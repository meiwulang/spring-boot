package cn.evun.sweet.framework.common.datastructure;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Simple implementation of {@link cn.evun.sweet.framework.common.datastructure.MultiValueMap} that wraps a {@link java.util.LinkedHashMap},
 * storing multiple values in a {@link java.util.LinkedList}.
 *
 * <p>This Map implementation is generally not thread-safe. It is primarily designed
 * for data structures exposed from request objects, for use in a single thread only.
 *
 * @author yangw
 * @since 1.0.0
 */
public class LinkedMultiValueMap<K, V> extends MultiValueMapAdapter<K, V>{

	private static final long serialVersionUID = 3801124242820219131L;

	/**
	 * Create a new LinkedMultiValueMap that wraps a {@link java.util.LinkedHashMap}.
	 */
	public LinkedMultiValueMap() {
		super(new LinkedHashMap<K, List<V>>());
	}

	/**
	 * Create a new LinkedMultiValueMap that wraps a {@link java.util.LinkedHashMap}
	 * with the given initial capacity.
	 * @param initialCapacity the initial capacity
	 */
	public LinkedMultiValueMap(int initialCapacity) {
		super(new LinkedHashMap<K, List<V>>(initialCapacity));
	}

	/**
	 * Copy constructor: Create a new LinkedMultiValueMap with the same mappings
	 * as the specified Map.
	 * @param otherMap the Map whose mappings are to be placed in this Map
	 */
	public LinkedMultiValueMap(Map<K, List<V>> otherMap) {
		super(new LinkedHashMap<K, List<V>>(otherMap));
	}

}
