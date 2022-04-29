/**
 * 
 */

/******************************
 *
 * DASHBOARD MANAGER
 *
 *******************************/
var DASHBOARD = {
	UI : function(){},
	REQ : function(){}
};

DASHBOARD.INIT = function(){
	
	DASHBOARD.INIT_EVENT();
	
	setInterval(function(){
		DASHBOARD.REQ.LOAD_REALTIME_DATA();
	}, 1000 * 30);
	
	
	DASHBOARD.REQ.LOAD_REALTIME_DATA();
};

DASHBOARD.INIT_EVENT = function(){
	
	$(".card-dialog").hide();
	
	$(".btn-dialog-close").click(function(){
		var type = $(this).data("type");
		
		$(".quick-menu-" + type).removeClass("active");
		$(".view-dialog-" + type).hide();
		
		ChartM.resize();
	});
	
	$(".btn-quick-camera").click(function(){
		var type = $(this).data("menutype");
		var msg = {
			category : "camera",
			type : "",
			msg : ""
		};
				
		msg.type = type;
		
		SEND_CHILD(msg);	
	});
	
	$(".btn-quick-menu").click(function(){
		var isactive = $(this).hasClass("active");
		var type = $(this).data("menutype");
		var msg = {
			category : "menu",
			type : "",
			msg : ""
		};
		
		if(isactive){			
			$(".quick-menu-" + type).removeClass("active");
			$(".view-dialog-" + type).hide();
		}else{
			$(".quick-menu-" + type).addClass("active");
			$(".view-dialog-" + type).show();
		}
		
		
		ChartM.resize();
		
		msg.type = type;
		
		//SEND_CHILD(msg);
	});
	
	$("#btn_view_sensor").click(function(){
		var isactive = $(this).hasClass("active");
		var msg = {
			category : "sensor",
			type : "show",
			msg : ""
		};
		
		if(isactive){			
			msg.type = "hide";
		}else{
			msg.type = "show";
		}
		
		$(this).toggleClass("active");
				
		SEND_CHILD(msg);
	});
	
	
	
	$(".btn-sensor-info-view").click(function(){
		var id = $(this).data("sensorid");
		var msg = {
			category : "camera",
			type : "sensor",
			msg : id
		};
				
		SEND_CHILD(msg);
	});
};



/******************************
 *
 * REST API REQUEST FUNCTION
 *
 *******************************/
DASHBOARD.REQ.LOAD_REALTIME_DATA = function(){
	
	RM.GET({
		path : "/dashboard/realtime"
	}, function(json){		
		
		console.log("DASHBOARD.REQ.LOAD_REALTIME_DATA", json);
		
		if(json.check){
			DASHBOARD.UI.SET_SENSOR_INFO(json.result);
		}		

	});
	
};


/******************************
 *
 * UI CREATE FUNCTION
 *
 *******************************/

DASHBOARD.UI.SET_SENSOR_INFO = function(data){	
	var steam = data.steam;
	var elec = data.elec;
	var pre_dryer = data.pre_dryer;
	var size_press = data.size_press;
	var after_dryer = data.after_dryer;
	var reel = data.reel;
	
	var list = [];
	
	list = DASHBOARD.UI.SET_STEAM_DATA(list, steam);
	list = DASHBOARD.UI.SET_ELEC_DATA(list, elec);
	list = DASHBOARD.UI.SET_EQUIP_PRE_DRYER_DATA(list, pre_dryer);
	list = DASHBOARD.UI.SET_EQUIP_SIZE_PRESS_DATA(list, size_press);
	list = DASHBOARD.UI.SET_EQUIP_AFTER_DRYER_DATA(list, after_dryer);
	list = DASHBOARD.UI.SET_EQUIP_REEL_DATA(list, reel);
	
	
	var msg = {
		category : "sensor",
		type : "info",
		msg : {
			list : list
		}
	};
	
	console.log(msg);
	
	if(MainM.isready){
		SEND_CHILD(msg);
	}
};

DASHBOARD.UI.CHECK_DATA = function(val){
	var result = "-";
	
	if(val){
		result = val.value;
	}
	
	return result;
}

