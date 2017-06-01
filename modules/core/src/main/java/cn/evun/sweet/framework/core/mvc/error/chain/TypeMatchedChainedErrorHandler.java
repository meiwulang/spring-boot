package cn.evun.sweet.framework.core.mvc.error.chain;

/**
 * Created by zlbbq on 2017/3/8.
 */


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class TypeMatchedChainedErrorHandler extends ChainedErrorHandler {
    private static final Logger logger = LoggerFactory.getLogger(TypeMatchedChainedErrorHandler.class);

    protected Class<? extends Throwable>[] targetTypes;

    public TypeMatchedChainedErrorHandler(String name, Class<? extends Throwable>[] targetTypes) {
        super(name);
        this.targetTypes = targetTypes;
    }

    public boolean isTarget(Throwable t) {
        if(this.targetTypes != null) {
            for(Class<? extends Throwable> type : this.targetTypes) {
                if(t.getClass().equals(type)) {
                    return true;
                }
            }
        }
        return false;
    }
}
