package cn.evun.sweet.framework.common.util;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;


/**
 * Created by zhy on 17/3/9.
 */

public class PinYinUtils {

    private static HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();

    /**
     * 大小写
     * */
    public static final int LOWERCASE = 0;
    public static final int UPPERCASE = 1;
    /**
     * 音标,如：
     * WITHOUT_TONE:liu
     * WITH_TONE_NUMBER:liu2
     * WITH_TONE_MARK:liú
     * */
    public static final int WITHOUT_TONE = 0;
    public static final int WITH_TONE_NUMBER = 1;
    public static final int WITH_TONE_MARK = 2;
    /**
     * 特殊字符,如：
     * WITH_U_AND_COLON:u: 
     * WITH_V:v 
     * WITH_U_UNICODE:ü
     * */
    public static final int WITH_V = 0;
    public static final int WITH_U_AND_COLON = 1;
    public static final int WITH_U_UNICODE = 2;

    {
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        format.setVCharType(HanyuPinyinVCharType.WITH_V);
    }

    public static String[] getPinYin(char single){
        String[] str = null;
        try {
            str = PinyinHelper.toHanyuPinyinStringArray(single,format);
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            e.printStackTrace();
        }
        if(str == null || str.length == 0){
            str = new String[]{ single + ""};
        }
        return str;
    }

    /**
     * 描述：针对每一个汉字获取多音字数组第一个字符串的第一个字母
     * 多音字默认取第一个
     * 获取每个拼音的首字母
     * 英文字母和特殊字符为字符本身
     * */
    public static String getPinYinFirstChar(String str){
        String firstName = "";
        try {
            if (str == null) {
                return null;
            }
            int length = str.length();

            for (int i = 0; i < length; i++) {
                String[] sArr = getPinYin(str.charAt(i));
                firstName += sArr[0].charAt(0);
            }
        }catch (Exception e){

        }
        return firstName;
    }

    public static String[] getPinYin(char single,Integer caseType,Integer toneType,Integer vCharType){

        setFormat(caseType, toneType, vCharType);
        String[] str = getPinYin(single);

        return str;
    }

