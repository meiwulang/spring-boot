package cn.evun.sweet.framework.common.util.resource;


import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.common.util.io.IOUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * @<p>文件操作工具类
 * 
 * @author zhouhb
 * @since V1.0.0
 */
public class FileUtils {
	/**
	 * @param remotePath 路径 ,os_separator 分隔符
	 * @return String[0] 目录 String[1] 文件名
	 */
	public static String[] resolvePathName(String remotePath, String os_separator) {
		String[] pathArr = new String[2];
		String dirPath = "", fileName = "";

		if (StringUtils.hasText(remotePath) && remotePath.indexOf(os_separator) != -1) {
			dirPath = remotePath.substring(0, remotePath.lastIndexOf(os_separator));
			fileName = remotePath.substring(remotePath.lastIndexOf(os_separator) + 1);
		} else {
			fileName = remotePath;
		}
		pathArr[0] = dirPath;
		pathArr[1] = fileName;
		return pathArr;
	}

	public static String getDownLoadFileName(String fileName, HttpServletRequest request) {
		String userAgent = request.getHeader("User-Agent");
		String name = null;
		try {
			name = URLEncoder.encode(fileName, "UTF-8").replace("%28", "(").replace("%29", ")");
		} catch (UnsupportedEncodingException e) {
			name = fileName;
		}
		if (!StringUtils.isEmpty(userAgent)) {
			userAgent = userAgent.toLowerCase();
			if (userAgent.indexOf("opera") != -1) {
				name = "filename*=UTF-8''" + name;
			} else if (userAgent.indexOf("msie") != -1) {
				name = "filename=\"" + name + "\"";
			} else if (userAgent.indexOf("mozilla") != -1 && userAgent.indexOf("firefox") != -1) {
				try {
					name = "filename=\"" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + "\"";
				} catch (UnsupportedEncodingException e) {
					name = "filename=\"" + name + "\"";
				}
			} else if (userAgent.indexOf("mozilla") != -1) {// 由于IE的userAgent调整，如下为IE11的userAgent，调整判断
															// mozilla/5.0 (windows nt 6.1; wow64; trident/7.0; )
				name = "filename=\"" + name + "\"";
			} else {
				name = "\"filename=" + name + "\"";
			}
		} else {
			name = "\"filename=" + name + "\"";
		}
		return name;
	}

	public static String resolveSuffix(String fileName) {
		if (StringUtils.isEmpty(fileName)) {
			return null;
		}
		int index = fileName.lastIndexOf(".");
		if (index == -1) {
			return "";
		}
		return fileName.substring(fileName.lastIndexOf(".") + 1);
	}

	public static String getFileSeparator() {
		final Properties PROPERTIES = new Properties(System.getProperties());
		return PROPERTIES.getProperty("file.separator");
	}

	public static String getSystemEncoding() {
		final Properties PROPERTIES = new Properties(System.getProperties());
		return PROPERTIES.getProperty("file.encoding");
	}

	/**
	 * 如果是windows系统下 文件夹分隔符为\
	 */
	public static String perHandlePath(String remotePath, String os_separator) {
		if (remotePath == null || !"\\".equals(os_separator)) {
			return remotePath;
		}
		return remotePath.replaceAll("/", "\\\\");
	}

	/**
	 * 压缩 文件 <p> 传入的流均已关闭
	 * 
	 * @param iss 要压缩的文件流
	 * @param fileNames 对应的文件名
	 */
	public static void pack(List<InputStream> iss, List<String> fileNames, OutputStream os) {
		ZipOutputStream out = null;
		try {
			out = new ZipOutputStream(new BufferedOutputStream(os));
			for (int i = 0; i < iss.size(); i++) {
				InputStream is = iss.get(i);
				ZipEntry zipEntry = new ZipEntry(fileNames.get(i));
				zipEntry.setSize(is.available());
				zipEntry.setTime(new Date().getTime());
				out.putNextEntry(zipEntry);
				try {
					IOUtils.copy(new BufferedInputStream(is), out);
				} finally {
					IOUtils.closeQuietly(is);
				}
				out.closeEntry();
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			IOUtils.closeQuietly(out);
			IOUtils.closeQuietly(os);
		}
	}

}
