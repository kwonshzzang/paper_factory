package kr.re.etri.paper.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class CalcUtils {

	static SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	static Date nowdate = new Date();
	
	public static float Get_Random_Max(int max, double seed) {
		float result = 0;
		Random rand = new Random();
		rand.setSeed((long)(System.currentTimeMillis() * seed));
		
		result = rand.nextFloat() * max;
		
		result = Float.parseFloat(String.format("%.2f", result));
		
		return result;
	}
	
	public static String GetDateString(Timestamp time) {
		if(time == null) {
			return "";
		}
		
		try {
			return sf.format(time);
			
		}catch(Exception e) {
			return "";
		}
	}
	
	public static void SetNow(int year, int month, int day, int hour, int min) {
		Calendar cal = Calendar.getInstance();
		cal.set(year, month, day, hour, min);
		
		nowdate = new Date(cal.getTimeInMillis());
	}

	
	public static String GetNowString() {
		String result = "";
		Date date = new Date();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		result = sdf.format(date);
		
		return result;
	}
	
	public static String GetNowString(String format) {
		String result = "";
		Date date = new Date();
		
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		result = sdf.format(date);
		
		return result;
	}
	
	public static String GetDateStringFromDate(Date date, String format) {
		String result = "";
		
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		result = sdf.format(date);
		
		return result;
	}
	
	public static Date GetDateFromString(String format, String str) {
		Date date = null;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			date = sdf.parse(str);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return date;
	}
	
	public static int GetNowDay() {
		return LocalDate.now().getDayOfMonth();
	}
	
	
	
	
}
