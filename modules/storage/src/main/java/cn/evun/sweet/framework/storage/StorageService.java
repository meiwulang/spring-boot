package cn.evun.sweet.framework.storage;

import java.io.File;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by zlbbq on 2017/3/14.
 */

public interface StorageService {

    /**
     * 将一个本地文件存储到文件存储服务器上
     */
    String store(File file);

    String store(String name, InputStream data);

    String store(String name, byte[] data);

    String store(File file, Properties metadata);

    String store(String name, InputStream data, Properties metadata);

    String store(String name, byte[] data, Properties metadata);

    /**
     * 从远程文件服务器上获取文件信息, 如果
     * 没有查到, 则返回null
     */
    FileInfo getFileInfo(String uuid);

    /**
     * 一次查询请求, 返回多个结果, 如果某个文件UUID没有查询到, 则在相应元素位置会是一个null
     */
    FileInfo[] getFileInfo(String[] uuids);

    /**
     * 判定一个文件是否存在
     */
    boolean exists(String uuid);

    /**
     * 获取文件服务器上指定目录下的文件个数, 部分文件系统实现可能不支持此方法
     */
    int files(String directory);

    /**
     * 获取文件服务器上指定目录下的文件, startIndex, 0 based, include; endIndex, 0 based, exclude
     * 该方法会返回空数组不会返回null
     */
    FileInfo[] getFiles(String directory, int startIndex, int endIndex);

    /**
     * 读取文件内容
     */
    byte[] readFileContent(String uuid);

    byte[] readFileContent(FileInfo fileInfo);

    InputStream readFileContentAsStream(String uuid);

    InputStream readFileContentAsStream(FileInfo fileInfo);

    /**
     * 获取预览页面地址
     */
    String getURL(String uuid);

    String getURL(FileInfo fileInfo);

    /**
     * 删除文件
     * */
    boolean delete(String uuid);

    boolean delete(FileInfo fileInfo);

    /**
     * 复制文件, 返回一个新生成的文件UUID, 失败返回null
     * */
    String copy(String uuid, String targetDirectory);

    String copy(FileInfo fileInfo, String targetDirectory);

    /**
     * 移动文件
     * */
    boolean move(String uuid, String targetDirectory);

    boolean move(FileInfo fileInfo, String targetDirectory);

    /**
     * 判定一个文件是否能被上传
     * */
    boolean isSupportedType(String name);
}