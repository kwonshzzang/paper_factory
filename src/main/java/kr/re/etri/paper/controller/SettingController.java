package kr.re.etri.paper.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.re.etri.paper.service.DataAggregatorService;

@RestController
@RequestMapping("setting")
public class SettingController {

	@Autowired
	DataAggregatorService SERVICE;
	
	@GetMapping("/goal")
	public Map<String, Object> getGoal(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getGoalInfo());
		
		return result;
	}
	
	@PostMapping("/goal")
	public Map<String, Object> setGoal(@RequestBody Map<String, Object> goal){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);		
		result.put("result", SERVICE.setGoalInfo(goal));
		
		return result;
	}
	

	@GetMapping("/time")
	public Map<String, Object> getTimeCheck(){
		

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", LocalDateTime.now().toString());
		
		return result;
	}
}