DASHBOARD.UI.SET_EQUIP_PRE_DRYER_DATA = function(list, data){
	var step1_pv = DASHBOARD.UI.CHECK_DATA(data.step1.pv);
	var step1_sp = DASHBOARD.UI.CHECK_DATA(data.step1.sp);
	var step2_pv = DASHBOARD.UI.CHECK_DATA(data.step2.pv);
	var step2_sp = DASHBOARD.UI.CHECK_DATA(data.step2.sp);
	var step3_pv = DASHBOARD.UI.CHECK_DATA(data.step3.pv);
	var step3_sp = DASHBOARD.UI.CHECK_DATA(data.step3.sp);
	var step4_pv = DASHBOARD.UI.CHECK_DATA(data.step4.pv);
	var step4_sp = DASHBOARD.UI.CHECK_DATA(data.step4.sp);
	
	
	$("#txt_sensor_equip_pre_dryer_1").text(step1_pv);
	$("#txt_sensor_equip_pre_dryer_2").text(step2_pv);
	$("#txt_sensor_equip_pre_dryer_3").text(step3_pv);
	$("#txt_sensor_equip_pre_dryer_4").text(step4_pv);
	
	var category = "pre_dryer";
	
	list.push({category : category, step1 : "step1", step2 : "pv", value : step1_pv});
	list.push({category : category, step1 : "step2", step2 : "pv", value : step2_pv});
	list.push({category : category, step1 : "step3", step2 : "pv", value : step3_pv});
	list.push({category : category, step1 : "step4", step2 : "pv", value : step4_pv});
	
	list.push({category : category, step1 : "step1", step2 : "sp", value : step1_sp});
	list.push({category : category, step1 : "step2", step2 : "sp", value : step2_sp});
	list.push({category : category, step1 : "step3", step2 : "sp", value : step3_sp});
	list.push({category : category, step1 : "step4", step2 : "sp", value : step4_sp});
	
	return list;
};

DASHBOARD.UI.SET_EQUIP_SIZE_PRESS_DATA = function(list, data){
	var weight_pv = DASHBOARD.UI.CHECK_DATA(data.weight.pv);
	var weight_sp = DASHBOARD.UI.CHECK_DATA(data.weight.sp);
	var moisture_pv = DASHBOARD.UI.CHECK_DATA(data.moisture.pv);
	var moisture_sp = DASHBOARD.UI.CHECK_DATA(data.moisture.sp);
	var dryer_pv = DASHBOARD.UI.CHECK_DATA(data.dryer.pv);
	var dryer_sp = DASHBOARD.UI.CHECK_DATA(data.dryer.sp);
	
	$("#txt_sensor_equip_size_press_weight").text(weight_pv);
	$("#txt_sensor_equip_size_press_moisture").text(moisture_pv);
	$("#txt_sensor_equip_size_press_dryer").text(dryer_pv);
	
	var category = "size_press";
	
	list.push({category : category, step1 : "weight", step2 : "pv", value : weight_pv});
	list.push({category : category, step1 : "weight", step2 : "sp", value : weight_sp});
	list.push({category : category, step1 : "moisture", step2 : "pv", value : moisture_pv});
	list.push({category : category, step1 : "moisture", step2 : "sp", value : moisture_sp});
	list.push({category : category, step1 : "dryer", step2 : "pv", value : dryer_pv});
	list.push({category : category, step1 : "dryer", step2 : "sp", value : dryer_sp});
	
	return list;
};

DASHBOARD.UI.SET_EQUIP_AFTER_DRYER_DATA = function(list, data){
	var step1_pv = DASHBOARD.UI.CHECK_DATA(data.step1.pv);
	var step1_sp = DASHBOARD.UI.CHECK_DATA(data.step1.sp);
	var step2_pv = DASHBOARD.UI.CHECK_DATA(data.step2.pv);
	var step2_sp = DASHBOARD.UI.CHECK_DATA(data.step2.sp);
	var step3_pv = DASHBOARD.UI.CHECK_DATA(data.step3.pv);
	var step3_sp = DASHBOARD.UI.CHECK_DATA(data.step3.sp);
	
	$("#txt_sensor_equip_after_dryer_1").text(DASHBOARD.UI.CHECK_DATA(data.step1.pv));
	$("#txt_sensor_equip_after_dryer_2").text(DASHBOARD.UI.CHECK_DATA(data.step2.pv));
	$("#txt_sensor_equip_after_dryer_3").text(DASHBOARD.UI.CHECK_DATA(data.step3.pv));
	
	var category = "after_dryer";
	
	list.push({category : category, step1 : "step1", step2 : "pv", value : step1_pv});
	list.push({category : category, step1 : "step2", step2 : "pv", value : step2_pv});
	list.push({category : category, step1 : "step3", step2 : "pv", value : step3_pv});
	
	list.push({category : category, step1 : "step1", step2 : "sp", value : step1_sp});
	list.push({category : category, step1 : "step2", step2 : "sp", value : step2_sp});
	list.push({category : category, step1 : "step3", step2 : "sp", value : step3_sp});
	
	return list;
};

