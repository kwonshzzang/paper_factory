package kr.re.etri.paper.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.re.etri.batis.domain.EnergyGoal;
import kr.re.etri.batis.domain.RawTagDate;
import kr.re.etri.batis.mapper.EnergyGoalMapper;
import kr.re.etri.batis.mapper.EnergyUsageMapper;
import kr.re.etri.batis.mapper.RawTagDateMapper;
import kr.re.etri.paper.csv.ELEC;
import kr.re.etri.paper.utils.CalcUtils;
import kr.re.etri.paper.utils.CsvUtils;

@Service
public class ElecService {
	
	@Autowired
	RawTagDateMapper mapper_raw;
	
	@Autowired
	EnergyUsageMapper mapper_energy_usage;

	List<ELEC> LIST_ELEC = null;

	@PostConstruct
	public void Init() {
		LIST_ELEC = CsvUtils.readDataFromCsvForELEC("./datas/energy/energy_01.csv");
	}
	
	public List<ELEC> getList(){
		return LIST_ELEC;
	}
	
	public int insert_Raw(RawTagDate item) {
		return mapper_raw.insert(item);
	}
	
	public void callInsert() {
		LIST_ELEC.forEach(item -> {
			RawTagDate kw1 = getTag(item.getDate(), "HFEMS.MRPAP.01.SH02.PM001.01.KW", item.getKw1());
			RawTagDate kw2 = getTag(item.getDate(), "HFEMS.MRPAP.01.SH02.PM001.02.KW", item.getKw2());
			RawTagDate kw3 = getTag(item.getDate(), "HFEMS.MRPAP.01.SH02.PM001.03.KW", item.getKw3());
			RawTagDate kwh1 = getTag(item.getDate(), "HFEMS.MRPAP.01.SH02.PM001.01.KWH", item.getKwh1());
			RawTagDate kwh2 = getTag(item.getDate(), "HFEMS.MRPAP.01.SH02.PM001.02.KWH", item.getKwh2());
			RawTagDate kwh3 = getTag(item.getDate(), "HFEMS.MRPAP.01.SH02.PM001.03.KWH", item.getKwh3());
			
			insert_Raw(kw1);
			insert_Raw(kw2);
			insert_Raw(kw3);
			insert_Raw(kwh1);
			insert_Raw(kwh2);
			insert_Raw(kwh3);
		});
	}
	
	public RawTagDate getTag(String date, String name, String val) {
		RawTagDate data = new RawTagDate();
		Date time = CalcUtils.GetDateFromString("yyyy-MM-dd HH:mm", date);
		
		if(val == null || val.length() == 0) {
			val = "0";
		}
		
		data.setMeasureDate(time);
		data.setTagId(name);
		data.setValue(new BigDecimal(val));
		
		return data;
	}
	
	/* ----------------------------------------------------
	 *
	 * 데이터 검색
	 *
	 * -------------------------------------------------- */
	
	/**
	 * 현재 태그에 해당하는 최신 데이터 검색
	 * @param tagid
	 * @return
	 */
	public RawTagDate getData_NowData(String tagid){
		return mapper_raw.selectNowData(tagid);
	}
	
	/**
	 * 현재 태그에 해당하는 오늘 15분 단위 사용현황
	 * @param tagid
	 * @return
	 */
	public List<RawTagDate> getList_TodayBetween_15(String tagid){
		return mapper_raw.selectTodayBetween15(tagid);
	}
	
	/**
	 * 현재 태그에 해당하는 어제 15분 단위 사용현황
	 * @param tagid
	 * @return
	 */
	public List<RawTagDate> getList_TodayYesterDay_15(String tagid){
		return mapper_raw.selectYesterdayBetween15(tagid);
	}
	
	/**
	 * 현재 태그에 해당하는 오늘 15분 단위 사용현황
	 * @param tagid
	 * @return
	 */
	public List<RawTagDate> getList_TodayBetween_15_Total(){
		
		return mapper_raw.selectTodayBetween15Total();
	}
	
	/**
	 * 현재 태그에 해당하는 어제 15분 단위 사용현황
	 * @param tagid
	 * @return
	 */
	public List<RawTagDate> getList_TodayYesterDay_15_Total(){
		
		return mapper_raw.selectYesterdayBetween15Total();
	}
	
	public Map<String, Object> getData_Energy_Usage(String type) {
		Date now = new Date();
		
		Calendar cal = new GregorianCalendar();
		cal.add(Calendar.DATE, -1);		
		
		String today_from = CalcUtils.GetDateStringFromDate(now, "yyyy-MM-dd") + " 00:00:00";
		String today_to = CalcUtils.GetDateStringFromDate(now, "yyyy-MM-dd HH:mm:ss");
		String yesterday_from = CalcUtils.GetDateStringFromDate(cal.getTime(), "yyyy-MM-dd") + " 00:00:00";
		String yesterday_to = CalcUtils.GetDateStringFromDate(cal.getTime(), "yyyy-MM-dd") + " 23:59:59";
				
		Map<String, Object> today = mapper_energy_usage.selectEnergyUsage(today_from, today_to, type);
		Map<String, Object> yesterday = mapper_energy_usage.selectEnergyUsage(yesterday_from, yesterday_to, type);
		Map<String, Object> max = mapper_energy_usage.selectEnergyUsageMax(today_to, type);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("today", today);
		result.put("yesterday", yesterday);
		result.put("max", max);
		
		
		return result;
	}
	

	public Map<String, Object> getData_Energy_Cost(String type) {

		Map<String, Object> result = new HashMap<String, Object>();

		Map<String, Object> now = mapper_energy_usage.selectEnergyUsageCost(type);
		Map<String, Object> total = mapper_energy_usage.selectEnergyUsageCostTotal(type);		
		
		result.put("now", now);
		result.put("total", total);
		
		return result;
	}
	
}
