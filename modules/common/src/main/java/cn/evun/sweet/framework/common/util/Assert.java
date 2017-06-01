/*
* Copyright 2002-2013 the original author or authors.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not
* use this file except in compliance with the License. You may obtain a copy of
* the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/

package cn.evun.sweet.framework.common.util;


import java.util.Collection;
import java.util.Map;

/**
* 断言，可用于验证等场景。
*
* @author yangw
* @since 1.0.0
*/
public abstract class Assert {

	/**
	 * 对boolean表达式进行判断, false时抛出 {@code IllegalArgumentException}.
	 * <pre class="code">例如：Assert.isTrue(i &gt; 0, "The value must be greater than zero");</pre>
	 * @param expression boolean表达式
	 * @param message 设置断言为false后的异常信息
	 * @throws IllegalArgumentException
	 */
	public static void isTrue(boolean expression, String message) {
		if (!expression) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 判断对象是否为null，不是则抛出异常
	 */
	public static void isNull(Object object, String message) {
		if (object != null) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 判断对象是否为空，是则抛出异常
	 */
	public static void notNull(Object object, String message) {
		if (object == null) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 判断字符串是否有内容（空格也算），没有则抛出异常
	 */
	public static void hasLength(String text, String message) {
		if (! hasLength(text)) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 判断字符串是否有内容（空格不算），没有则抛出异常
	 */
	public static void hasText(String text, String message) {
		if (! hasText(text)) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 如果给定的字符串包含了substring,则抛出异常
	 */
	public static void doesNotContain(String textToSearch, String substring, String message) {
		if (hasLength(textToSearch) && hasLength(substring) &&
				textToSearch.contains(substring)) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 如果数组为null,或者少于一个元素，则抛出异常
	 */
	public static void notEmpty(Object[] array, String message) {
		if (ObjectUtils.isEmpty(array)) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 如果数组有null的元素，则抛出异常。注意：如果数组是空的，也算是不含null元素。
	 */
	public static void noNullElements(Object[] array, String message) {
		if (array != null) {
			for (Object element : array) {
				if (element == null) {
					throw new IllegalArgumentException(message);
				}
			}
		}
	}

	/**
	 * 如果集合为null，或少于一个元素，则抛出异常
	 */
	public static void notEmpty(Collection<?> collection, String message) {
		if (isEmpty(collection)) {
			throw new IllegalArgumentException(message);
		}
	}

	/**
	 * 如果Map为null，或拥有少于一个的元素，则抛出异常
	 */
	public static void notEmpty(Map<?, ?> map, String message) {
		if (isEmpty(map)) {
			throw new IllegalArgumentException(message);
		}
	}


	/**
	 * 如果对象和指定的类不匹配，则抛出异常
	 */
	public static void isInstanceOf(Class<?> type, Object obj, String message) {
		notNull(type, "Type to check against must not be null");
		if (!type.isInstance(obj)) {
			throw new IllegalArgumentException(
					(hasLength(message) ? message + " " : "") +
					"Object of class [" + (obj != null ? obj.getClass().getName() : "null") +
					"] must be an instance of " + type);
		}
	}


	/**
	 * 如果 {@code superType.isAssignableFrom(subType)} 为flase，则抛出异常
	 */
	public static void isAssignable(Class<?> superType, Class<?> subType, String message) {
		notNull(superType, "Type to check against must not be null");
		if (subType == null || !superType.isAssignableFrom(subType)) {
			throw new IllegalArgumentException(message + subType + " is not assignable to " + superType);
		}
	}


    private static boolean hasLength(CharSequence str) {
        return (str != null && str.length() > 0);
    }

    private static boolean hasText(CharSequence str) {
        if (!hasLength(str)) {
            return false;
        }
        int strLen = str.length();
        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return true;
            }
        }
        return false;
    }


    private static boolean isEmpty(Collection<?> collection) {
        return (collection == null || collection.isEmpty());
    }
    public static boolean isEmpty(Map<?, ?> map) {
        return (map == null || map.isEmpty());
    }
}
