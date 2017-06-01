package cn.evun.sweet.framework.core.mvc.data.mybatis.handler;

/**
 * Created by zlbbq on 16/6/27.
 */


import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

//Mybatis类型转换, long型转java.util.Date
public class DateTypeHandler extends BaseTypeHandler<Date> {
//    private static final Logger logger = LoggerFactory.getLogger(DateTypeHandler.class);

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int columnIndex, Date date, JdbcType jdbcType) throws SQLException {
        preparedStatement.setLong(columnIndex, date.getTime());
    }

    @Override
    public Date getNullableResult(ResultSet resultSet, String columnName) throws SQLException {
        long l = resultSet.getLong(columnName);
        return new Date(l);
    }

    @Override
    public Date getNullableResult(ResultSet resultSet, int columnIndex) throws SQLException {
        long l = resultSet.getLong(columnIndex);
        return new Date(l);
    }

    @Override
    public Date getNullableResult(CallableStatement callableStatement, int columnIndex) throws SQLException {
        long l = callableStatement.getLong(columnIndex);
        return new Date(l);
    }
}
