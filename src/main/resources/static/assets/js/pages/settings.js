/**
 * 
 */


/******************************
 *
 * SETTINGS MANAGER
 *
 *******************************/
var SETTINGS = {
	UI : function(){},
	REQ : function(){}
};

SETTINGS.INIT = function(){
	//SETTINGS.LOAD_DATA();
	
	//SETTINGS.INIT_EVENT();
};

SETTINGS.LOAD_DATA = function(){
	SETTINGS.REQ.GET("/setting/goal", function(json){
		if(json.check){
			var steam = json.result.steam;
			var elec = json.result.elec;
			
			SETTINGS.UI.SET_STEAM(steam);
			SETTINGS.UI.SET_ELEC(elec);
		}
	});
};

SETTINGS.INIT_EVENT = function(){
	
	$("#btn_save_setting_goal_plan").off("click").on("click", function(){
		
	});
	
	$("#btn_save_setting_goal_steam").off("click").on("click", function(){
		var count = $("#txt_setting_goal_steam_count").val();
		var start = $("#txt_setting_goal_steam_start").val();
		var end = $("#txt_setting_goal_steam_end").val();
		var unit = $("#txt_setting_goal_steam_unit").text();
		
		var data = {
			count : count,
			start : start,
			end : end,
			unit : unit,
			type : "S1"
		};
		
		SETTINGS.REQ.POST("/setting/goal", data, function(json){
			ModalM.SHOW_ALERT("스팀 사용 목표 설정", "설정이 변경되었습니다.");
		});
	});
	
	$("#btn_save_setting_goal_elec").off("click").on("click", function(){
		var count = $("#txt_setting_goal_elec_count").val();
		var start = $("#txt_setting_goal_elec_start").val();
		var end = $("#txt_setting_goal_elec_end").val();
		var unit = $("#txt_setting_goal_elec_unit").text();
		
		var data = {
			count : count,
			start : start,
			end : end,
			unit : unit,
			type : "P1"
		};
		
		SETTINGS.REQ.POST("/setting/goal", data, function(json){
			ModalM.SHOW_ALERT("전력 사용 목표 설정", "설정이 변경되었습니다.");
		});
		
		
		
	});
};



/******************************
 *
 * REST API REQUEST FUNCTION
 *
 *******************************/
SETTINGS.REQ.POST = function(path, data, func){
	
	var param = {
		path : path,
		param : data
	};
	
	RM.POST(param, func);
};


SETTINGS.REQ.GET = function(path, func){
	
	var param = {
		path : path
	};
	
	RM.GET(param, func);
};


/******************************
 *
 * UI CREATE FUNCTION
 *
 *******************************/
SETTINGS.UI.SET_STEAM = function(steam){
	$("#txt_setting_goal_steam_count").val(steam.goalValue);
	$("#txt_setting_goal_steam_start").val(moment(steam.goalStartDate).format("YYYY-MM-DD"));
	$("#txt_setting_goal_steam_end").val(moment(steam.goalEndDate).format("YYYY-MM-DD"));
	
};

SETTINGS.UI.SET_ELEC = function(elec){
	$("#txt_setting_goal_elec_count").val(elec.goalValue);
	$("#txt_setting_goal_elec_start").val(moment(elec.goalStartDate).format("YYYY-MM-DD"));
	$("#txt_setting_goal_elec_end").val(moment(elec.goalEndDate).format("YYYY-MM-DD"));
	
};
