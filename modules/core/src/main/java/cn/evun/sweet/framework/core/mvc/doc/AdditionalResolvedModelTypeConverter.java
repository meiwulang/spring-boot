package cn.evun.sweet.framework.core.mvc.doc;

import com.fasterxml.classmate.ResolvedType;

/**
 * Created by zlbbq on 16/6/21.
 */
public interface AdditionalResolvedModelTypeConverter {
    ResolvedType convert(ResolvedType resolvedType);
}