DASHBOARD.UI.SET_EQUIP_REEL_DATA = function(list, data){
	var weight_pv = DASHBOARD.UI.CHECK_DATA(data.weight.pv);
	var weight_sp = DASHBOARD.UI.CHECK_DATA(data.weight.sp);
	var moisture_pv = DASHBOARD.UI.CHECK_DATA(data.moisture.pv);
	var moisture_sp = DASHBOARD.UI.CHECK_DATA(data.moisture.sp);
	var dryer_pv = DASHBOARD.UI.CHECK_DATA(data.dryer.pv);
	var dryer_sp = DASHBOARD.UI.CHECK_DATA(data.dryer.sp);
	
	$("#txt_sensor_equip_size_reel_weight").text(weight_pv);
	$("#txt_sensor_equip_size_reel_moisture").text(moisture_pv);
	$("#txt_sensor_equip_size_reel_dryer").text(dryer_pv);
	
	var category = "reel";
	
	list.push({category : category, step1 : "weight", step2 : "pv", value : weight_pv});
	list.push({category : category, step1 : "weight", step2 : "sp", value : weight_sp});
	list.push({category : category, step1 : "moisture", step2 : "pv", value : moisture_pv});
	list.push({category : category, step1 : "moisture", step2 : "sp", value : moisture_sp});
	list.push({category : category, step1 : "dryer", step2 : "pv", value : dryer_pv});
	list.push({category : category, step1 : "dryer", step2 : "sp", value : dryer_sp});
	
	return list;
};

DASHBOARD.UI.SET_STEAM_DATA = function(list, data){
	var val = DASHBOARD.UI.CHECK_DATA(data.val);
	var sum = DASHBOARD.UI.CHECK_DATA(data.sum);
	var press = DASHBOARD.UI.CHECK_DATA(data.press);
	var temp = DASHBOARD.UI.CHECK_DATA(data.temp);
	
	$("#txt_sensor_steam_val").text(val);
	$("#txt_sensor_steam_val_sum").text(sum);
	$("#txt_sensor_steam_press").text(press);
	$("#txt_sensor_steam_temp").text(temp);
	
	
	var category = "steam";
	
	list.push({category : category, step1 : "val", step2 : "", value : val});
	list.push({category : category, step1 : "sum", step2 : "", value : sum});
	list.push({category : category, step1 : "press", step2 : "", value : press});
	list.push({category : category, step1 : "temp", step2 : "", value : temp});
	
	return list;
};

DASHBOARD.UI.SET_ELEC_DATA = function(list, data){
	var kw_1 = DASHBOARD.UI.CHECK_DATA(data.drive51_kw);
	var kwh_1 = DASHBOARD.UI.CHECK_DATA(data.drive51_kwh);
	var kw_2 = DASHBOARD.UI.CHECK_DATA(data.drive52_kw);
	var kwh_2 = DASHBOARD.UI.CHECK_DATA(data.drive52_kwh);
	var kw_3 = DASHBOARD.UI.CHECK_DATA(data.drive53_kw);
	var kwh_3 = DASHBOARD.UI.CHECK_DATA(data.drive53_kwh);
	
	$("#txt_sensor_elec_kw_1").text(kw_1);
	$("#txt_sensor_elec_kwh_1").text(kwh_1);
	$("#txt_sensor_elec_kw_2").text(kw_2);
	$("#txt_sensor_elec_kwh_2").text(kwh_2);
	$("#txt_sensor_elec_kw_3").text(kw_3);
	$("#txt_sensor_elec_kwh_3").text(kwh_3);
	
	var category = "elec";
	
	list.push({category : category, step1 : "kw1", step2 : "", value : kw_1});
	list.push({category : category, step1 : "kwh1", step2 : "", value : kwh_1});
	list.push({category : category, step1 : "kw2", step2 : "", value : kw_2});
	list.push({category : category, step1 : "kwh2", step2 : "", value : kwh_2});
	list.push({category : category, step1 : "kw3", step2 : "", value : kw_3});
	list.push({category : category, step1 : "kwh3", step2 : "", value : kwh_3});
	
	return list;
};