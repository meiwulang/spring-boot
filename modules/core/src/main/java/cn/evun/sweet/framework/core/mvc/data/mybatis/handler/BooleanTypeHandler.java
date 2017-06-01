package cn.evun.sweet.framework.core.mvc.data.mybatis.handler;

/**
 * Created by zlbbq on 16/6/28.
 */


import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BooleanTypeHandler extends BaseTypeHandler<Boolean> {
//    private static final Logger logger = LoggerFactory.getLogger(BooleanTypeHandler.class);

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int columnIndex, Boolean v, JdbcType jdbcType) throws SQLException {
        if (jdbcType.equals(JdbcType.INTEGER) || jdbcType.equals(JdbcType.TINYINT) || jdbcType.equals(JdbcType.BIGINT) || jdbcType.equals(JdbcType.BIT)) {
            preparedStatement.setByte(columnIndex, v ? (byte) 1 : (byte) 0);
        } else if (jdbcType.equals(JdbcType.CHAR) || jdbcType.equals(JdbcType.VARCHAR)) {
            preparedStatement.setString(columnIndex, v ? "1" : "0");
        } else {
            throw new SQLException("Can not convert column value to [Boolean], supported column types are [INT, TINYINT, BIGINT, CHAR, VARCHAR]");
        }
    }

    @Override
    public Boolean getNullableResult(ResultSet resultSet, String columnName) throws SQLException {
        String s = resultSet.getString(columnName);
        return "1".equals(s);
    }

    @Override
    public Boolean getNullableResult(ResultSet resultSet, int columnIndex) throws SQLException {
        String s = resultSet.getString(columnIndex);
        return "1".equals(s);
    }

    @Override
    public Boolean getNullableResult(CallableStatement callableStatement, int columnIndex) throws SQLException {
        String s = callableStatement.getString(columnIndex);
        return "1".equals(s);
    }
}
