package cn.evun.sweet.framework.common.util.resource;

import cn.evun.sweet.framework.common.util.Assert;

import java.io.File;
import java.io.IOException;

/**
 * Utility methods for working with the file system.
 *
 * @author Rob Harrop
 * @author Juergen Hoeller
 * @since 2.5.3
 */
public abstract class FileSystemUtils {

	/**
	 * Delete the supplied {@link java.io.File} - for directories,
	 * recursively delete any nested directories or files as well.
	 * @param root the root {@code File} to delete
	 * @return {@code true} if the {@code File} was deleted,
	 * otherwise {@code false}
	 */
	public static boolean deleteRecursively(File root) {
		if (root != null && root.exists()) {
			if (root.isDirectory()) {
				File[] children = root.listFiles();
				if (children != null) {
					for (File child : children) {
						deleteRecursively(child);
					}
				}
			}
			return root.delete();
		}
		return false;
	}

	/**
	 * Recursively copy the contents of the {@code src} file/directory
	 * to the {@code dest} file/directory.
	 * @param src the source directory
	 * @param dest the destination directory
	 * @throws java.io.IOException in the case of I/O errors
	 */
	public static void copyRecursively(File src, File dest) throws IOException {
		Assert.isTrue(src != null && (src.isDirectory() || src.isFile()), "Source File must denote a directory or file");
		Assert.notNull(dest, "Destination File must not be null");
		doCopyRecursively(src, dest);
	}

	/**
	 * Actually copy the contents of the {@code src} file/directory
	 * to the {@code dest} file/directory.
	 * @param src the source directory
	 * @param dest the destination directory
	 * @throws java.io.IOException in the case of I/O errors
	 */
	private static void doCopyRecursively(File src, File dest) throws IOException {
		if (src.isDirectory()) {
			dest.mkdir();
			File[] entries = src.listFiles();
			if (entries == null) {
				throw new IOException("Could not list files in directory: " + src);
			}
			for (File entry : entries) {
				doCopyRecursively(entry, new File(dest, entry.getName()));
			}
		}
		else if (src.isFile()) {
			try {
				dest.createNewFile();
			}
			catch (IOException ex) {
				IOException ioex = new IOException("Failed to create file: " + dest);
				ioex.initCause(ex);
				throw ioex;
			}
			FileCopyUtils.copy(src, dest);
		}
		else {
			// Special File handle: neither a file not a directory.
			// Simply skip it when contained in nested directory...
		}
	}

}
