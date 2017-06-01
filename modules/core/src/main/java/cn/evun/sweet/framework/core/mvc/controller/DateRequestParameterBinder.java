package cn.evun.sweet.framework.core.mvc.controller;

/**
 * Created by zlbbq on 16/6/27.
 */


import cn.evun.sweet.framework.common.util.time.DateUtils;
import org.springframework.util.StringUtils;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class DateRequestParameterBinder extends PropertyEditorSupport {
    private boolean useGMTTimeZone = false;
    private static final String DATE_FORMAT_10 = "yyyy-MM-dd";
    private static final String DATETIME_FORMAT_16 = "yyyy-MM-dd HH:mm";
    private static final String DATETIME_FORMAT_19 = "yyyy-MM-dd HH:mm:ss";
    private static final String DATETIME_FORMAT_23 = "yyyy-MM-dd HH:mm:ss:SSS";
    private static final String DATETIME_FORMAT_DEFAULT = "EEE MMM dd HH:mm:ss zzz yyyy";                       //兼容java.util.Date#toString()


    public DateRequestParameterBinder() {
        this(false);
    }

    public DateRequestParameterBinder(boolean useGMTTimeZone) {
        this.useGMTTimeZone = useGMTTimeZone;
    }

    private void assertGMT(SimpleDateFormat sdf) {
        if(this.useGMTTimeZone) {
            sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        }
    }

    /**
     * Parse the Date from the given text, using the specified DateFormat. 
     */
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        if (!StringUtils.hasText(text)) {
            // Treat empty String as null value.  
            setValue(null);
        } else {
            try {
                try {
                    long l = Long.parseLong(text);
                    this.setValue(new Date(l));
                    return ;
                }catch (NumberFormatException e) {
                    ;// handled
                }

                switch (text.length()) {
                    case 10 : {
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_FORMAT_10);
                        assertGMT(simpleDateFormat);
                        setValue(simpleDateFormat.parse(text));
                        break;
                    }
                    case 16 : {
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATETIME_FORMAT_16);
                        assertGMT(simpleDateFormat);
                        setValue(simpleDateFormat.parse(text));
                        break;
                    }
                    case 19 : {
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATETIME_FORMAT_19);
                        assertGMT(simpleDateFormat);
                        setValue(simpleDateFormat.parse(text));
                        break;
                    }
                    case 23 : {
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATETIME_FORMAT_23);
                        assertGMT(simpleDateFormat);
                        setValue(simpleDateFormat.parse(text));
                        break;
                    }
                    default: {
                        /**
                         * 兼容Feign调用时, 传过来的Date#toString()字符串
                         * */
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATETIME_FORMAT_DEFAULT, Locale.ENGLISH);
                        assertGMT(simpleDateFormat);
                        setValue(simpleDateFormat.parse(text));
                        break;
                    }
                }
            } catch (ParseException ex) {
                throw new IllegalArgumentException("Could not parse date: " + ex.getMessage(), ex);
            }
        }
    }

    /**
     * Format the Date as String, using the specified DateFormat. 
     */
    @Override
    public String getAsText() {
        Date value = (Date) getValue();
        return DateUtils.formatDateTime(value);
    }
}
