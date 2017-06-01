package cn.evun.sweet.framework.common.serialize;

/**
 * Created by zlbbq on 16/5/24.
 */


public interface ISerializer {
    byte[] serialize(Object o) throws SerializeException;

    <T> T deserialize(byte[] data, Class<T> tpl) throws SerializeException;
}
