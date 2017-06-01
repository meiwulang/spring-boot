package cn.evun.sweet.framework.storage.spi.fastdfs;

/**
 * Created by zlbbq on 2017/3/14.
 */


import cn.evun.sweet.framework.common.util.StringUtils;
import cn.evun.sweet.framework.storage.FileInfo;
import cn.evun.sweet.framework.storage.SecurityFileTypeStorageService;
import cn.evun.sweet.framework.storage.StorageException;
import org.csource.common.NameValuePair;
import org.csource.fastdfs.StorageClient1;
import org.csource.fastdfs.TrackerServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import java.io.*;
import java.util.Properties;
import java.util.Set;

public class FastDFSStorageService extends SecurityFileTypeStorageService {
    private static final Logger logger = LoggerFactory.getLogger(FastDFSStorageService.class);

    private static final String FILE_NAME_KEY = "__name__";

    private FastDFS factory;

    public FastDFSStorageService(FastDFS factory) {
        this.factory = factory;
    }

    @Override
    public String store(File file) {
        return store(file, null);
    }

    @Override
    public String store(String name, InputStream data) {
        return store(name, data, null);
    }

    @Override
    public String store(String name, byte[] data) {
        return store(name, data, null);
    }

    @Override
    public String store(File file, Properties metadata) {
        Assert.notNull(file, "File can not be null");
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            return store(file.getName(), fis, metadata);
        } catch (FileNotFoundException e) {
            throw StorageException.wrap(e);
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    ; //handled
                }
            }
        }
    }

    @Override
    public String store(String name, InputStream data, Properties metadata) {
        Assert.notNull(data, "InputStream can not be null");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[10240];
        int read = 0;
        try {
            while ((read = data.read(buffer)) > 0) {
                baos.write(buffer, 0, read);
                baos.flush();
            }
        }catch(Exception e) {
            throw StorageException.wrap(e);
        }
        String fileUUID = store(name, baos.toByteArray(), metadata);
        try {
            baos.close();
        } catch (IOException e) {
            ; //handled
        }
        return fileUUID;
    }

    @Override
    /**
     * 这里, FastDFS是一个操蛋的实现，它应该支持InputStream类型, 否则大文件全部读到内存不是要完蛋?? 写FastDFS这逼是只懂C不懂JAVA, 我看出来了
     * 暂时没空去自己实现支持InputStream的文件上传, 被逼埋个坑在这, 用来上传大文件就自求多福吧!  by zlbbq, 2017-03-14
     * */
    public String store(String name, byte[] data, Properties metadata) {
        if (!StringUtils.hasText(name)) {
            throw StorageException.create("File name is null or an empty string");
        }
        Assert.notNull(data, "File data can be an empty byte array but null");
        if(!isSupportedType(name)) {
            throw StorageException.create("Unsupported file type [" + name + "]");
        }
        if(metadata == null) {
            metadata = new Properties();
        }
        //将原始文件名作为metadata存储
        metadata.setProperty(FILE_NAME_KEY, name);
        TrackerServer trackerServer = null;
        String fileUUID = null;
        try {
            trackerServer = factory.getTrackerServer();
            StorageClient1 client = factory.getStorageClient(trackerServer);
            fileUUID = client.upload_file1(data, getFileSuffix(name), convertMetadata(metadata));
        } catch (Exception e) {
            throw StorageException.wrap(e);
        } finally {
            if(trackerServer != null) {
                try {
                    trackerServer.close();
                } catch (IOException e) {
                    ; //handled
                }
            }
        }
        return fileUUID;
    }

    @Override
    public FileInfo getFileInfo(String uuid) {
        TrackerServer trackerServer = null;
        try {
            trackerServer = factory.getTrackerServer();
            StorageClient1 client = factory.getStorageClient(trackerServer);
            org.csource.fastdfs.FileInfo fileInfo = client.get_file_info1(uuid);
            if(fileInfo != null) {
                FileInfo ret = new FileInfo();
                ret.setUuid(uuid);
                ret.setSize(fileInfo.getFileSize());
                ret.setCreateTime(fileInfo.getCreateTimestamp().getTime());
                ret.setUrl(getAccessibleURL(uuid));
                NameValuePair []metadata = client.get_metadata1(uuid);
                Properties pMetadata = convertMetadata(metadata);
                ret.setName(pMetadata.getProperty(FILE_NAME_KEY, uuid));
                pMetadata.remove(FILE_NAME_KEY);
                ret.setMetadata(pMetadata);
                return ret;
            }
        } catch (Exception e) {
            throw StorageException.wrap(e);
        } finally {
            if(trackerServer != null) {
                try {
                    trackerServer.close();
                } catch (IOException e) {
                    ; //handled
                }
            }
        }
        return null;
    }

    @Override
    public FileInfo[] getFileInfo(String[] uuids) {
        Assert.notNull(uuids, "File UUIDs can not be null");
        FileInfo[]ret = new FileInfo[uuids.length];
        int idx = 0;
        for(String uuid : uuids) {
            if(!StringUtils.hasText(uuid)) {
                throw StorageException.create("File name is null or an empty string");
            }
            ret[idx++] = getFileInfo(uuid);
        }
        return ret;
    }

    @Override
    public boolean exists(String uuid) {
        FileInfo fileInfo = getFileInfo(uuid);
        return fileInfo != null;
    }

    @Override
    public int files(String directory) {
        logger.error("FastDFS文件系统不支持文件系统Metadata, 无法实现此功能");
        return 0;
    }

    @Override
    public FileInfo[] getFiles(String directory, int startIndex, int endIndex) {
        logger.error("FastDFS文件系统不支持文件系统Metadata, 无法实现此功能");
        return new FileInfo[0];
    }

    @Override
    public byte[] readFileContent(String uuid) {
        if (!StringUtils.hasText(uuid)) {
            throw StorageException.create("File UUID is null or an empty string");
        }
        TrackerServer trackerServer = null;
        try {
            trackerServer = factory.getTrackerServer();
            StorageClient1 client = factory.getStorageClient(trackerServer);
            return client.download_file1(uuid);
        } catch (Exception e) {
            throw StorageException.wrap(e);
        } finally {
            if(trackerServer != null) {
                try {
                    trackerServer.close();
                } catch (IOException e) {
                    ; //handled
                }
            }
        }
    }

    @Override
    public byte[] readFileContent(FileInfo fileInfo) {
        Assert.notNull(fileInfo, "FileInfo can not be null");
        return readFileContent(fileInfo.getUuid());
    }

    @Override
    /**
     * 作为兼容的实现, 只能这么搞了
     * */
    public InputStream readFileContentAsStream(String uuid) {
        if (!StringUtils.hasText(uuid)) {
            throw StorageException.create("File UUID is null or an empty string");
        }
        byte[] data = readFileContent(uuid);
        data = data == null ? new byte[0] : data;
        return new ByteArrayInputStream(data);
    }

    @Override
    public InputStream readFileContentAsStream(FileInfo fileInfo) {
        Assert.notNull(fileInfo, "FileInfo can not be null");
        return readFileContentAsStream(fileInfo.getUuid());
    }

    @Override
    public String getURL(String uuid) {
        if (!StringUtils.hasText(uuid)) {
            throw StorageException.create("File UUID is null or an empty string");
        }
        return factory.getFastDFSDomain() + uuid;
    }

    @Override
    public String getURL(FileInfo fileInfo) {
        Assert.notNull(fileInfo, "FileInfo can not be null");
        return getURL(fileInfo.getUuid());
    }

    @Override
    public boolean delete(String uuid) {
        TrackerServer trackerServer = null;
        try {
            trackerServer = factory.getTrackerServer();
            StorageClient1 client = factory.getStorageClient(trackerServer);
            return client.delete_file1(uuid) == 0;
        } catch (Exception e) {
            throw StorageException.wrap(e);
        } finally {
            if(trackerServer != null) {
                try {
                    trackerServer.close();
                } catch (IOException e) {
                    ; //handled
                }
            }
        }
    }

    @Override
    public boolean delete(FileInfo fileInfo) {
        Assert.notNull(fileInfo, "FileInfo can not be null");
        return delete(fileInfo.getUuid());
    }

    @Override
    public String copy(String uuid, String targetDirectory) {
        logger.error("FastDFS文件系统不支持文件系统Metadata, 无法实现此功能");
        return null;
    }

    @Override
    public String copy(FileInfo fileInfo, String targetDirectory) {
        logger.error("FastDFS文件系统不支持文件系统Metadata, 无法实现此功能");
        return null;
    }

    @Override
    public boolean move(String uuid, String targetDirectory) {
        logger.error("FastDFS文件系统不支持文件系统Metadata, 无法实现此功能");
        return false;
    }

    @Override
    public boolean move(FileInfo fileInfo, String targetDirectory) {
        logger.error("FastDFS文件系统不支持文件系统Metadata, 无法实现此功能");
        return false;
    }

    private String getFileSuffix(String name) {
        int idx = name.lastIndexOf(".");
        if(idx < 0) {
            return "";
        }
        else {
            return name.substring(idx + 1);
        }
    }

    private NameValuePair[] convertMetadata(Properties metadata) {
        if(metadata == null) {
            return new NameValuePair[0];
        }
        Set<Object> keys = metadata.keySet();
        NameValuePair[] ret = new NameValuePair[keys.size()];
        int idx = 0;
        for(Object key : keys) {
            ret[idx++] = new NameValuePair(key.toString(), metadata.getProperty(key.toString()));
        }
        return ret;
    }

    private Properties convertMetadata(NameValuePair[] metadata) {
        Properties ret = new Properties();
        if(metadata != null) {
            for(NameValuePair v : metadata) {
                ret.setProperty(v.getName(), v.getValue());
            }
        }
        return ret;
    }

    private String getAccessibleURL(String uuid) {
        return this.factory.getFastDFSDomain() + uuid;
    }
}
