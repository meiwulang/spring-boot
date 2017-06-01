package cn.evun.sweet.framework.common.util.encode;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 为消息摘要算法（例如：MD5、SHA）提供支持。 （编者按：SHA（安全散列算法）、MD5都是消息摘要算法的一种，SHA被广泛认可为MD5算法的继任者。
 * SHA算法家族目前共有SHA-0、SHA-1、SHA-224、SHA-256、SHA-384和SHA-512五种算法，通常将后四种算法并称为SHA-2算法，
 * 摘要信息字节长度的差异是SHA-2和SHA-1算法以及MD5的最大差异）
 * <p>如果你需要一个更全面的摘要算法工具类，请考虑 <a href="http://commons.apache.org/codec/">Apache Commons Codec</a> 
 *
 * @author yangw
 * @since 1.0.0
 */
public abstract class DigestUtil {

	private static final String MD5_ALGORITHM_NAME = "MD5";
	
	private static final String SHA_ALGORITHM_NAME = "SHA";

	private static final char[] HEX_CHARS =
			{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

	/**
	 * 对指定的byte流进行MD5加密
	 */
	public static byte[] md5Digest(byte[] bytes) {
		return digest(MD5_ALGORITHM_NAME, bytes);
	}
	
	/**
	 * 对指定的byte流进行SHA加密
	 */
	public static byte[] shaDigest(byte[] bytes) {
		return digest(SHA_ALGORITHM_NAME, bytes);
	}

	/**
	 * 对指定的byte流进行MD5加密，并返回一个16进制的字符串摘要
	 */
	public static String md5DigestAsHex(byte[] bytes) {
		return digestAsHexString(MD5_ALGORITHM_NAME, bytes);
	}
	
	/**
	 * 对指定的byte流进行SHA加密，并返回一个16进制的字符串摘要
	 */
	public static String shaDigestAsHex(byte[] bytes) {
		return digestAsHexString(SHA_ALGORITHM_NAME, bytes);
	}

	/**
	 * 将md5DigestAsHex的结果添加到指定的StringBuilder中
	 */
	public static StringBuilder appendMd5DigestAsHex(byte[] bytes, StringBuilder builder) {
		return appendDigestAsHex(MD5_ALGORITHM_NAME, bytes, builder);
	}
	
	/**
	 * 将shaDigestAsHex的结果添加到指定的StringBuilder中
	 */
	public static StringBuilder appendSHADigestAsHex(byte[] bytes, StringBuilder builder) {
		return appendDigestAsHex(SHA_ALGORITHM_NAME, bytes, builder);
	}

	/**
	 * Creates a new {@link java.security.MessageDigest} with the given algorithm. Necessary
	 * because {@code MessageDigest} is not thread-safe.
	 */
	private static MessageDigest getDigest(String algorithm) {
		try {
			return MessageDigest.getInstance(algorithm);
		}
		catch (NoSuchAlgorithmException ex) {
			throw new IllegalStateException("Could not find MessageDigest with algorithm \"" + algorithm + "\"", ex);
		}
	}

	private static byte[] digest(String algorithm, byte[] bytes) {
		return getDigest(algorithm).digest(bytes);
	}

	private static String digestAsHexString(String algorithm, byte[] bytes) {
		char[] hexDigest = digestAsHexChars(algorithm, bytes);
		return new String(hexDigest);
	}

	private static StringBuilder appendDigestAsHex(String algorithm, byte[] bytes, StringBuilder builder) {
		char[] hexDigest = digestAsHexChars(algorithm, bytes);
		return builder.append(hexDigest);
	}

	private static char[] digestAsHexChars(String algorithm, byte[] bytes) {
		byte[] digest = digest(algorithm, bytes);
		return encodeHex(digest);
	}

	private static char[] encodeHex(byte[] bytes) {
		char chars[] = new char[32];
		for (int i = 0; i < chars.length; i = i + 2) {
			byte b = bytes[i / 2];
			chars[i] = HEX_CHARS[(b >>> 0x4) & 0xf];
			chars[i + 1] = HEX_CHARS[b & 0xf];
		}
		return chars;
	}

}
