package kr.re.etri.paper.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.re.etri.batis.domain.FactoryEquipment;
import kr.re.etri.batis.domain.RawTagDate;
import kr.re.etri.batis.mapper.FactoryEquipmentMapper;
import kr.re.etri.batis.mapper.RawTagDateMapper;
import kr.re.etri.paper.csv.TAGS;
import kr.re.etri.paper.utils.CalcUtils;
import kr.re.etri.paper.utils.CsvUtils;
import kr.re.etri.paper.utils.TagName;

@Service
public class EquipmentService {
	
	@Autowired
	FactoryEquipmentMapper mapper_equipment;

	@Autowired
	RawTagDateMapper mapper_raw;
	
	List<TAGS> LIST_PRE_DRYER = null;
	List<TAGS> LIST_SIZE_PRESS = null;
	List<TAGS> LIST_AFTER_DRYER = null;
	List<TAGS> LIST_REEL = null;
	
	@PostConstruct
	public void Init() {

		LIST_PRE_DRYER = CsvUtils.readDataFromCsvForTags("./datas/tags/tag_pre.csv", 8);
		LIST_SIZE_PRESS = CsvUtils.readDataFromCsvForTags("./datas/tags/tag_press.csv", 6);
		LIST_AFTER_DRYER = CsvUtils.readDataFromCsvForTags("./datas/tags/tag_after.csv", 6);
		LIST_REEL = CsvUtils.readDataFromCsvForTags("./datas/tags/tag_reel.csv", 6);
	}
	
	public List<TAGS> getListPreDryer(){
		return LIST_PRE_DRYER;
	}
	
	public List<TAGS> getListSizePress(){
		return LIST_SIZE_PRESS;
	}
	
	public List<TAGS> getListAfterDryer(){
		return LIST_AFTER_DRYER;
	}
	
	public List<TAGS> getListReel(){
		return LIST_REEL;
	}
	
	public List<FactoryEquipment> getListEquipmentAll(){
		return mapper_equipment.selectAll();
	}
	
	public FactoryEquipment getEquipment(String id) {
		return mapper_equipment.selectByPrimaryKey(id);
	}
	
	public int insert_Raw(RawTagDate item) {
		return mapper_raw.insert(item);
	}
	
	public void callInsert() {
		LIST_PRE_DRYER.forEach(item -> {

			try {
				if(item.getDate() != null && item.getDate().length() > 0) {
					RawTagDate flow1 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_1, item.getFlow1());
					RawTagDate set1 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_1, item.getSet1());
					RawTagDate flow2 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_2, item.getFlow2());
					RawTagDate set2 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_2, item.getSet2());
					RawTagDate flow3 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_3, item.getFlow3());
					RawTagDate set3 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_3, item.getSet3());
					RawTagDate flow4 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_PV_TYPE_4, item.getFlow4());
					RawTagDate set4 = getTag(item.getDate(), TagName.TAG_EQUIP_PRE_DRYER_SP_TYPE_4, item.getSet4());
					
					insert_Raw(flow1);
					insert_Raw(set1);
					insert_Raw(flow2);
					insert_Raw(set2);
					insert_Raw(flow3);
					insert_Raw(set3);
					insert_Raw(flow4);
					insert_Raw(set4);
				}
			}catch(Exception e){
				
			}
		});

		LIST_SIZE_PRESS.forEach(item -> {

			try {
				if(item.getDate() != null && item.getDate().length() > 0) {
					RawTagDate flow1 = getTag(item.getDate(), TagName.TAG_EQUIP_PRESS_WEIGHT_PV, item.getFlow1());
					RawTagDate set1 = getTag(item.getDate(), TagName.TAG_EQUIP_PRESS_WEIGHT_SP, item.getSet1());
					RawTagDate flow2 = getTag(item.getDate(), TagName.TAG_EQUIP_PRESS_MOISTURE_PV, item.getFlow2());
					RawTagDate set2 = getTag(item.getDate(), TagName.TAG_EQUIP_PRESS_MOISTURE_SP, item.getSet2());
					RawTagDate flow3 = getTag(item.getDate(), TagName.TAG_EQUIP_PRESS_PRE_DRYER_PV, item.getFlow3());
					RawTagDate set3 = getTag(item.getDate(), TagName.TAG_EQUIP_PRESS_PRE_DRYER_SP, item.getSet3());
					
					insert_Raw(flow1);
					insert_Raw(set1);
					insert_Raw(flow2);
					insert_Raw(set2);
					insert_Raw(flow3);
					insert_Raw(set3);
				}
			}catch(Exception e){
				
			}
		});

		LIST_AFTER_DRYER.forEach(item -> {

			try {
				if(item.getDate() != null && item.getDate().length() > 0) {
					RawTagDate flow1 = getTag(item.getDate(), TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_1, item.getFlow1());
					RawTagDate set1 = getTag(item.getDate(), TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_1, item.getSet1());
					RawTagDate flow2 = getTag(item.getDate(), TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_2, item.getFlow2());
					RawTagDate set2 = getTag(item.getDate(), TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_2, item.getSet2());
					RawTagDate flow3 = getTag(item.getDate(), TagName.TAG_EQUIP_AFTER_DRYER_PV_TYPE_3, item.getFlow3());
					RawTagDate set3 = getTag(item.getDate(), TagName.TAG_EQUIP_AFTER_DRYER_SP_TYPE_3, item.getSet3());
					
					insert_Raw(flow1);
					insert_Raw(set1);
					insert_Raw(flow2);
					insert_Raw(set2);
					insert_Raw(flow3);
					insert_Raw(set3);
				}
			}catch(Exception e){
				
			}
		});

		LIST_REEL.forEach(item -> {

			try {
				if(item.getDate() != null && item.getDate().length() > 0) {
					RawTagDate flow1 = getTag(item.getDate(), TagName.TAG_EQUIP_REEL_WEIGHT_PV, item.getFlow1());
					RawTagDate set1 = getTag(item.getDate(), TagName.TAG_EQUIP_REEL_WEIGHT_SP, item.getSet1());
					RawTagDate flow2 = getTag(item.getDate(), TagName.TAG_EQUIP_REEL_MOISTURE_PV, item.getFlow2());
					RawTagDate set2 = getTag(item.getDate(), TagName.TAG_EQUIP_REEL_MOISTURE_SP, item.getSet2());
					RawTagDate flow3 = getTag(item.getDate(), TagName.TAG_EQUIP_REEL_PRE_DRYER_PV, item.getFlow3());
					RawTagDate set3 = getTag(item.getDate(), TagName.TAG_EQUIP_REEL_PRE_DRYER_SP, item.getSet3());
					
					insert_Raw(flow1);
					insert_Raw(set1);
					insert_Raw(flow2);
					insert_Raw(set2);
					insert_Raw(flow3);
					insert_Raw(set3);
				}
			}catch(Exception e){
				
			}
		});
	}

	public RawTagDate getTag(String date, String name, String val) {
		
		date = date.replace("2021", "2022");
		
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
	public List<FactoryEquipment> getList_Equipment() {
		return mapper_equipment.selectAll();
	}
	

	public List<Map<String, String>> getData_Now_Equipment_Worker() {
		return mapper_equipment.selectNowEquipmentWorker();
	}
}
