package kr.re.etri.paper.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.re.etri.batis.domain.EnergyGoal;
import kr.re.etri.batis.domain.Product;
import kr.re.etri.batis.domain.ProductPlan;
import kr.re.etri.batis.domain.RawTagDate;
import kr.re.etri.paper.utils.CalcUtils;
import kr.re.etri.paper.utils.TagName;

@Service
public class DataAggregatorService {

	@Autowired
	SteamService SERVICE_STEAM;
	
	@Autowired
	ElecService SERVICE_ELEC;
	
	@Autowired
	EquipmentService SERVICE_TAGS;	

	@Autowired
	PlanService SERVICE_PLAN;
	
	@Autowired
	CategoryService SERVICE_CATEGORY;

	@Autowired
	EquipmentService SERVICE_EQUIPMENT;
		



	/* ----------------------------------------------------
	 *
	 * Dashboard Page 관련 정보 검색
	 *
	 * -------------------------------------------------- */	


	public Map<String, Object> getDashboard_Realtime(){
		Map<String, Object> result = new HashMap<>();
		
		result.put("steam", getDashboard_DATA_STEAM());
		result.put("elec", getDashboard_DATA_ELEC());
		result.put("pre_dryer", getDashboard_DATA_EQUIPMENT_PRE_DRYER());
		result.put("size_press", getDashboard_DATA_EQUIPMENT_SIZE_PRESS());
		result.put("after_dryer", getDashboard_DATA_EQUIPMENT_AFTER_DRYER());
		result.put("reel", getDashboard_DATA_EQUIPMENT_REEL());
		
		return result;
	}

	public Map<String, Object> getDashboard_DATA_STEAM(){
		Map<String, Object> result = new HashMap<>();
		
		RawTagDate val = SERVICE_STEAM.getData_NowData(TagName.TAG_STEAM_VAL);
		RawTagDate sum = SERVICE_STEAM.getData_NowData(TagName.TAG_STEAM_VAL_SUM);
		RawTagDate press = SERVICE_STEAM.getData_NowData(TagName.TAG_STEAM_PRESS);
		RawTagDate temp = SERVICE_STEAM.getData_NowData(TagName.TAG_STEAM_TEMP);

		result.put("val", val);
		result.put("sum", sum);
		result.put("press", press);
		result.put("temp", temp);
		
		return result;
	}

	public Map<String, Object> getDashboard_DATA_ELEC(){
		Map<String, Object> result = new HashMap<>();

		RawTagDate drive51_kw = SERVICE_STEAM.getData_NowData(TagName.TAG_ELEC_DRIVE_KW_01);
		RawTagDate drive51_kwh = SERVICE_STEAM.getData_NowData(TagName.TAG_ELEC_DRIVE_KWH_01);
		RawTagDate drive52_kw = SERVICE_STEAM.getData_NowData(TagName.TAG_ELEC_DRIVE_KW_02);
		RawTagDate drive52_kwh = SERVICE_STEAM.getData_NowData(TagName.TAG_ELEC_DRIVE_KWH_02);
		RawTagDate drive53_kw = SERVICE_STEAM.getData_NowData(TagName.TAG_ELEC_DRIVE_KW_03);
		RawTagDate drive53_kwh = SERVICE_STEAM.getData_NowData(TagName.TAG_ELEC_DRIVE_KWH_03);

		result.put("drive51_kw", drive51_kw);
		result.put("drive51_kwh", drive51_kwh);
		result.put("drive52_kw", drive52_kw);
		result.put("drive52_kwh", drive52_kwh);
		result.put("drive53_kw", drive53_kw);
		result.put("drive53_kwh", drive53_kwh);
		
		return result;
	}

