package cn.evun.sweet.framework.redis.test;
/**
 * Created by zlbbq on 16/5/18.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SampleModel {
    @SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(SampleModel.class);

    private int id;

    private String name;

    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getId() {
        return id;
    }

    @Override
	public String toString() {
		return "id:" + id + ";name:" + this.name + ";age:" + this.age;
	}

	public void setId(int id) {
        this.id = id;
    }
    
    
}
