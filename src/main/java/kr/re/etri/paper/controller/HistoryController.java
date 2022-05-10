package kr.re.etri.paper.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.re.etri.paper.service.DataAggregatorService;
import kr.re.etri.paper.service.ElecService;
import kr.re.etri.paper.service.EquipmentService;
import kr.re.etri.paper.service.SteamService;

@RestController
@RequestMapping("history")
public class HistoryController {
	
	@Autowired
	DataAggregatorService SERVICE;
	
	@Autowired
	EquipmentService SERVICE_E;
	
		
	@PostConstruct
	public void Init() {
	}
	
	@GetMapping("/steam/{period}/{from}/{to}")
	public Map<String, Object> getListSteam(@PathVariable String period, @PathVariable String from, @PathVariable String to){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getHistory_Steam(period, from, to));
		
		return result;
	}
	
	@GetMapping("/elec/{category}/{type}/{period}/{from}/{to}")
	public Map<String, Object> getListElec(@PathVariable String category, @PathVariable String type, 
			@PathVariable String period, @PathVariable String from, @PathVariable String to){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		switch(category) {
		case "total":
			result.put("result", SERVICE.getHistory_Elec_Total(category, type, period, from, to));
			break;
		case "1":
		case "2":
		case "3":
			result.put("result", SERVICE.getHistory_Elec(category, type, period, from, to));
			break;
		}
		
		return result;
	}
	
	@GetMapping("/system/{category}/{type}/{period}/{from}/{to}")
	public Map<String, Object> getListSystem(@PathVariable String category, @PathVariable String type,
			@PathVariable String period, @PathVariable String from, @PathVariable String to){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getHistory_System(category, type, period, from, to));
		
		return result;
	}
	
	@GetMapping("/paper/{category}/{type}/{from}/{to}")
	public Map<String, Object> getListPaper(@PathVariable String category, @PathVariable String type, @PathVariable String from, @PathVariable String to){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		
		result.put("result", SERVICE.getHistory_Paper(category, type, from, to));
		
		return result;
	}

	
	@GetMapping("/tags")
	public Map<String, Object> getListSizePress(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		
		SERVICE_E.callInsert();
		
		
		return result;
	}
	
	@GetMapping("/tags/list")
	public Map<String, Object> getListAfterDryer(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE_E.getListPreDryer());
		
		return result;
	}
	
}
