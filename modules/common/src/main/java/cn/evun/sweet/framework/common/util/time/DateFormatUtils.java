package cn.evun.sweet.framework.common.util.time;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by XianXiang.Qiu on 2016/6/2.
 */
public class DateFormatUtils extends org.apache.commons.lang3.time.DateFormatUtils{



    public static Date parseFormattedDateString(String strDate, String pattern) {
        DateFormat df = getDateFormat(pattern);
        return  getFormattedDate(strDate,df);
    }

    public static Date getFormattedDate(String strDate, DateFormat df) {
        try {
            return df.parse(strDate);
        } catch (Exception ex) {
            throw new RuntimeException("日期格式不对，无法解析。", ex);
        }
    }

    /**
     * 获得系统当前的日期时间。就是将System.currentTimeMillis()用yyyy-MM-dd hh:mm:ss
     * 格式显示，小时按12小时计。
     */
    public static String getCurrentDateTime() {
        return getDateTimeFormat().format(new Date());
    }

    private static DateFormat getDateFormat() {
        return getDateFormat(DateFormatConstants.DATE_FORMAT);
    }

    private static DateFormat getDateTimeFormat() {
        return getDateFormat(DateFormatConstants.DATE_TIME_FORMAT);
    }

    private static DateFormat getDateFormat(String format) {
        return new SimpleDateFormat(format);
    }

    public static void main(String[] args) {
        System.out.println(DateFormatUtils.format(new Date(),"yyyy-MM-dd"));
    }
}
