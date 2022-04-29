package kr.re.etri.paper.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.re.etri.paper.data.DBService;
import kr.re.etri.paper.data.SensorInfo;

public class WebRestController {

	@Autowired
	DBService DB;

	@PostConstruct
	public void Init() {
		//this.Run_DataCreate();
	}
	
	private void Run_DataCreate() {
		Runnable runnable = new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					DB.CreateData("320PIC7509");
					DB.CreateData("320PIC7510");
					DB.CreateData("320PIC7511");
					DB.CreateData("320PIC7513");
					DB.CreateData("320PIC7514");
					
				}catch(Exception e) {
					
				}
			}
		};

        ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
        service.scheduleAtFixedRate(runnable, 10, 10, TimeUnit.SECONDS);
	}
	
	
	@RequestMapping(value="/history", method = RequestMethod.POST)
	public Map<String, Object> HTTP_POST(){
		Map<String, Object> result = new HashMap<>();
		
		result.put("type", "POST");
		
		return result;
	}
	
	@RequestMapping(value="/history", method = RequestMethod.GET)
	public Map<String, Object> HTTP_GET_HISTORY(){
		Map<String, Object> result = new HashMap<>();
		
		List<SensorInfo> list = DB.GET_HISTORY_LIST();
		
		result.put("list", list);
		
		return result;
	}
	
	@RequestMapping(value="/realtime", method = RequestMethod.GET)
	public Map<String, Object> HTTP_GET_REALTIME(){
		Map<String, Object> result = new HashMap<>();
		
		List<SensorInfo> list = DB.GET_REALTIME_LIST();
		
		result.put("list", list);
		
		return result;
	}
}
