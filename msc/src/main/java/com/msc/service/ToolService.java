package com.msc.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class ToolService {
    public static String jsonPackage(String header, String content){
        return "{\"" + header + "\":\"" + content + "\"}";
    }

    public static Date StoDateTime(String string) throws ParseException {
       return new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" ).parse(string);
    }

    public static Date dealDateFormat(String oldDate) throws ParseException {
        Date date1 = null;
        DateFormat df2 = null;

        oldDate= oldDate.replace("Z", " UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS+ssss");
        Date date = df.parse(oldDate);
        SimpleDateFormat df1 = new SimpleDateFormat ("EEE MMM dd HH:mm:ss Z yyyy", Locale.UK);
        date1 = df1.parse(date.toString());
        df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


        return StoDateTime(df2.format(date1));
    }
}
