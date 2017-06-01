package cn.evun.sweet.framework.common.util.encode;


import cn.evun.sweet.framework.common.util.Assert;

import java.nio.charset.Charset;

/**
 * Base64的编码与解码.
 *
 * <p>采用 Apache Commons Codec
 *
 * @author Juergen Hoeller
 * @since 4.1
 * @see org.apache.commons.codec.binary.Base64
 */
public abstract class Base64Code {

	private static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");


	private static final Base64Delegate delegate;

	static {
		delegate = new CommonsCodecBase64Delegate();
	}

	/**
	 * Assert that Byte64 encoding is actually supported.
	 * @throws IllegalStateException if neither Java 8 nor Apache Commons Codec is present
	 */
	private static void assertSupported() {
		Assert.isTrue(delegate != null, "Apache Commons Codec not found - Base64 encoding not supported");
	}


	/**
	 * 对给定的字节流进行编码.
	 * @param src the original byte array (may be {@code null})
	 * @return the encoded byte array (or {@code null} if the input was {@code null})
	 * @throws IllegalStateException if Base64 encoding is not supported
	 */
	public static byte[] encode(byte[] src) {
		assertSupported();
		return delegate.encode(src);
	}

	/**
	 * 将编码结果转换成“UTF-8”的字符串.
	 * @param src the original byte array (may be {@code null})
	 * @return the encoded byte array as a UTF-8 String (or {@code null} if the input was {@code null})
	 * @throws IllegalStateException if Base64 encoding is not supported
	 */
	public static String encodeToString(byte[] src) {
		assertSupported();
		if (src == null) {
			return null;
		}
		if (src.length == 0) {
			return "";
		}
		return new String(delegate.encode(src), DEFAULT_CHARSET);
	}

	/**
	 * 对给定的字节流进行解码.
	 * @param src the encoded byte array (may be {@code null})
	 * @return the original byte array (or {@code null} if the input was {@code null})
	 * @throws IllegalStateException if Base64 encoding is not supported
	 */
	public static byte[] decode(byte[] src) {
		assertSupported();
		return delegate.decode(src);
	}

	/**
	 * 对UTF-8字符串进行解码.
	 * @param src the encoded UTF-8 String (may be {@code null})
	 * @return the original byte array (or {@code null} if the input was {@code null})
	 * @throws IllegalStateException if Base64 encoding is not supported
	 */
	public static byte[] decodeFromString(String src) {
		assertSupported();
		if (src == null) {
			return null;
		}
		if (src.length() == 0) {
			return new byte[0];
		}
		return delegate.decode(src.getBytes(DEFAULT_CHARSET));
	}


	private interface Base64Delegate {

		byte[] encode(byte[] src);

		byte[] decode(byte[] src);
	}

	private static class CommonsCodecBase64Delegate implements Base64Delegate {

		private final org.apache.commons.codec.binary.Base64 base64 = new org.apache.commons.codec.binary.Base64();

		public byte[] encode(byte[] src) {
			return this.base64.encode(src);
		}

		public byte[] decode(byte[] src) {
			return this.base64.decode(src);
		}
	}

}
