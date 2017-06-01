package cn.evun.sweet.framework.common.serialize.support;

import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.SerializeException;
import com.caucho.hessian.io.HessianInput;
import com.caucho.hessian.io.HessianOutput;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by XianXiang.Qiu on 2016/5/25.
 */
public class HessianSerializer implements ISerializer{
    @Override
    public byte[] serialize(Object obj) throws SerializeException {
        if(obj==null) {
            return new byte[0];
        }

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        HessianOutput ho = new HessianOutput(os);
        try {
            ho.writeObject(obj);
        } catch (IOException e) {
            throw new SerializeException(e.getMessage(), e);
        }
        return os.toByteArray();
    }

    @Override
    public <T> T deserialize(byte[] data, Class<T> tpl) throws SerializeException {
        if(data == null || data.length == 0) {
            return null;
        }
        ByteArrayInputStream is = new ByteArrayInputStream(data);
        HessianInput hi = new HessianInput(is);
        try {
            Object o = hi.readObject();
            return (T)o;
        } catch (IOException e) {
            throw new SerializeException(e.getMessage(), e);
        }
    }

}
