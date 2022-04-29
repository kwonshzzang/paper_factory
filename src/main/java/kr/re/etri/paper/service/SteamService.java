package kr.re.etri.paper.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.re.etri.batis.domain.RawTagDate;
import kr.re.etri.batis.mapper.EnergyGoalMapper;
import kr.re.etri.batis.mapper.RawTagDateMapper;
import kr.re.etri.paper.csv.Flux;
import kr.re.etri.paper.utils.CalcUtils;
import kr.re.etri.paper.utils.CsvUtils;

@Service
public class SteamService {
	
	@Autowired
	RawTagDateMapper mapper_raw;

	List<Flux> LIST_FLUX = null;
	List<Flux> LIST_TOTAL_FLUX = null;
	List<Flux> LIST_TEMP = null;
	List<Flux> LIST_PRESS = null;

	@PostConstruct
	public void Init() {
		LIST_FLUX = CsvUtils.readDataFromCsvForFlux("./datas/energy/energy_02.csv");
		LIST_TOTAL_FLUX = CsvUtils.readDataFromCsvForFlux("./datas/energy/energy_03.csv");
		LIST_TEMP = CsvUtils.readDataFromCsvForFlux("./datas/energy/energy_04.csv");
		LIST_PRESS = CsvUtils.readDataFromCsvForFlux("./datas/energy/energy_05.csv");
	}
	
	public List<Flux> getListVal(){
		return LIST_FLUX;
	}
	
	public List<Flux> getListValSum(){
		return LIST_TOTAL_FLUX;
	}
	
	public List<Flux> getListTemp(){
		return LIST_TEMP;
	}
	
	public List<Flux> getListPress(){
		return LIST_PRESS;
	}
	
	public int insert_Raw(RawTagDate item) {
		return mapper_raw.insert(item);
	}
	
	public void callInsert() {
		/*
		LIST_FLUX.forEach(item -> {
			try {
				RawTagDate data = getTag(item.getDate(), item.getName(), item.getValue());
				insert_Raw(data);
			}catch(Exception e){
				
			}
		});
		*/

		LIST_TOTAL_FLUX.forEach(item -> {
			try {
				if(item.getDate() != null && item.getDate().length() > 0) {
					RawTagDate data = getTag(item.getDate(), item.getName(), item.getValue());
					insert_Raw(data);
				}
			}catch(Exception e){
				
			}
		});

		LIST_TEMP.forEach(item -> {
			try {
				if(item.getDate() != null && item.getDate().length() > 0) {
					RawTagDate data = getTag(item.getDate(), item.getName(), item.getValue());
					insert_Raw(data);
				}
			}catch(Exception e){
				
			}
		});

		LIST_PRESS.forEach(item -> {
			try {
				if(item.getDate() != null && item.getDate().length() > 0) {
					RawTagDate data = getTag(item.getDate(), item.getName(), item.getValue());
					insert_Raw(data);
				}
			}catch(Exception e){
				
			}
		});
	}

	public RawTagDate getTag(String date, String name, String val) {
		RawTagDate data = new RawTagDate();
		Date time = CalcUtils.GetDateFromString("yyyy-MM-dd HH:mm:ss", date);
		
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
	
	public List<Map<String, String>> getList_RawTagDate_Day(String type, String from, String to){
		return mapper_raw.selectPerDay(type, from, to);
	}
	
	public List<Map<String, String>> getList_RawTagDate_Week(String type, String from, String to){
		return mapper_raw.selectPerWeek(type, from, to);
	}
	
	public List<Map<String, String>> getList_RawTagDate_Month(String type, String from, String to){
		return mapper_raw.selectPerMonth(type, from, to);
	}
	
	public List<Map<String, String>> getList_RawTagDate_Year(String type, String from, String to){
		return mapper_raw.selectPerYear(type, from, to);
	}
	

	
	public List<Map<String, String>> getList_RawTagDate_Day_Total(String name1, String name2, String name3, String from, String to){
		return mapper_raw.selectTotalPerDay(name1, name2, name3, from, to);
	}
	
	public List<Map<String, String>> getList_RawTagDate_Week_Total(String name1, String name2, String name3, String from, String to){
		return mapper_raw.selectTotalPerWeek(name1, name2, name3, from, to);
	}
	
	public List<Map<String, String>> getList_RawTagDate_Month_Total(String name1, String name2, String name3, String from, String to){
		return mapper_raw.selectTotalPerMonth(name1, name2, name3, from, to);
	}
	
	public List<Map<String, String>> getList_RawTagDate_Year_Total(String name1, String name2, String name3, String from, String to){
		return mapper_raw.selectTotalPerYear(name1, name2, name3, from, to);
	}
}
