package cn.evun.sweet.framework.storage;

/**
 * Created by zlbbq on 2017/3/14.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class SecurityFileTypeStorageService implements StorageService {
    private static final Logger logger = LoggerFactory.getLogger(SecurityFileTypeStorageService.class);

    private static final String [] UNSUPPORTED_FILE_TYPES = {
            ".bat", ".sh", ".exe"
    };

    @Override
    public boolean isSupportedType(String name) {
        for(String suffix : UNSUPPORTED_FILE_TYPES) {
            if(name.endsWith(suffix)) {
                return false;
            }
        }
        return true;
    }
}