	public Map<String, Object> getDashboard_DATA_EQUIPMENT_PRE_DRYER(){
		Map<String, Object> result = new HashMap<>();
		
		Map<String, Object> step1 = new HashMap<>();
		Map<String, Object> step2 = new HashMap<>();
		Map<String, Object> step3 = new HashMap<>();
		Map<String, Object> step4 = new HashMap<>();
		
		RawTagDate step1_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_1);
		RawTagDate step1_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_1);
		RawTagDate step2_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_2);
		RawTagDate step2_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_2);
		RawTagDate step3_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_3);
		RawTagDate step3_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_3);
		RawTagDate step4_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_4);
		RawTagDate step4_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_4);
		
		step1.put("pv", step1_pv);
		step1.put("sp", step1_sp);
		step2.put("pv", step2_pv);
		step2.put("sp", step2_sp);
		step3.put("pv", step3_pv);
		step3.put("sp", step3_sp);
		step4.put("pv", step4_pv);
		step4.put("sp", step4_sp);

		result.put("step1", step1);
		result.put("step2", step2);
		result.put("step3", step3);
		result.put("step4", step4);
		
		return result;
	}

	public Map<String, Object> getDashboard_DATA_EQUIPMENT_SIZE_PRESS(){
		Map<String, Object> result = new HashMap<>();
		
		Map<String, Object> weight = new HashMap<>();
		Map<String, Object> moisture = new HashMap<>();
		Map<String, Object> dryer = new HashMap<>();
		
		RawTagDate weight_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRESS_WEIGHT_PV);
		RawTagDate weight_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRESS_WEIGHT_SP);
		RawTagDate moisture_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRESS_MOISTURE_PV);
		RawTagDate moisture_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRESS_MOISTURE_SP);
		RawTagDate dryer_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRESS_PRE_DRYER_PV);
		RawTagDate dryer_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_PRESS_PRE_DRYER_SP);
		
		weight.put("pv", weight_pv);
		weight.put("sp", weight_sp);
		moisture.put("pv", moisture_pv);
		moisture.put("sp", moisture_sp);
		dryer.put("pv", dryer_pv);
		dryer.put("sp", dryer_sp);

		result.put("weight", weight);
		result.put("moisture", moisture);
		result.put("dryer", dryer);
		
		return result;
	}

	public Map<String, Object> getDashboard_DATA_EQUIPMENT_AFTER_DRYER(){
		Map<String, Object> result = new HashMap<>();
		
		Map<String, Object> step1 = new HashMap<>();
		Map<String, Object> step2 = new HashMap<>();
		Map<String, Object> step3 = new HashMap<>();
		
		RawTagDate step1_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_1);
		RawTagDate step1_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_1);
		RawTagDate step2_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_2);
		RawTagDate step2_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_2);
		RawTagDate step3_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_3);
		RawTagDate step3_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_3);
		
		step1.put("pv", step1_pv);
		step1.put("sp", step1_sp);
		step2.put("pv", step2_pv);
		step2.put("sp", step2_sp);
		step3.put("pv", step3_pv);
		step3.put("sp", step3_sp);

		result.put("step1", step1);
		result.put("step2", step2);
		result.put("step3", step3);
		
		return result;
	}

	public Map<String, Object> getDashboard_DATA_EQUIPMENT_REEL(){
		Map<String, Object> result = new HashMap<>();
		
		Map<String, Object> weight = new HashMap<>();
		Map<String, Object> moisture = new HashMap<>();
		Map<String, Object> dryer = new HashMap<>();
		
		RawTagDate weight_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_REEL_WEIGHT_PV);
		RawTagDate weight_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_REEL_WEIGHT_SP);
		RawTagDate moisture_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_REEL_MOISTURE_PV);
		RawTagDate moisture_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_REEL_MOISTURE_SP);
		RawTagDate dryer_pv = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_REEL_PRE_DRYER_PV);
		RawTagDate dryer_sp = SERVICE_STEAM.getData_NowData(TagName.TAG_EQUIP_REEL_PRE_DRYER_SP);
		
		weight.put("pv", weight_pv);
		weight.put("sp", weight_sp);
		moisture.put("pv", moisture_pv);
		moisture.put("sp", moisture_sp);
		dryer.put("pv", dryer_pv);
		dryer.put("sp", dryer_sp);

		result.put("weight", weight);
		result.put("moisture", moisture);
		result.put("dryer", dryer);
		
		return result;
	}

	/* ----------------------------------------------------
	 *
	 * Energy Page 관련 정보 검색
	 *
	 * -------------------------------------------------- */	

	public Map<String, Object> getPlanNow(){
		Map<String, Object> result = new HashMap<>();
		result.put("now_plan", SERVICE_PLAN.getPlan_Now());
		result.put("list_todayplan", SERVICE_PLAN.getListPlan_Today());
		
		return result;
	}
	
	public Map<String, Object> getPlanTotal(){
		Map<String, Object> result = new HashMap<>();
		result.put("todaytotal", SERVICE_PLAN.getListTotal_Today_PerProductType());
		result.put("now", SERVICE_PLAN.getListTotal_Today_Now_Product_Weight());
		result.put("weight", SERVICE_PLAN.getListTotal_Today_Total_Product_Weight());
		
		return result;
	}
	
	public List<Map<String, String>> getPlanList(){
		return SERVICE_PLAN.getListPlan_Month();
	}	
	
	public Map<String, Object> getProcessChangeTime(){

		Map<String, Object> result = new HashMap<>();
		result.put("list", SERVICE_CATEGORY.getList_ProcessChangeTime());
		
		return result;
	}
	

	public Map<String, Object> getEnergy_RawData_Per_Minute_List(String category, String type){

		Map<String, Object> result = new HashMap<>();
		String name = "";

		switch(category) {
		case "steam":
			switch(type) {
			case "step1":
				name = TagName.TAG_STEAM_VAL;
				break;
			case "step2":
				name = TagName.TAG_STEAM_VAL_SUM;
				break;
			case "step3":
				name = TagName.TAG_STEAM_PRESS;
				break;
			case "step4":
				name = TagName.TAG_STEAM_TEMP;
				break;
			}
			break;
		case "elec":
			switch(type) {
			case "step1":
				name = TagName.TAG_ELEC_DRIVE_KW_01;
				break;
			case "step2":
				name = TagName.TAG_ELEC_DRIVE_KW_02;
				break;
			case "step3":
				name = TagName.TAG_ELEC_DRIVE_KW_03;
				break;
			case "total":
				name = TagName.TAG_ELEC_DRIVE_KW_03;
				break;
			}
			break;
		}
		
		List<RawTagDate> todaylist = null;
		List<RawTagDate> yesterdaylist = null;
		
		switch(category) {
		case "steam":
			todaylist = SERVICE_STEAM.getList_TodayBetween_15(name);
			yesterdaylist = SERVICE_STEAM.getList_TodayYesterDay_15(name);
			break;
		case "elec":
			if(type.equals("total")) {
				todaylist = SERVICE_ELEC.getList_TodayBetween_15_Total();
				yesterdaylist = SERVICE_ELEC.getList_TodayYesterDay_15_Total();
			}else {
				todaylist = SERVICE_ELEC.getList_TodayBetween_15(name);
				yesterdaylist = SERVICE_ELEC.getList_TodayYesterDay_15(name);
			}
			break;
		}
		
		result.put("today", todaylist);
		result.put("yesterday", yesterdaylist);
	
		return result;
	}
	

	public Map<String, Object> getEnergy_Usage(String type){
		Map<String, Object> result = SERVICE_ELEC.getData_Energy_Usage(type);
		
		return result;
	}

	public Map<String, Object> getEnergy_Cost(){
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> steam = SERVICE_ELEC.getData_Energy_Cost("S1");
		Map<String, Object> elec = SERVICE_ELEC.getData_Energy_Cost("P1");
		
		result.put("steam", steam);
		result.put("elec", elec);
		
		return result;
	}
	

	public Map<String, Object> getNow_Equipment_Worker(){
		Map<String, Object> result = new HashMap<>();
		List<Map<String, String>> worker = SERVICE_EQUIPMENT.getData_Now_Equipment_Worker();

		result.put("worker", worker);
		
		return result;
	}
	

	/* ----------------------------------------------------
	 *
	 * History Page 관련 정보 검색
	 *
	 * -------------------------------------------------- */	

	public Map<String, Object> getHistory_Steam(String period, String from, String to){

		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, String>> step = new ArrayList<Map<String,String>>();
		List<Map<String, String>> sum = new ArrayList<Map<String,String>>();
		List<Map<String, String>> press = new ArrayList<Map<String,String>>();
		List<Map<String, String>> temp = new ArrayList<Map<String,String>>();
		
		switch(period) {
		case "day":
			step = SERVICE_STEAM.getList_RawTagDate_Day(TagName.TAG_STEAM_VAL, from, to);
			sum = SERVICE_STEAM.getList_RawTagDate_Day(TagName.TAG_STEAM_VAL_SUM, from, to);
			press = SERVICE_STEAM.getList_RawTagDate_Day(TagName.TAG_STEAM_PRESS, from, to);
			temp = SERVICE_STEAM.getList_RawTagDate_Day(TagName.TAG_STEAM_TEMP, from, to);
			break;
		case "week":
			step = SERVICE_STEAM.getList_RawTagDate_Week(TagName.TAG_STEAM_VAL, from, to);
			sum = SERVICE_STEAM.getList_RawTagDate_Week(TagName.TAG_STEAM_VAL_SUM, from, to);
			press = SERVICE_STEAM.getList_RawTagDate_Week(TagName.TAG_STEAM_PRESS, from, to);
			temp = SERVICE_STEAM.getList_RawTagDate_Week(TagName.TAG_STEAM_TEMP, from, to);
			break;
		case "month":
			step = SERVICE_STEAM.getList_RawTagDate_Month(TagName.TAG_STEAM_VAL, from, to);
			sum = SERVICE_STEAM.getList_RawTagDate_Month(TagName.TAG_STEAM_VAL_SUM, from, to);
			press = SERVICE_STEAM.getList_RawTagDate_Month(TagName.TAG_STEAM_PRESS, from, to);
			temp = SERVICE_STEAM.getList_RawTagDate_Month(TagName.TAG_STEAM_TEMP, from, to);
			break;
		case "year":
			step = SERVICE_STEAM.getList_RawTagDate_Year(TagName.TAG_STEAM_VAL, from, to);
			sum = SERVICE_STEAM.getList_RawTagDate_Year(TagName.TAG_STEAM_VAL_SUM, from, to);
			press = SERVICE_STEAM.getList_RawTagDate_Year(TagName.TAG_STEAM_PRESS, from, to);
			temp = SERVICE_STEAM.getList_RawTagDate_Year(TagName.TAG_STEAM_TEMP, from, to);
			break;
		}
		
		result.put("step", step);
		result.put("sum", sum);
		result.put("press", press);
		result.put("temp", temp);
		
		return result;
	}

	public Map<String, Object> getHistory_Elec(String category, String type, String period, String from, String to){

		Map<String, Object> result = new HashMap<>();

		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		
		String tag_name = "";
		
		switch(category) {
		case "1":
			switch(type) {
			case "kw":
				tag_name = TagName.TAG_ELEC_DRIVE_KW_01;
				break;
			case "kwh":
				tag_name = TagName.TAG_ELEC_DRIVE_KWH_01;
				break;
			}
			break;
		case "2":
			switch(type) {
			case "kw":
				tag_name = TagName.TAG_ELEC_DRIVE_KW_02;
				break;
			case "kwh":
				tag_name = TagName.TAG_ELEC_DRIVE_KWH_02;
				break;
			}
			break;
		case "3":
			switch(type) {
			case "kw":
				tag_name = TagName.TAG_ELEC_DRIVE_KW_03;
				break;
			case "kwh":
				tag_name = TagName.TAG_ELEC_DRIVE_KWH_03;
				break;
			}
			break;
		case "total":
			switch(type) {
			case "kw":
				tag_name = TagName.TAG_ELEC_DRIVE_KW_03;
				break;
			case "kwh":
				tag_name = TagName.TAG_ELEC_DRIVE_KWH_03;
				break;
			}
			break;
		}
				
		switch(period) {
		case "day":
			list = SERVICE_STEAM.getList_RawTagDate_Day(tag_name, from, to);
			break;
		case "week":
			list = SERVICE_STEAM.getList_RawTagDate_Week(tag_name, from, to);
			break;
		case "month":
			list = SERVICE_STEAM.getList_RawTagDate_Month(tag_name, from, to);
			break;
		case "year":
			list = SERVICE_STEAM.getList_RawTagDate_Year(tag_name, from, to);
			break;
		}
		
		result.put("list", list);
		
		return result;
	}
	
	public Map<String, Object> getHistory_Elec_Total(String category, String type, String period, String from, String to){

		Map<String, Object> result = new HashMap<>();

		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		
		String tag_name1 = "";
		String tag_name2 = "";
		String tag_name3 = "";
		
		switch(type) {
		case "kw":
			tag_name1 = TagName.TAG_ELEC_DRIVE_KW_01;
			tag_name2 = TagName.TAG_ELEC_DRIVE_KW_02;
			tag_name3 = TagName.TAG_ELEC_DRIVE_KW_03;
			break;
		case "kwh":
			tag_name1 = TagName.TAG_ELEC_DRIVE_KWH_01;
			tag_name2 = TagName.TAG_ELEC_DRIVE_KWH_02;
			tag_name3 = TagName.TAG_ELEC_DRIVE_KWH_03;
			break;
		}
				
		switch(period) {
		case "day":
			list = SERVICE_STEAM.getList_RawTagDate_Day_Total(tag_name1, tag_name2, tag_name3, from, to);
			break;
		case "week":
			list = SERVICE_STEAM.getList_RawTagDate_Week_Total(tag_name1, tag_name2, tag_name3, from, to);
			break;
		case "month":
			list = SERVICE_STEAM.getList_RawTagDate_Month_Total(tag_name1, tag_name2, tag_name3, from, to);
			break;
		case "year":
			list = SERVICE_STEAM.getList_RawTagDate_Year_Total(tag_name1, tag_name2, tag_name3, from, to);
			break;
		}
		
		result.put("list", list);
		
		return result;
	}

	public Map<String, Object> getHistory_System(String category, String type, String period, String from, String to){

		Map<String, Object> result = new HashMap<>();
		String pv_name = "";
		String sp_name = "";
		
		switch(category) {
		case "pre":
			switch(type) {
			case "step1":
				pv_name = TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_1;
				sp_name = TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_1;
				break;
			case "step2":
				pv_name = TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_2;
				sp_name = TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_2;
				break;
			case "step3":
				pv_name = TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_3;
				sp_name = TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_3;
				break;
			case "step4":
				pv_name = TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_4;
				sp_name = TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_4;
				break;
			}
			break;
		case "press":
			switch(type) {
			case "step1":
				pv_name = TagName.TAG_EQUIP_PRESS_WEIGHT_PV;
				sp_name = TagName.TAG_EQUIP_PRESS_WEIGHT_SP;
				break;
			case "step2":
				pv_name = TagName.TAG_EQUIP_PRESS_MOISTURE_PV;
				sp_name = TagName.TAG_EQUIP_PRESS_MOISTURE_SP;
				break;
			case "step3":
				pv_name = TagName.TAG_EQUIP_PRESS_PRE_DRYER_PV;
				sp_name = TagName.TAG_EQUIP_PRESS_PRE_DRYER_SP;
				break;
			}
			break;
		case "after":
			switch(type) {
			case "step1":
				pv_name = TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_1;
				sp_name = TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_1;
				break;
			case "step2":
				pv_name = TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_2;
				sp_name = TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_2;
				break;
			case "step3":
				pv_name = TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_3;
				sp_name = TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_3;
				break;
			}
			break;
		case "reel":
			switch(type) {
			case "step1":
				pv_name = TagName.TAG_EQUIP_REEL_WEIGHT_PV;
				sp_name = TagName.TAG_EQUIP_REEL_WEIGHT_SP;
				break;
			case "step2":
				pv_name = TagName.TAG_EQUIP_REEL_MOISTURE_PV;
				sp_name = TagName.TAG_EQUIP_REEL_MOISTURE_SP;
				break;
			case "step3":
				pv_name = TagName.TAG_EQUIP_REEL_PRE_DRYER_PV;
				sp_name = TagName.TAG_EQUIP_REEL_PRE_DRYER_SP;
				break;
			}
			break;
		}		

		List<Map<String, String>> pv = new ArrayList<Map<String,String>>();
		
		switch(period) {
		case "day":
			pv = SERVICE_STEAM.getList_RawTagDate_Day(pv_name, from, to);
			break;
		case "week":
			pv = SERVICE_STEAM.getList_RawTagDate_Week(pv_name, from, to);
			break;
		case "month":
			pv = SERVICE_STEAM.getList_RawTagDate_Month(pv_name, from, to);
			break;
		case "year":
			pv = SERVICE_STEAM.getList_RawTagDate_Year(pv_name, from, to);
			break;
		}
		
		result.put("pv", pv);
		
		return result;
	}
	
	public Map<String, Object> getHistory_Paper(String category, String type, String from, String to){

		Map<String, Object> result = new HashMap<>();
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		
		switch(type) {
		case "time":
			list = SERVICE_CATEGORY.getList_Paper_Product_Time(category, from, to);
			break;
		case "total":
			list = SERVICE_CATEGORY.getList_Paper_Product_Total(category, from, to);
			break;
		case "change":
			list = SERVICE_CATEGORY.getList_Paper_Product_ChangeTime(category, from, to);
			break;
		}
		
		result.put("list", list);
		
		return result;
	}
	

	/* ----------------------------------------------------
	 *
	 * Setting Page 관련 정보 검색
	 *
	 * -------------------------------------------------- */	
	public Map<String, Object> getGoalInfo(){

		Map<String, Object> result = new HashMap<>();
		EnergyGoal goal_elec = null;
		EnergyGoal goal_steam = null;
		
		List<EnergyGoal> list = SERVICE_CATEGORY.getList_Goal();
		
		for(int i = 0; i < list.size(); i++) {
			EnergyGoal item = list.get(i);
			
			if(item.getEnergyTypeId().equals("P1")) {
				if(goal_elec == null) {
					goal_elec = item;
				}
			}else if(item.getEnergyTypeId().equals("S1")) {

				if(goal_steam == null) {
					goal_steam = item;
				}
			}
		}
		
		result.put("steam", goal_steam);
		result.put("elec", goal_elec);
		
		return result;
	}
	
	public int setGoalInfo(Map<String, Object> data) {
		String type = data.get("type").toString();
		EnergyGoal goal = new EnergyGoal();
		goal.setGoalValue(Integer.parseInt(data.get("count").toString()));
		goal.setGoalStartDate(CalcUtils.GetDateFromString("yyyy-MM-dd", data.get("start").toString()));
		goal.setGoalEndDate(CalcUtils.GetDateFromString("yyyy-MM-dd", data.get("end").toString()));
		goal.setCreatedAt(new Date());
		goal.setCreatedBy("admin");
		goal.setUnitId(data.get("unit").toString());
		goal.setEnergyTypeId(type);
		
		SERVICE_CATEGORY.delete_Energy_Goal(type);
		return SERVICE_CATEGORY.insert_Energy_Goal(goal);
	}
	
	
}