    private static void setFormat(Integer caseType,Integer toneType,Integer vCharType){

        if(caseType != null){
            if(caseType.intValue() == LOWERCASE){
                format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
            }else if(caseType.intValue() == UPPERCASE){
                format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
            }
        }

        if(toneType != null){
            if(toneType.intValue() == WITHOUT_TONE){
                format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
            }else if(toneType.intValue() == WITH_TONE_MARK){
                format.setToneType(HanyuPinyinToneType.WITH_TONE_MARK);
            }else if(toneType.intValue() == WITH_TONE_NUMBER){
                format.setToneType(HanyuPinyinToneType.WITH_TONE_NUMBER);
            }
        }

        if(vCharType != null){
            if(vCharType.intValue() == WITH_V){
                format.setVCharType(HanyuPinyinVCharType.WITH_V);
            }else if(vCharType.intValue() == WITH_U_AND_COLON){
                format.setVCharType(HanyuPinyinVCharType.WITH_U_AND_COLON);
            }else if(vCharType.intValue() == WITH_U_UNICODE){
                format.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);
            }
        }
    }





    /**
     * 汉字转换位汉语拼音首字母，英文字符不变，特殊字符丢失 支持多音字，生成方式如（长沙市长:cssc,zssz,zssc,cssz）
     *
     * @param chines
     *            汉字
     * @return 拼音
     */
    public static String converterToFirstSpell(String chines) {
        StringBuffer pinyinName = new StringBuffer();
        char[] nameChar = chines.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for (int i = 0; i < nameChar.length; i++) {
            if (nameChar[i] > 128) {
                try {
                    // 取得当前汉字的所有全拼
                    String[] strs = PinyinHelper.toHanyuPinyinStringArray(
                            nameChar[i], defaultFormat);
                    if (strs != null) {
                        for (int j = 0; j < strs.length; j++) {
                            // 取首字母
                            pinyinName.append(strs[j].charAt(0));
                            if (j != strs.length - 1) {
                                pinyinName.append(",");
                            }
                        }
                    }
                    // else {
                    // pinyinName.append(nameChar[i]);
                    // }
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            } else {
                pinyinName.append(nameChar[i]);
            }
            pinyinName.append(" ");
        }
        // return pinyinName.toString();
        return parseTheChineseByObject(discountTheChinese(pinyinName.toString()));
    }

    /**
     * 汉字转换位汉语全拼，英文字符不变，特殊字符丢失
     * 支持多音字，生成方式如（重当参:zhongdangcen,zhongdangcan,chongdangcen
     * ,chongdangshen,zhongdangshen,chongdangcan）
     *
     * @param chines
     *            汉字
     * @return 拼音
     */
    public static String converterToSpell(String chines) {
        StringBuffer pinyinName = new StringBuffer();
        char[] nameChar = chines.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for (int i = 0; i < nameChar.length; i++) {
            if (nameChar[i] > 128) {
                try {
                    // 取得当前汉字的所有全拼
                    String[] strs = PinyinHelper.toHanyuPinyinStringArray(
                            nameChar[i], defaultFormat);
                    if (strs != null) {
                        for (int j = 0; j < strs.length; j++) {
                            pinyinName.append(strs[j]);
                            if (j != strs.length - 1) {
                                pinyinName.append(",");
                            }
                        }
                    }
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            } else {
                pinyinName.append(nameChar[i]);
            }
            pinyinName.append(" ");
        }
        // return pinyinName.toString();
        return parseTheChineseByObject(discountTheChinese(pinyinName.toString()));
    }

    /**
     * 去除多音字重复数据
     *
     * @param theStr
     * @return
     */
    private static List<Map<String, Integer>> discountTheChinese(String theStr) {
        // 去除重复拼音后的拼音列表
        List<Map<String, Integer>> mapList = new ArrayList<Map<String, Integer>>();
        // 用于处理每个字的多音字，去掉重复
        Map<String, Integer> onlyOne = null;
        String[] firsts = theStr.split(" ");
        // 读出每个汉字的拼音
        for (String str : firsts) {
            onlyOne = new Hashtable<String, Integer>();
            String[] china = str.split(",");
            // 多音字处理
            for (String s : china) {
                Integer count = onlyOne.get(s);
                if (count == null) {
                    onlyOne.put(s, new Integer(1));
                } else {
                    onlyOne.remove(s);
                    count++;
                    onlyOne.put(s, count);
                }
            }
            mapList.add(onlyOne);
        }
        return mapList;
    }

    /**
     * 解析并组合拼音，对象合并方案(推荐使用)
     *
     * @return
     */
    private static String parseTheChineseByObject(
            List<Map<String, Integer>> list) {
        Map<String, Integer> first = null; // 用于统计每一次,集合组合数据
        // 遍历每一组集合
        for (int i = 0; i < list.size(); i++) {
            // 每一组集合与上一次组合的Map
            Map<String, Integer> temp = new Hashtable<String, Integer>();
            // 第一次循环，first为空
            if (first != null) {
                // 取出上次组合与此次集合的字符，并保存
                for (String s : first.keySet()) {
                    for (String s1 : list.get(i).keySet()) {
                        String str = s + s1;
                        temp.put(str, 1);
                    }
                }
                // 清理上一次组合数据
                if (temp != null && temp.size() > 0) {
                    first.clear();
                }
            } else {
                for (String s : list.get(i).keySet()) {
                    String str = s;
                    temp.put(str, 1);
                }
            }
            // 保存组合数据以便下次循环使用
            if (temp != null && temp.size() > 0) {
                first = temp;
            }
        }
        String returnStr = "";
        if (first != null) {
            // 遍历取出组合字符串
            for (String str : first.keySet()) {
                returnStr += (str + ",");
            }
        }
        if (returnStr.length() > 0) {
            returnStr = returnStr.substring(0, returnStr.length() - 1);
        }
        return returnStr;
    }


}

