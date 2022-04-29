package kr.re.etri.paper.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.re.etri.paper.service.DataAggregatorService;

@RestController
@RequestMapping("dashboard")
public class DashboardController {
	
	@Autowired
	DataAggregatorService SERVICE;

	
	@PostConstruct
	public void Init() {
		
	}
	
	@GetMapping("/realtime")
	public Map<String, Object> getRealtime(){

		Map<String, Object> result = new HashMap<>();
		result.put("check", true);
		result.put("result", SERVICE.getDashboard_Realtime());
				
		return result;
	}
	
}
