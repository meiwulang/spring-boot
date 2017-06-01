package cn.evun.sweet.framework.storage;

/**
 * Created by zlbbq on 2017/3/14.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DecimalFormat;
import java.util.Properties;

/**
 * 用此类表述一个文件
 * */
public class FileInfo {
    private static final Logger logger = LoggerFactory.getLogger(FileInfo.class);

    public static final String ROOT_DIRECTORY = "/";

    private static final double KB = 1024;
    private static final double MB = 1024 * 1024;
    private static final double GB = 1024 * 1024;
    /**
     * 文件所处目录, 对于FastDFS来说, 它永远是"/", 通常对应于一个bucket路径
     * */
    protected String directory = "/";

    /**
     * 文件系统中的唯一标识
     */
    protected String uuid;

    /**
     * 原始名称
     */
    protected String name;

    /**
     * 文件大小, in bytes
     */
    protected long size;

    /**
     * 文件创建时间
     * */
    protected long createTime;

    /**
     * 文件元数据, 用于应用自定义数据
     * */
    protected Properties metadata = new Properties();


    /**
     * 访问文件的URL
     * */
    protected String url;

    public FileInfo() {
    }

    public FileInfo(String uuid, String name, long size) {
        this(ROOT_DIRECTORY, uuid, name, size, new Properties());
    }

    public FileInfo(String uuid, String name, long size, Properties metadata) {
        this(ROOT_DIRECTORY, uuid, name, size, metadata);
    }

    public FileInfo(String directory, String uuid, String name, long size, Properties metadata) {
        this.directory = directory;
        this.uuid = uuid;
        this.name = name;
        this.size = size;
        this.metadata = metadata;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(long createTime) {
        this.createTime = createTime;
    }

    public Properties getMetadata() {
        return metadata;
    }

    public void setMetadata(Properties metadata) {
        this.metadata = metadata;
    }

    public String getDirectory() {
        return directory;
    }

    public void setDirectory(String directory) {
        this.directory = directory;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSizeHuman() {
        if(size <= 0) {
            return "0";
        }

        DecimalFormat decimalFormat = new DecimalFormat("0.##");

        if(size < KB) {
            return "" + size;
        }

        if(size < MB) {
            return decimalFormat.format((double)size / KB) + "KB";
        }

        if(size < GB) {
            return decimalFormat.format((double)size / MB) + "MB";
        }

        return decimalFormat.format((double)size / GB) + "GB";
    }

    @Override
    public String toString() {
        return "FileInfo{" +
                "uuid='" + uuid + '\'' +
                ", name='" + name + '\'' +
                ", size=" + size +
                '}';
    }
}
