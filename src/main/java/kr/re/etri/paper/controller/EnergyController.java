package kr.re.etri.paper.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.re.etri.batis.mapper.RawTagDateMapper;
import kr.re.etri.paper.service.CategoryService;
import kr.re.etri.paper.service.DataAggregatorService;
import kr.re.etri.paper.service.ElecService;
import kr.re.etri.paper.service.EquipmentService;
import kr.re.etri.paper.service.SteamService;

@RestController
@RequestMapping("energy")
public class EnergyController {
	
	@Autowired
	DataAggregatorService SERVICE;
	
	@Autowired
	RawTagDateMapper SERVICE_C;
	
		
	@PostConstruct
	public void Init() {
	}
	
	@GetMapping("/plan/now")
	public Map<String, Object> getPlan(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getPlanNow());
				
		return result;
	}
	
	@GetMapping("/plan/total")
	public Map<String, Object> getTotal(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getPlanTotal());
				
		return result;
	}
	
	@GetMapping("/plan/list")
	public Map<String, Object> getPlanList(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getPlanList());
				
		return result;
	}

	
	@GetMapping("/cost")
	public Map<String, Object> getEnergyCost(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getEnergy_Cost());
				
		return result;
	}
	
	@GetMapping("/steam/total")
	public Map<String, Object> getSteamTotal(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		
		Map<String, Object> item = SERVICE.getEnergy_Usage("S1");
		result.put("result", item);
				
		return result;
	}
	
	@GetMapping("/steam/chart/minute/{step}")
	public Map<String, Object> getSteamChart(@PathVariable String step){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		
		Map<String, Object> datalist = SERVICE.getEnergy_RawData_Per_Minute_List("steam", step);
		result.put("result", datalist);
				
		return result;
	}

	
	@GetMapping("/elec/total")
	public Map<String, Object> getElecTotal(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		
		Map<String, Object> item = SERVICE.getEnergy_Usage("P1");
		result.put("result", item);
				
		return result;
	}
	
	@GetMapping("/elec/chart/minute/{step}")
	public Map<String, Object> getElecChart(@PathVariable String step){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		
		Map<String, Object> datalist = SERVICE.getEnergy_RawData_Per_Minute_List("elec", step);
		result.put("result", datalist);
				
		return result;
	}
	

	
	@GetMapping("/process/changetime")
	public Map<String, Object> getProcessChangeTime(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		
		Map<String, Object> item = SERVICE.getProcessChangeTime();
		result.put("result", item);
				
		return result;
	}
}
