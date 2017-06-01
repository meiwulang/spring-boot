package cn.evun.sweet.framework.common.util.encode;

import cn.evun.sweet.framework.common.util.StringUtils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.SecureRandom;

/**
 * 加解密工具类<br>
 * 
 * <pre>
 * 加密调用步骤：先调用initKey(..)方法生成密钥， 再调用加密方法encrypt(...)方法进行数据加密处理
 * 解密调用步骤：使用解密密钥作为参数，直接调用decrypt(...)方法进行数据解密处理
 * 
 * 支持对称加密算法： DES,DESede(TripleDES,即3DES),AES,Blowfish,RC2,RC4(ARCFOUR)
 * DES                  key size must be equal to 56
 * DESede(TripleDES)    key size must be equal to 112 or 168
 * AES                  key size must be equal to 128, 192 or 256,but 192 and 256 bits may not be available
 * Blowfish             key size must be multiple of 8, and can only range from 32 to 448 (inclusive)
 * RC2                  key size must be between 40 and 1024 bits
 * RC4(ARCFOUR)         key size must be between 40 and 1024 bits
 * </pre>
 * 
 * @author yangw
 * @since 1.0.0
 */
public class CryptUtil {

	/** 默认加解密算法 */
	public static final String TRANSFORMATION = "AES";

	/**
	 * 转换密钥(用于还原密钥)
	 * 
	 * @param key
	 * @param transformation 加解密算法
	 */
	private static Key toKey(byte[] key, String transformation) throws Exception {
		SecretKey secretKey = null;
		if ("DES".equals(transformation) || transformation.indexOf("/DES/") != -1) {
			DESKeySpec dks = new DESKeySpec(key);
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(transformation);
			secretKey = keyFactory.generateSecret(dks);
		} else { // 当使用其他对称加密算法(非DES算法)时，如AES、Blowfish等算法
			secretKey = new SecretKeySpec(key, transformation);
		}
		return secretKey;
	}

	/**
	 * 使用DES解密
	 */
	public static byte[] decrypt(byte[] data, String key) throws Exception {
		return decrypt(data, key, TRANSFORMATION);
	}

	/**
	 * 解密
	 * @param data 待解密数据
	 * @param key 密钥
	 * @param transformation 加解密算法
	 */
	public static byte[] decrypt(byte[] data, String key, String transformation) throws Exception {
		Key k = toKey(decryptBASE64(key), transformation);
		Cipher cipher = Cipher.getInstance(transformation);
		cipher.init(Cipher.DECRYPT_MODE, k);

		return cipher.doFinal(data);
	}

	/**
	 * 使用AES加密
	 */
	public static byte[] encrypt(byte[] data, String key) throws Exception {
		return encrypt(data, key, TRANSFORMATION);
	}

	/**
	 * 加密
	 * @param transformation 加解密算法
	 */
	public static byte[] encrypt(byte[] data, String key, String transformation) throws Exception {
		Key k = toKey(decryptBASE64(key), transformation);
		Cipher cipher = Cipher.getInstance(transformation);
		cipher.init(Cipher.ENCRYPT_MODE, k);
		return cipher.doFinal(data);
	}

	/**
	 * 生成密钥
	 */
	public static String initKey() throws Exception {
		return initKey(null, TRANSFORMATION);
	}

	/**
	 * 生成密钥
	 * 
	 * @param transformation 加解密算法
	 */
	public static String initKey(String transformation) throws Exception {
		return initKey(null, transformation);
	}

	/**
	 * 生成密钥
	 * @param seedStr  种子字符串
	 * @param transformation 加解密算法
	 */
	public static String initKey(String seedStr, String transformation)
			throws Exception {
		SecureRandom secureRandom = null;
		if (!StringUtils.hasText(seedStr)) {
			secureRandom = new SecureRandom(decryptBASE64(seedStr));
		} else {
			secureRandom = new SecureRandom();
		}
		KeyGenerator kg = KeyGenerator.getInstance(transformation);
		kg.init(secureRandom);
		SecretKey secretKey = kg.generateKey();
		return encryptBASE64(secretKey.getEncoded());
	}

	/**
	 * BASE64解密
	 */
	public static byte[] decryptBASE64(String key) throws Exception {
		return Base64Code.decodeFromString(key);//(new BASE64Decoder()).decodeBuffer(key);	 
	}

	/**
	 * BASE64加密
	 */
	public static String encryptBASE64(byte[] key) throws Exception {
		return Base64Code.encodeToString(key);//(new BASE64Encoder()).encodeBuffer(key);
	}

}
