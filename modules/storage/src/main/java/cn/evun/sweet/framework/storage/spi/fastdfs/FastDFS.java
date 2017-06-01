package cn.evun.sweet.framework.storage.spi.fastdfs;

/**
 * Created by zlbbq on 2017/3/14.
 */


import org.csource.fastdfs.StorageClient1;
import org.csource.fastdfs.TrackerClient;
import org.csource.fastdfs.TrackerServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FastDFS {
    private static final Logger logger = LoggerFactory.getLogger(FastDFS.class);

    private String fastDFSDomain;

    public FastDFS(String fastDFSDomain) {
        this.fastDFSDomain = fastDFSDomain;
    }

    public TrackerServer getTrackerServer() throws Exception {
        TrackerClient tracker = new TrackerClient();;
        return tracker.getConnection();
    }

    public String getFastDFSDomain() {
        return fastDFSDomain;
    }

    public void setFastDFSDomain(String fastDFSDomain) {
        this.fastDFSDomain = fastDFSDomain;
    }

    public StorageClient1 getStorageClient(TrackerServer trackerServer) {
        return new StorageClient1(trackerServer, null);
    }
}
