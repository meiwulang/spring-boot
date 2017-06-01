package cn.evun.sweet.framework.common.serialize.support;

/**
 * Created by zlbbq on 16/5/12.
 */

import cn.evun.sweet.framework.common.serialize.ISerializer;
import cn.evun.sweet.framework.common.serialize.SerializeException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;

public class JSONSerializer implements ISerializer {
    private static final Logger logger = LoggerFactory.getLogger(JSONSerializer.class);

    private static ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        objectMapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, true);
        objectMapper.configure(SerializationFeature.FLUSH_AFTER_WRITE_VALUE, true);
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    private String charset = "utf-8";

    private boolean slowSerializeHappened = false;

    public byte[] serialize(Object o) throws SerializeException {
        if (o == null) return new byte[0];

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Writer writer = null;
        try {
            writer = new OutputStreamWriter(baos, charset);
            objectMapper.writeValue(writer, o);
        } catch (Exception e) {
            throw new SerializeException(e.getMessage(), e);
        }
        byte[] data = baos.toByteArray();
        try {
            baos.close();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
        long end = System.currentTimeMillis();
        return data;
    }

    public <T> T deserialize(byte[] data, Class<T> tpl) throws SerializeException {
        if (data == null || data.length == 0) return null;

        Object object = null;
        String s = null;

        try {
            s = new String(data, charset);
        } catch (UnsupportedEncodingException e) {
            throw new SerializeException(e.getMessage(), e);
        }

        try {
            object = objectMapper.readValue(s, TypeFactory.rawClass(tpl));
        } catch (Exception e) {
            throw new SerializeException("error while parsing json character -> " + s.replaceAll("\\r\\n", ""), e);
        }

        long end = System.currentTimeMillis();
        return (T) object;
    }

    public void setCharset(String charset) {
        this.charset = charset;
    }

    public String serialize2JSON(Object o) throws SerializeException {
        try {
            return new String(this.serialize(o), this.charset);
        }catch(UnsupportedEncodingException e) {
            throw new SerializeException(e.getMessage(), e);
        }
    }
}
