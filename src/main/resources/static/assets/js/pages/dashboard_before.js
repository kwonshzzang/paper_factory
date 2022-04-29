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
	DASHBOARD.CHART_CREATE_TEST();
	/*
	setInterval(function(){
		DASHBOARD.REQ.LOAD_SENSOR_DATA();
	}, 1000);
	*/
	
	DASHBOARD.REQ.LOAD_REALTIME_DATA();
	DASHBOARD.UI.SET_ALARM_DATA();
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

DASHBOARD.CHART_CREATE_TEST = function(){
	ChartM.CREATE_GAUGE_STEAM("chart_guage_steam", {
		title : "스팀 압력",
		unit : "MPa"
	});
	
	
	ChartM.CREATE_GAUGE_WATER("chart_guage_water", {
		title : "수분 함량",
		unit : "%"
	});
	
	
	ChartM.CREATE_GAUGE_TEMP("chart_guage_temp", {
		title : "온도",
		unit : "℃"
	});
	
	ChartM.CREATE_REALTIME_LINE_ENERGY("chart_line_energy", {
		title : "에너지 사용량",
		unit : "kW/h"
	})
	
	//DASHBOARD.CHART_UPDATE_TEST();
};


DASHBOARD.CHART_UPDATE_TEST = function(){
	setInterval(function(){
		
		ChartM.UPDATE_GAUGE_STEAM();
		ChartM.UPDATE_GAUGE_TEMP();
		ChartM.UPDATE_GAUGE_WATER();
		ChartM.UPDATE_REALTIME_LINE_ENERGY();
		
		DASHBOARD.REALTIME_DATA_TEST();
	}, 1000);
};

DASHBOARD.REALTIME_DATA_TEST = function(){
	$("#device_sensor01_temp").text(UtilM.GET_RANDOM(100));
	$("#device_sensor01_steam_total").text(UtilM.GET_RANDOM(100));
	$("#device_sensor01_steam_pressure").text(UtilM.GET_RANDOM(100));
	
	$("#device_sensor02_temp").text(UtilM.GET_RANDOM(100));
	$("#device_sensor02_steam_total").text(UtilM.GET_RANDOM(100));
	$("#device_sensor02_steam_pressure").text(UtilM.GET_RANDOM(100));
	
	$("#device_sensor03_temp").text(UtilM.GET_RANDOM(100));
	$("#device_sensor03_steam_total").text(UtilM.GET_RANDOM(100));
	$("#device_sensor03_steam_pressure").text(UtilM.GET_RANDOM(100));
	
	$("#device_sensor04_temp").text(UtilM.GET_RANDOM(100));
	$("#device_sensor04_steam_total").text(UtilM.GET_RANDOM(100));
	$("#device_sensor04_steam_pressure").text(UtilM.GET_RANDOM(100));
	
	$("#device_sensor05_temp").text(UtilM.GET_RANDOM(100));
	$("#device_sensor05_steam_total").text(UtilM.GET_RANDOM(100));
	$("#device_sensor05_steam_pressure").text(UtilM.GET_RANDOM(100));
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
			
		}		

	});
	
};

DASHBOARD.REQ.LOAD_ALARM_DATA = function(){
	
	
};

DASHBOARD.REQ.LOAD_POWER_DATA = function(){
	
};

DASHBOARD.REQ.LOAD_STATUS_DATA = function(){
	
};


/******************************
 *
 * UI CREATE FUNCTION
 *
 *******************************/

DASHBOARD.UI.SET_ALARM_DATA = function(){
	
	$("#tbl_dashboard_alarm").DataTable({
		"ordering": false,		
		"scrollX": false,
		pageLength : 5
	});
};

DASHBOARD.UI.SET_SENSOR_INFO = function(data){
	
	
	
	var msg = {
		category : "sensor",
		type : "info",
		msg : {
			list : infolist
		}
	};
	
	if(MainM.isready){
		SEND_CHILD(msg);
	}
};

DASHBOARD.UI.SET_POWER_DATA = function(list){
	
	if(list.length > 0){
		var item = list[0];
		var data = 0;
		
		$.each(item.values, function(i, val){
			switch(val.type){
				case "me":
				data = Math.round(val.value * 100);
				break;
			}
		});
		
		ChartM.UPDATE_REALTIME_LINE_ENERGY(data);
	}
	
};

DASHBOARD.UI.SET_STATUS_DATA = function(list){	
	
	if(list.length > 0){
		var item = list[0];
		var spa = 0;
		var me = 0;
		var av = 0;
		
		$.each(item.values, function(i, val){
			switch(val.type){
				case "spa":
				spa = (val.value * 10).toFixed(2);
				break;
				case "me":
				me = Math.round(val.value * 100);
				break;
				case "av":
				av = (val.value * 10).toFixed(2);
				break;
			}
		});		
		
		ChartM.UPDATE_GAUGE_STEAM(spa);
		ChartM.UPDATE_GAUGE_TEMP(me);
		ChartM.UPDATE_GAUGE_WATER(av);
	}
};

