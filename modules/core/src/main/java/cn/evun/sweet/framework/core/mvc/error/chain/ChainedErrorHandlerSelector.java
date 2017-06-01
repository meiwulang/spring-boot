package cn.evun.sweet.framework.core.mvc.error.chain;

import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;

/**
 * Created by zlbbq on 2017/3/8.
 */


public interface ChainedErrorHandlerSelector {
    ChainedErrorHandler[] select(ChainedErrorHandler[] errorHandlers);

    class Default implements ChainedErrorHandlerSelector {
        @Override
        public ChainedErrorHandler[] select(ChainedErrorHandler[] errorHandlers) {
            ArrayList list = new ArrayList();
            list.addAll(CollectionUtils.arrayToList(errorHandlers));
            Arrays.sort(errorHandlers, new Comparator() {
                @Override
                public int compare(Object o1, Object o2) {
                    if (o1 instanceof ChainedErrorHandler && o2 instanceof ChainedErrorHandler) {
                        return ((ChainedErrorHandler) o1).getOrder() - ((ChainedErrorHandler) o2).getOrder();
                    }
                    return 0;
                }
            });
            return errorHandlers;
        }
    }
}
