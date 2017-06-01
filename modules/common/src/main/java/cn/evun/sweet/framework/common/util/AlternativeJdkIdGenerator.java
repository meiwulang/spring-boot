package cn.evun.sweet.framework.common.util;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Random;
import java.util.UUID;

/**
 * A variation of {@link java.util.UUID#randomUUID()} that uses {@link java.security.SecureRandom} only for the
 * initial seed and {@link java.util.Random} thereafter. This provides better performance in
 * exchange for less securely random id's.
 *
 * @author Rossen Stoyanchev
 * @author Rob Winch
 * @since 4.0
 */
public class AlternativeJdkIdGenerator{

	private final Random random;


	public AlternativeJdkIdGenerator() {
		SecureRandom secureRandom = new SecureRandom();
		byte[] seed = new byte[8];
		secureRandom.nextBytes(seed);
		this.random = new Random(new BigInteger(seed).longValue());
	}


	public UUID generateId() {

		byte[] randomBytes = new byte[16];
		this.random.nextBytes(randomBytes);

		long mostSigBits = 0;
		for (int i = 0; i < 8; i++) {
			mostSigBits = (mostSigBits << 8) | (randomBytes[i] & 0xff);
		}

		long leastSigBits = 0;
		for (int i = 8; i < 16; i++) {
			leastSigBits = (leastSigBits << 8) | (randomBytes[i] & 0xff);
		}

		return new UUID(mostSigBits, leastSigBits);
	}

}