/*
 * Copyright 2015-2019 Evun Technology. 
 * 
 * This software is the confidential and proprietary information of
 * Evun Technology. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with evun.cn.
 */
package cn.evun.sweet.framework.common.util;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

/**
 * 生成图片验证码的方法，可以自定义图片中出现的字符串.
 * 例如：<code>ImageUtils.validateCode(response.getOutputStream(), "0123456789abcdefghijklmnopqrstuvwxyz");</code>
 *
 * @author yangw
 * @since 1.0.0
 */
public class VerifyImageUtils {
	/**
	 * 生成随机验证码
	 * 
	 * @param outputStream 输出流
	 * @param allowValidateString 允许验证码中出现的字符串
	 */
	public static String validateCode(OutputStream outputStream, String allowValidateString) {
		int width = 60;
		int height = 20;

		BufferedImage buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB); // 缓冲区Image
		Graphics2D g = buffImg.createGraphics(); // 获得在缓冲区Image中负责绘画的对象(画笔)他是Graphics的字类型

		// 创建一个随机数生成器类。
		Random random = new Random();

		g.setColor(Color.decode("#ffffff"));
		g.fillRect(0, 0, width, height); // 画一个填充的矩形背景颜色为白色		
		Font font = new Font("Times New Roman", Font.PLAIN, 18);// 创建字体，字体的大小应该根据图片的高度来定。	
		g.setFont(font);// 设置字体。

		/*画边框*/ 
		// g.setColor(Color.blue);
		// g.drawRect(0, 0, width - 1, height - 1);

		/*随机产生160条干扰线，使图象中的认证码不易被其它程序探测到*/ 
		g.setColor(Color.GRAY);
		for (int i = 0; i < 80; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}

		/*randomCode用于保存随机产生的验证码，以便用户登录后进行验证*/ 
		StringBuffer randomCode = new StringBuffer();
		int red = 0, green = 0, blue = 0;

		/*随机产生验证码。*/ 
		for (int i = 0; i < 4; i++) {
			/*得到随机产生的验证码数字。*/ 
			int randomIndex = random.nextInt(allowValidateString.length());
			if (randomIndex == 0)
				randomIndex = 1;
			String strRand = allowValidateString.substring(randomIndex - 1, randomIndex);

			/*产生随机的颜色分量来构造颜色值，这样输出的每位数字的颜色值都将不同*/ 
			red = random.nextInt(110);
			green = random.nextInt(50);
			blue = random.nextInt(50);

			/*用随机产生的颜色将验证码绘制到图像中*/ 
			g.setColor(new Color(red, green, blue));
			g.drawString(strRand, 13 * i + 6, 16);

			/*将产生的四个随机数组合在一起。*/ 
			randomCode.append(strRand);
		}
		try {
			ImageIO.write(buffImg, "jpeg", outputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return randomCode.toString();
	}
}
