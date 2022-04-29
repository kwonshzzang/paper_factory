/**
 * 
 */


/******************************
 *
 * SYSTEM MANAGER
 *
 *******************************/
var SYSTEM = {
	UI : function(){},
	REQ : function(){}
};

SYSTEM.INIT = function(){
	
	SYSTEM.INIT_EVENT();
	SYSTEM.CHART_CREATE_TEST();
	
	SYSTEM.REQ.LOAD_STATUS_HISTORY();
	SYSTEM.UI.SET_SYSTEM_HISTORY();
};

SYSTEM.INIT_EVENT = function(){
	
	$("#btn_save_vs_chart").off("click").on("click", function(){
		var canvas = $("#chart_analysis_energy_vs canvas");
		
		if(canvas && canvas.length > 0){
			
			var chart = ChartM.getChart("chart_analysis_energy_vs");
			chart.setOption({
				backgroundColor : "#000"
			});
			
			
			var link = document.createElement("a");
			link.download = "에너지 소비량 비교 차트.png";
			link.href = canvas[0].toDataURL("image/png");
			document.body.appendChild(link);
			link.click();
			link.remove();
			
			chart.setOption({
				backgroundColor : "transparent"
			});
		}
	});
	
	
	$("#btn_analysis_modal_alert").off("click").on("click", function(){
		ModalM.SHOW_ALERT("알림", "알림 모달 출력 테스트");
	});
	
	
	$("#btn_analysis_modal_confirm").off("click").on("click", function(){
		ModalM.SHOW_CONFIRM("선택", "Confirm 모달 출력 테스트",
		function(){
			alert("선택했음");
		});
	});
	
	
	$("#btn_analysis_modal_loading").off("click").on("click", function(){
		
		ModalM.SHOW_LOADING("show");
	});
		
};


SYSTEM.CHART_CREATE_TEST = function(){
	ChartM.CREATE_BAR_VS("chart_analysis_energy_vs");
	
};




/******************************
 *
 * REST API REQUEST FUNCTION
 *
 *******************************/
SYSTEM.REQ.LOAD_STATUS_HISTORY = function(){
	
	RM.GET_ANALYSIS({
		path : "history"
	}, function(json){		
		
		var list = json.list;
		
		SYSTEM.UI.SET_STATUS_HISTORY(list);
	});
};


/******************************
 *
 * UI CREATE FUNCTION
 *
 *******************************/
SYSTEM.UI.SET_STATUS_HISTORY = function(list){
		
	var tbody = $("#tbl_analysis_status_history_body");
	var table = $("#tbl_analysis_status_history").DataTable();
	
	table.destroy();
	tbody.empty();
	
	$.each(list, function(i, item){
		var tr = SYSTEM.UI.CREATE_STATUS_ITEM(item);
		
		if(tr){
			tbody.append(tr);
		}
	});
	
	$("#tbl_analysis_status_history").DataTable({
		"ordering": false,		
		"scrollX": false,
		pageLength : 5
	});
};

SYSTEM.UI.CREATE_STATUS_ITEM = function(item){
	var tr = $("<tr/>");
	var td_id = $("<td/>");
	var td_timestamp = $("<td/>");
	var td_spa = $("<td/>");
	var td_me = $("<td/>");
	var td_av = $("<td/>");
	
	td_id.text(item.thingId);
	td_timestamp.text(item.timestamp);
	
	$.each(item.values, function(i, val){
		switch(val.type){
			case "spa":
			td_spa.text(val.value);
			break;
			case "me":
			td_me.text(Math.round(val.value * 100));
			break;
			case "av":
			td_av.text(val.value);
			break;
		}
	});
	
	tr.append(td_id);
	tr.append(td_timestamp);
	tr.append(td_spa);
	tr.append(td_me);
	tr.append(td_av);
	
	return tr;
};

SYSTEM.UI.SET_SYSTEM_HISTORY = function(){	
	var table = $("#tbl_analysis_history").DataTable();
	
	table.destroy();
	
	$("#tbl_analysis_history").DataTable({
		"ordering": false,		
		"scrollX": false,
		pageLength : 5
	});
};



