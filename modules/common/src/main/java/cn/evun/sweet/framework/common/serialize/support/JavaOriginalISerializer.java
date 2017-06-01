package cn.evun.sweet.framework.common.serialize.support;

/**
 * Created by zlbbq on 16/5/12.
 */

import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.SerializeException;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * java 原始序列化
 */
public class JavaOriginalISerializer implements ISerializer {

    public byte[] serialize(Object object) throws SerializeException {
        if (object == null) {
            return null;
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream(1024);
        try {
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(object);
            oos.flush();
        }
        catch (Exception ex) {
            throw new SerializeException(ex.getMessage(), ex);
        }
        return baos.toByteArray();
    }

    public <T> T deserialize(byte[] bytes, Class<T> tpl) throws SerializeException {
        if (bytes == null || bytes.length == 0) {
            return null;
        }
        try {
            ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(bytes));
            return (T)ois.readObject();
        }
        catch (Exception ex) {
            throw new SerializeException(ex.getMessage(), ex);
        }
    }

}
