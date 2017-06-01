package cn.evun.sweet.framework.common.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;

/**
 * 生成一维码、二维码
 * 
 * @author yangw
 * @since 1.0.0
 */
public class ZXingUtils {

	private static final String CODE = "utf-8";
	private static final int BLACK = 0xff000000;
	private static final int WHITE = 0xFFFFFFFF;

	/**
	 * 生成RQ二维码
	 * 
	 * @param str 内容
	 * @param height 高度（px）
	 */
	public static BufferedImage getRQ(String str, Integer height) {
		if (height == null || height < 100) {
			height = 200;
		}

		try {
			Hashtable<EncodeHintType, Object> hints = new Hashtable<EncodeHintType, Object>();
			hints.put(EncodeHintType.CHARACTER_SET, CODE);
			hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
			BitMatrix bitMatrix = new MultiFormatWriter().encode(str, BarcodeFormat.QR_CODE, height, height, hints);

			return toBufferedImage(bitMatrix);
		} catch (Exception e) {
			return null;
		}
		
	}

	/**
	 * 生成一维码（128）
	 */
	public static BufferedImage getBarcode(String str, Integer width, Integer height) {
		if (width == null || width < 100) {
			width = 220;
		}
		if (height == null || height < 20) {
			height = 30;
		}

		try {
			Hashtable<EncodeHintType, String> hints = new Hashtable<EncodeHintType, String>();
			hints.put(EncodeHintType.CHARACTER_SET, CODE);
			BitMatrix bitMatrix = new MultiFormatWriter().encode(str,BarcodeFormat.CODE_128, width, height, hints);

			return toBufferedImage(bitMatrix);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 生成二维码，写到文件中
	 */
	public static void getRQWriteFile(String str, Integer height, File file) throws IOException {
		getRQWriteFile(str, height, file, null);
	}

	public static void getRQWriteFile(String str, Integer height, File file, File portrait) throws IOException {
		BufferedImage image = getRQ(str, height);
		if (null != portrait) {
			image = createQRCodeBitmapWithPortrait(image, portrait);
		}
		ImageIO.write(image, "png", file);
	}

	private static BufferedImage createQRCodeBitmapWithPortrait( BufferedImage qr, File portrait) {
		BufferedImage portraitImage;
		try {
			portraitImage = ImageIO.read(portrait);
		} catch (IOException e) {
			return qr;
		}

		/* 头像图片的大小  */
		int portrait_W = portraitImage.getWidth();
		int portrait_H = portraitImage.getHeight();

		int QRCODE_W = qr.getWidth();
		int QRCODE_H = qr.getHeight();

		/* 设置头像要显示的位置，即居中显示  */
		int left = (QRCODE_W - portrait_W) / 2;
		int top = (QRCODE_H - portrait_H) / 2;

		/* 取得qr二维码图片上的画笔，即要在二维码图片上绘制我们的头像 */ 
		Graphics g = qr.getGraphics();

		/* 设置我们要绘制的范围大小，也就是头像的大小范围 */ 
		g.drawImage(portraitImage, left, top, portrait_W, portrait_H, null);
		g.dispose();
		return qr;
	}

	/**
	 * 生成一维码，写到文件中
	 */
	public static void getBarcodeWriteFile(String str, Integer width, Integer height, File file) throws IOException {
		BufferedImage image = getBarcode(str, width, height);
		ImageIO.write(image, "png", file);
	}

	/**
	 * 转换成图片
	 */
	private static BufferedImage toBufferedImage(BitMatrix matrix) {
		int width = matrix.getWidth();
		int height = matrix.getHeight();
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				image.setRGB(x, y, matrix.get(x, y) ? BLACK : WHITE);
			}
		}
		return image;
	}

}
