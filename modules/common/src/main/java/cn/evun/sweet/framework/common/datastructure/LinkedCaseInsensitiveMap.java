package cn.evun.sweet.framework.common.datastructure;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

/**
 * 对key忽略大小写的LinkedHashMap
 *
 * <p>Preserves the original order as well as the original casing of keys,
 * while allowing for contains, get and remove calls with any case of key.
 *
 * <p>Does <i>not</i> support {@code null} keys.
 *
 * @author Juergen Hoeller
 * @since 3.0
 */
@SuppressWarnings("serial")
public class LinkedCaseInsensitiveMap<V> extends LinkedHashMap<String, V> {

	private final Map<String, String> caseInsensitiveKeys;

	private final Locale locale;


	/**
	 * Create a new LinkedCaseInsensitiveMap for the default Locale.
	 * @see String#toLowerCase()
	 */
	public LinkedCaseInsensitiveMap() {
		this(null);
	}

	/**
	 * Create a new LinkedCaseInsensitiveMap that stores lower-case keys
	 * according to the given Locale.
	 * @param locale the Locale to use for lower-case conversion
	 * @see String#toLowerCase(java.util.Locale)
	 */
	public LinkedCaseInsensitiveMap(Locale locale) {
		super();
		this.caseInsensitiveKeys = new HashMap<String, String>();
		this.locale = (locale != null ? locale : Locale.getDefault());
	}

	/**
	 * Create a new LinkedCaseInsensitiveMap that wraps a {@link java.util.LinkedHashMap}
	 * with the given initial capacity and stores lower-case keys according
	 * to the default Locale.
	 * @param initialCapacity the initial capacity
	 * @see String#toLowerCase()
	 */
	public LinkedCaseInsensitiveMap(int initialCapacity) {
		this(initialCapacity, null);
	}

	/**
	 * Create a new LinkedCaseInsensitiveMap that wraps a {@link java.util.LinkedHashMap}
	 * with the given initial capacity and stores lower-case keys according
	 * to the given Locale.
	 * @param initialCapacity the initial capacity
	 * @param locale the Locale to use for lower-case conversion
	 * @see String#toLowerCase(java.util.Locale)
	 */
	public LinkedCaseInsensitiveMap(int initialCapacity, Locale locale) {
		super(initialCapacity);
		this.caseInsensitiveKeys = new HashMap<String, String>(initialCapacity);
		this.locale = (locale != null ? locale : Locale.getDefault());
	}


	@Override
	public V put(String key, V value) {
		String oldKey = this.caseInsensitiveKeys.put(convertKey(key), key);
		if (oldKey != null && !oldKey.equals(key)) {
			super.remove(oldKey);
		}
		return super.put(key, value);
	}

	@Override
	public void putAll(Map<? extends String, ? extends V> map) {
		if (map.isEmpty()) {
			return;
		}
		for (Map.Entry<? extends String, ? extends V> entry : map.entrySet()) {
			put(entry.getKey(), entry.getValue());
		}
	}

	@Override
	public boolean containsKey(Object key) {
		return (key instanceof String && this.caseInsensitiveKeys.containsKey(convertKey((String) key)));
	}

	@Override
	public V get(Object key) {
		if (key instanceof String) {
			return super.get(this.caseInsensitiveKeys.get(convertKey((String) key)));
		}
		else {
			return null;
		}
	}

	@Override
	public V remove(Object key) {
		if (key instanceof String ) {
			return super.remove(this.caseInsensitiveKeys.remove(convertKey((String) key)));
		}
		else {
			return null;
		}
	}

	@Override
	public void clear() {
		this.caseInsensitiveKeys.clear();
		super.clear();
	}


	/**
	 * Convert the given key to a case-insensitive key.
	 * <p>The default implementation converts the key
	 * to lower-case according to this Map's Locale.
	 * @param key the user-specified key
	 * @return the key to use for storing
	 * @see String#toLowerCase(java.util.Locale)
	 */
	protected String convertKey(String key) {
		return key.toLowerCase(this.locale);
	}

}
