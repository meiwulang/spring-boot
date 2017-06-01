package cn.evun.sweet.framework.common.util.time;

/**
 * Created by XianXiang.Qiu on 2016/6/2.
 */
public class DateFormatConstants {

    public final static String DATE_FORMAT = "yyyy-MM-dd";

    public final static String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public static final String CHINA_MINITE_DATE_PATTERN = "yyyy年MM月dd日  HH:mm";

    public static final String MAIL_CHINA_MINITE_DATE_PATTERN = "yyyy年MM月dd日 HH:mm (EEE)";

    public static final String SHORT_DATE_PATTERN = "yyyy-MM-dd";

    public static final String CHINA_MONTH_DAY_DATE_PATTERN = "MM月dd日";

    public static final String CHINA_MONTH_DATE_PATTERN = "MM月dd日  HH:mm";

    public static final String HOUR_MINITE_PATTERN = "HH:mm";

    public static final String SECOND_PATTERN = "HH:mm:ss";

    public static final String MINITE_DATE_PATTERN = "yyyy-MM-dd HH:mm";

    /** yyyy-MM */
    public static final int FORMAT_SHORDATE = 0;

    /** yyyy-MM-dd */
    public static final int FORMAT_DATE = 1;

    /** yyyy-MM-dd HH:mm:ss */
    public static final int FORMAT_DATETIME = 2;

    /** yyyy-MM-dd HH:mm:ss.sssz */
    public static final int FORMAT_DATETIMEMILLISECOND = 3;

    /** yyyy */
    public static final int FORMAT_YYMMDD = 4;

    /** yyyyMMdd */
    public static final int FORMAT_YYYYMMDD = 5;

    /** yyyy年MM月dd日 */
    public static final int FORMAT_DATESTRING = 6;

    /** 一天有多少毫秒 */
    public static final int ONE_DAY_MILLISECOND = 86400000;


}
