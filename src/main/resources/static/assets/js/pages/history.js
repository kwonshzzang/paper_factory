/**
 * 
 */


/******************************
 *
 * HISTORY MANAGER
 *
 *******************************/
var HISTORY = {
	UI : function(){},
	REQ : function(){},
	CHART : function(){},
	data : {
		lst_steam : [],
		lst_elec : [],
		lst_system : [],
		lst_papertype : []
	}
};

HISTORY.INIT = function(){
	
	HISTORY.INIT_EVENT();
	HISTORY.INIT_SETTING();
	
	$("#page_history").find(".nav-quick-menu[data-type='steam']").trigger("click");	
	
};

/******************************
 *
 * EVENT FUNCTION
 *
 *******************************/
HISTORY.INIT_EVENT = function(){
	
	$(".nav-quick-menu").off("click").on("click", function(){
		var type = $(this).data("type");
		
		$(".nav-quick-menu").removeClass("active");
		$(this).addClass("active");
		
		HISTORY.CHANGE_PAGE(type);
	});	
	
	
	$(".btn-history-search").off("click").on("click", function(){
		var type = $(this).data("type");
		
		switch(type){
			case "steam":
			HISTORY.CHART.CREATE_STEAM();
			break;
			case "elec":
			HISTORY.CHART.CREATE_ELEC();
			break;
			case "system":
			HISTORY.CHART.CREATE_SYSTEM();
			break;
			case "paper":
			HISTORY.CHART.CREATE_PAPERTYPE();
			break;
		}
	});
	
	
	$(".btn-history-download-excel").off("click").on("click", function(){
		var category = $(this).data("category");
		var type = $(this).data("type");
		
		HISTORY.DOWNLOAD_EXCEL(category, type);
	});
	
	
	$(".btn-history-download-csv").off("click").on("click", function(){
		var category = $(this).data("category");
		var type = $(this).data("type");
				
		HISTORY.DOWNLOAD_CSV(category, type);
	});
		
};

HISTORY.CHANGE_PAGE = function(type){
	
	$(".inner-page").hide();	
	$(".inner-page[data-type='" + type + "']").show();
	
	switch(type){
		case "steam":
		HISTORY.UI.INIT_STEAM();
		break;
		case "elec":
		HISTORY.UI.INIT_ELEC();
		break;
		case "system":
		HISTORY.UI.INIT_SYSTEM();
		break;
		case "papertype":
		HISTORY.UI.INIT_PAPERTYPE();
		break;
	}
	
	ChartM.resize();
};

HISTORY.DOWNLOAD_EXCEL = function(category, type){
	var result = HISTORY.GET_CHART_DATA(category, type);
	
	var list = result.list;
	var name = result.name;
		
	UtilM.DOWNLOAD_EXCEL("날짜,최소값,최대값,평균값", list, name);
};

HISTORY.DOWNLOAD_CSV = function(category, type){
	var result = HISTORY.GET_CHART_DATA(category, type);
	
	var list = result.list;
	var name = result.name;
	
	UtilM.DOWNLOAD_CSV("날짜,최소값,최대값,평균값", list, name);
};

HISTORY.GET_CHART_DATA = function(category, type){
	var name = "";
	var list = [];
	
	switch(category){
		case "steam":
		switch(type){
			case "val":
			name = $("#chart_history_steam_step").data("name");
			list = $("#chart_history_steam_step").data("list");
			break;
			case "sum":
			name = $("#chart_history_steam_total").data("name");
			list = $("#chart_history_steam_total").data("list");
			break;
			case "press":
			name = $("#chart_history_steam_pressure").data("name");
			list = $("#chart_history_steam_pressure").data("list");
			break;
			case "temp":
			name = $("#chart_history_steam_temp").data("name");
			list = $("#chart_history_steam_temp").data("list");
			break;
		}
		break;
		case "elec":
		switch(type){
			case "type1":
			name = "전력(Drive 5-1) - " + $("#chart_history_elec_type1").data("name");
			list = $("#chart_history_elec_type1").data("list");
			break;
			case "type2":
			name = "전력(Drive 5-2) - " + $("#chart_history_elec_type2").data("name");
			list = $("#chart_history_elec_type2").data("list");
			break;
			case "type3":
			name = "전력(Drive 5-3) - " + $("#chart_history_elec_type3").data("name");
			list = $("#chart_history_elec_type3").data("list");
			break;
			case "total":
			name = "전체 전력 - " + $("#chart_history_elec_total").data("name");
			list = $("#chart_history_elec_total").data("list");
			break;
		}
		break;
		case "system":
		switch(type){
			case "pre_dryer":
			name = "DCS STM Press(Gr.1) - " + $("#chart_history_system_pre_dryer").data("name");
			list = $("#chart_history_system_pre_dryer").data("list");
			break;
			case "size_press":
			name = "QCS Size 평량 - " + $("#chart_history_system_press").data("name");
			list = $("#chart_history_system_press").data("list");
			break;
			case "after_dryer":
			name = "DCS STM Press(Gr.4) - " + $("#chart_history_system_after_dryer").data("name");
			list = $("#chart_history_system_after_dryer").data("list");
			break;
			case "reel":
			name = "QCS Size 평량 - " + $("#chart_history_system_reel").data("name");
			list = $("#chart_history_system_reel").data("list");
			break;
		}
		break;
		case "papertype":
		break;
	}
	
	return {
		name : name,
		list : list
	}
};



/******************************
 *
 * UI DATA SET & GET FUNCTION
 *
 *******************************/
HISTORY.INIT_SETTING = function(){
	
	$("select.txt-period").val("day");
	
	$("input[type='date'].txt-period-start").val(moment().format("YYYY-MM") + "-01");
	$("input[type='date'].txt-period-end").val(moment().format("YYYY-MM-DD"));
		
	$("input[type='date'].txt-period-start").attr("max", moment().format("YYYY-MM-DD"));
	$("input[type='date'].txt-period-end").attr("max", moment().format("YYYY-MM-DD"));
};

HISTORY.GET_SEARCH_DATA = function(category){
	var result = {
		period : "",
		start : "",
		end : "",
		type : category
	};
	
	switch(category){
		case "steam":
		result.period = $("#sel_history_steam_period_type").val();
		result.start = $("#sel_history_steam_period_start").val();
		result.end = $("#sel_history_steam_period_end").val();
		break;
		case "elec":
		result.period = $("#sel_history_elec_period_type").val();
		result.start = $("#sel_history_elec_period_start").val();
		result.end = $("#sel_history_elec_period_end").val();
		break;
		case "system":
		result.period = $("#sel_history_system_period_type").val();
		result.start = $("#sel_history_system_period_start").val();
		result.end = $("#sel_history_system_period_end").val();
		break;
		case "paper":
		result.period = $("#sel_history_paper_period_type").val();
		result.start = $("#sel_history_paper_period_start").val();
		result.end = $("#sel_history_paper_period_end").val();
		break;
	}
	
	
	return result;
};


/******************************
 *
 * UI CREATE FUNCTION
 *
 *******************************/
HISTORY.UI.INIT_STEAM = function(){
	
	HISTORY.CHART.CREATE_STEAM();
};

HISTORY.UI.INIT_ELEC = function(){	
	
	$("label.opt_history_elec_type1").removeClass("active");
	$("label.opt_history_elec_type1[data-step='kw']").addClass("active");
	
	$("label.opt_history_elec_type2").removeClass("active");
	$("label.opt_history_elec_type2[data-step='kw']").addClass("active");
	
	$("label.opt_history_elec_type3").removeClass("active");
	$("label.opt_history_elec_type3[data-step='kw']").addClass("active");
	
	$("label.opt_history_elec_total").removeClass("active");
	$("label.opt_history_elec_total[data-step='kw']").addClass("active");
	
	$(".opt_history_elec_type1").off("click").on("click", function(){
		var step = $(this).data("step");
				
		HISTORY.REQ.LOAD_ELEC_TYPE1(step);
	});
	
	$(".opt_history_elec_type2").off("click").on("click", function(){
		var step = $(this).data("step");
				
		HISTORY.REQ.LOAD_ELEC_TYPE2(step);		
	});
	
	$(".opt_history_elec_type3").off("click").on("click", function(){
		var step = $(this).data("step");
				
		HISTORY.REQ.LOAD_ELEC_TYPE3(step);		
	});
	
	$(".opt_history_elec_total").off("click").on("click", function(){
		var step = $(this).data("step");
				
		HISTORY.REQ.LOAD_ELEC_TOTAL(step);		
	});
	
	HISTORY.CHART.CREATE_ELEC();
		
};

HISTORY.UI.INIT_SYSTEM = function(){	
	
	$("label.opt_history_system_pre_dryer").removeClass("active");
	$("label.opt_history_system_pre_dryer[data-step='step1']").addClass("active");
	
	$("label.opt_history_system_press").removeClass("active");
	$("label.opt_history_system_press[data-step='step1']").addClass("active");
	
	$("label.opt_history_system_after_dryer").removeClass("active");
	$("label.opt_history_system_after_dryer[data-step='step1']").addClass("active");
	
	$("label.opt_history_system_reel").removeClass("active");
	$("label.opt_history_system_reel[data-step='step1']").addClass("active");
	
	$(".opt_history_system_pre_dryer").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK PRE DRYER", "STEP" + step);
		
		HISTORY.REQ.LOAD_TAGS_PRE(step);
	});
	
	$(".opt_history_system_press").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK SIZE PRESS", "STEP" + step);
		
		HISTORY.REQ.LOAD_TAGS_SIZE_PRESS(step);
		
	});
	
	$(".opt_history_system_after_dryer").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK AFTER DRYER", "STEP" + step);
		
		HISTORY.REQ.LOAD_TAGS_AFTER(step);
		
	});
	
	$(".opt_history_system_reel").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK REEL", "STEP" + step);
		
		HISTORY.REQ.LOAD_TAGS_REEL(step);
		
	});
	
	HISTORY.CHART.CREATE_SYSTEM();
		
};

HISTORY.UI.INIT_PAPERTYPE = function(){
	
	$(".opt_history_paper_type1").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK PRE DRYER", "STEP" + step);
		
	});
	
	$(".opt_history_paper_type2").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK PRE DRYER", "STEP" + step);
		
	});
	
	$(".opt_history_paper_type3").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK PRE DRYER", "STEP" + step);
		
	});
	
	$(".opt_history_paper_type4").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK PRE DRYER", "STEP" + step);
		
	});
	
	HISTORY.CHART.CREATE_PAPERTYPE();
		
};


HISTORY.CHART.CONVERT_DATA_LIST = function(list){
	var result = [];
	
	$.each(list, function(i, ele){		
		var date = moment(ele.measureDate).format("YYYY-MM-DD HH:mm:ss");
		var data = {
			name : ele.tagId,
			value : [
				date,
				ele.value
			]
		};
		
		result.push(data);
					
	});	
	
	return result;	
};

HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST = function(list, format){
	var min = [];
	var max = [];
	var avg = [];
	
	$.each(list, function(i, ele){		
		//var date = moment(ele.regdate).format(format);
		var date = ele.regdate;
		var min_val = {
			name : date,
			value : [
				date,
				Math.round(ele.minval * 1)
			]
		};
		
		var max_val = {
			name : date,
			value : [
				date,
				Math.round(ele.maxval * 1)
			]
		};
		
		var avg_val = {
			name : date,
			value : [
				date,
				Math.round(ele.avgval * 1)
			]
		};
		
		min.push(min_val);
		max.push(max_val);
		avg.push(avg_val);
					
	});	
	
	return {
		min : min,
		max : max,
		avg : avg
	};	
};

/******************************
 *
 * LOAD STEAM FUNCTION
 *
 *******************************/

HISTORY.CHART.CREATE_STEAM = function(){
	var search = HISTORY.GET_SEARCH_DATA("steam");
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/steam/" + period + "/" + from + "/" + to 
	}, function(json){
		if(json.check){
			var step = json.result.step;
			var sum = json.result.sum;
			var temp = json.result.temp;
			var press = json.result.press;
						
			var result_step = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(step);	
			var result_sum = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(sum);	
			var result_temp = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(temp);	
			var result_press = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(press);		
			
			
			$("#chart_history_steam_step").data("list", step);	
			$("#chart_history_steam_step").data("name", "순시유량");			
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_steam_step",{
				title : "순시유량",
				unit : "KG/HR",
				color : "#66bb6a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "KG/HR";
				      }
				    },
					data : result_step.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "KG/HR";
				      }
				    },
					data : result_step.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "KG/HR";
				      }
				    },
					data : result_step.avg
				}]
			});	
			
			$("#chart_history_steam_total").data("list", sum);
			$("#chart_history_steam_total").data("name", "적산유량");				
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_steam_total",{
				title : "적산유량",
				unit : "Ton",
				color : "#26a69a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "Ton";
				      }
				    },
					data : result_sum.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "Ton";
				      }
				    },
					data : result_sum.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "Ton";
				      }
				    },
					data : result_sum.avg
				}]
			});	
			
			$("#chart_history_steam_pressure").data("list", press);	
			$("#chart_history_steam_pressure").data("name", "압력");		
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_steam_pressure",{
				title : "압력",
				unit : "Bar",
				color : "#2196f3",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "Bar";
				      }
				    },
					data : result_press.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "Bar";
				      }
				    },
					data : result_press.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "Bar";
				      }
				    },
					data : result_press.avg
				}]
			});	
			
			$("#chart_history_steam_temp").data("list", temp);	
			$("#chart_history_steam_temp").data("name", "온도");		
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_steam_temp",{
				title : "온도",
				unit : "°C",
				color : "#f44336",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "°C";
				      }
				    },
					data : result_temp.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "°C";
				      }
				    },
					data : result_temp.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + "°C";
				      }
				    },
					data : result_temp.avg
				}]
			});
		}
	});			
		
};


/******************************
 *
 * LOAD ELEC FUNCTION
 *
 *******************************/

HISTORY.CHART.CREATE_ELEC = function(){
	
	HISTORY.REQ.LOAD_ELEC_TYPE1("kw");
	HISTORY.REQ.LOAD_ELEC_TYPE2("kw");
	HISTORY.REQ.LOAD_ELEC_TYPE3("kw");
	HISTORY.REQ.LOAD_ELEC_TOTAL("kw");
		
};

HISTORY.REQ.LOAD_ELEC_TYPE1 = function(step){	
	var search = HISTORY.GET_SEARCH_DATA("elec");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/elec/1/" + step + "/" + period + "/" + from + "/" + to 
	}, function(json){
		if(json.check){
			var list = json.result.list;
										
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);		
			var unit = "KW";
			var name = "순시전력";
			
			if(step == "kwh"){
				unit = "KWH";
				name = "전력량";
			}						
			
			$("#chart_history_elec_type1").data("list", list);	
			$("#chart_history_elec_type1").data("name", name);		
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_type1",{
				title : "전력(Drive 5-1) - " + name,
				unit : unit,
				color : "#66bb6a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});		
			
		}
	});			
};

HISTORY.REQ.LOAD_ELEC_TYPE2 = function(step){
	var search = HISTORY.GET_SEARCH_DATA("elec");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/elec/2/" + step + "/" + period + "/" + from + "/" + to 
	}, function(json){
		if(json.check){
			var list = json.result.list;
										
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);		
			var unit = "KW";
			var name = "순시전력";
			
			if(step == "kwh"){
				unit = "KWH";
				name = "전력량";
			}						
			
			$("#chart_history_elec_type2").data("list", list);	
			$("#chart_history_elec_type2").data("name", name);		
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_type2",{
				title : "전력(Drive 5-2) - " + name,
				unit : unit,
				color : "#66bb6a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});		
			
		}
	});	
	
};

HISTORY.REQ.LOAD_ELEC_TYPE3 = function(step){
	var search = HISTORY.GET_SEARCH_DATA("elec");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/elec/3/" + step + "/" + period + "/" + from + "/" + to 
	}, function(json){
		if(json.check){
			var list = json.result.list;
										
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);		
			var unit = "KW";
			var name = "순시전력";
			
			if(step == "kwh"){
				unit = "KWH";
				name = "전력량";
			}						
			
			$("#chart_history_elec_type3").data("list", list);	
			$("#chart_history_elec_type3").data("name", name);		
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_type3",{
				title : "전력(Drive 5-3) - " + name,
				unit : unit,
				color : "#66bb6a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});		
			
		}
	});	
	
};

HISTORY.REQ.LOAD_ELEC_TOTAL = function(step){
	var search = HISTORY.GET_SEARCH_DATA("elec");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/elec/total/" + step + "/" + period + "/" + from + "/" + to 
	}, function(json){
		if(json.check){
			var list = json.result.list;
										
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);		
			var unit = "KW";
			var name = "순시전력";
			
			if(step == "kwh"){
				unit = "KWH";
				name = "전력량";
			}						
			
			$("#chart_history_elec_total").data("list", list);	
			$("#chart_history_elec_total").data("name", name);		
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_total",{
				title : "전력(Drive 5-1, 5-2, 5-3) - " + name,
				unit : unit,
				color : "#66bb6a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});		
			
		}
	});	
	
};

/******************************
 *
 * LOAD SYSTEM TAG FUNCTION
 *
 *******************************/
HISTORY.CHART.CREATE_SYSTEM = function(){
	
	HISTORY.REQ.LOAD_TAGS_PRE("step1");
	HISTORY.REQ.LOAD_TAGS_SIZE_PRESS("step1");
	HISTORY.REQ.LOAD_TAGS_AFTER("step1");
	HISTORY.REQ.LOAD_TAGS_REEL("step1");
	
};


HISTORY.REQ.LOAD_TAGS_PRE = function(step){
	var search = HISTORY.GET_SEARCH_DATA("system");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/system/pre/" + step + "/" + period + "/" + from + "/" + to 
	}, function(json){		
				
		if(json.check){
			var list = json.result.pv;
			var name = "Pre Dryer";
			
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);				
			
			$("#chart_history_system_pre_dryer").data("list", result);	
			$("#chart_history_system_pre_dryer").data("name", name);	
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_pre_dryer",{
				title : name,
				unit : "Kg/cm2",
				color : "#66bb6a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});
		}
	});
};

HISTORY.REQ.LOAD_TAGS_SIZE_PRESS = function(step){
	var search = HISTORY.GET_SEARCH_DATA("system");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/system/press/" + step + "/" + period + "/" + from + "/" + to 
	}, function(json){		
				
		if(json.check){
			var list = json.result.pv;
			var name = "Size Press";
			
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);			
			
			var unit = "Kg/cm2";
			
			if(step == "step2"){
				unit = "%";
			}
			
			
			$("#chart_history_system_press").data("list", result);		
			$("#chart_history_system_press").data("name", name);	
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_press",{
				title : "Size Press",
				unit : unit,
				color : "#26a69a",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});
		}
	});
};

HISTORY.REQ.LOAD_TAGS_AFTER = function(step){
	var search = HISTORY.GET_SEARCH_DATA("system");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/system/after/" + step + "/" + period + "/" + from + "/" + to 
	}, function(json){		
		
		if(json.check){
			var list = json.result.pv;
			var name = "After Dryer";
			
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);				
			
			$("#chart_history_system_after_dryer").data("list", result);	
			$("#chart_history_system_after_dryer").data("name", name);		
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_after_dryer",{
				title : "After Dryer",
				unit : "Kg/cm2",
				color : "#2196f3",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});
		}
	});
};

HISTORY.REQ.LOAD_TAGS_REEL = function(step){
	var search = HISTORY.GET_SEARCH_DATA("system");
	
	var period = search.period;
	var from = search.start;
	var to = search.end;
	
	from += " 00:00:00";
	to += " 23:59:59";
	
	RM.GET({
		path : "/history/system/reel/" + step + "/" + period + "/" + from + "/" + to
	}, function(json){		
				
		if(json.check){
			var list = json.result.pv;
			var name = "Reel";
			
			var result = HISTORY.CHART.CONVERT_DATA_MIN_MAX_AVG_LIST(list);	
			
			var unit = "Kg/cm2";
			
			if(step == "step2"){
				unit = "%";
			}
			
			$("#chart_history_system_reel").data("list", result);		
			$("#chart_history_system_reel").data("name", name);	
			HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_reel",{
				title : "Reel",
				unit : unit,
				color : "#f44336",
				list : [{
					name : "최소값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.min
				},{
					name : "최대값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.max
				},{
					name : "평균값",
					type : "line",
				    tooltip: {
				      valueFormatter: function (value) {
				        return value + ' ' + unit;
				      }
				    },
					data : result.avg
				}]
			});
		}
	});
};

/******************************
 *
 * LOAD PAPER TYPE FUNCTION
 *
 *******************************/
HISTORY.CHART.CREATE_PAPERTYPE = function(){
	HISTORY.CHART.CREATE_LINE("chart_history_paper_type1",{
		title : "순시유량",
		unit : "평량",
		color : "#66bb6a",
		list : []
	});
	
	HISTORY.CHART.CREATE_LINE("chart_history_paper_type2",{
		title : "적산유량",
		unit : "평량",
		color : "#26a69a",
		list : []
	});
	
	HISTORY.CHART.CREATE_LINE("chart_history_paper_type3",{
		title : "압력",
		unit : "평량",
		color : "#2196f3",
		list : []
	});
	
	HISTORY.CHART.CREATE_LINE("chart_history_paper_type4",{
		title : "온도",
		unit : "평량",
		color : "#f44336",
		list : []
	});
};


HISTORY.CHART.CREATE_LINE_STEAM = function(id, item = null){
	
	var series = [];	
	var title = item.title;
	var unit = item.unit;
	var list = [];
	
	$.each(item.list, function(i, ele){
		var date = moment(ele.measureDate).format("YYYY-MM-DD HH:mm:ss");
		var data = {
			name : ele.tagId,
			value : [
				date,
				ele.value
			]
		};
		
		list.push(data);
	});
		
	series.push({
		name : title,
		type : "line",
		data : list
	});
		
	var option = {
			color : [
				item.color
			],
			textStyle : {
				color : "#fff"
			},
			title : {
				text : title,
				x : "center",
				show : true,
				textStyle : {
					fontSize : 14,
					color : "#fff"
				}
			},
			legend : {
				show : false,
				y : "bottom",
				textStyle : {
					color : "#fff"
				}
			},
			
		  tooltip: {
		    trigger: 'axis'
		  },
			xAxis : [{
				type : "time",
				axisLabel : {
					color : "#fff"
				}
			}],
			yAxis :  [{
				type : "value",
				axisLabel : {
					formatter : "{value} " + unit,
					color : "#fff"
				},
				min: function(item){
	                var diff = item.max-item.min;
	                if(diff == 0) {diff = 1}
	                return (item.min - ((diff) * 0.2)).toFixed(2);
	            },
	            max: function(item){
	                var diff = item.max-item.min;
	                if(diff == 0) {diff = 1}
	                return (item.max + ((diff) * 0.2)).toFixed(2);
	            }
			}],
			  dataZoom: [
			    {
			      type: 'inside',
			      start: 0,
			      end: 10
			    },
			    {
			      start: 0,
			      end: 10
			    }
			  ],
			series : series
			
	};
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};


HISTORY.CHART.CREATE_LINE_ELEC = function(id, item = null){
		
	var title = item.title;
	var unit = item.unit;
		
	var option = {
			color : [
				"#66bb6a", "#2196f3", "#f44336", "#26a69a"
			],
			textStyle : {
				color : "#fff"
			},
			title : {
				text : title,
				x : "center",
				show : true,
				textStyle : {
					fontSize : 14,
					color : "#fff"
				}
			},
			legend : {
				show : true,
				y : "bottom",
				textStyle : {
					color : "#fff"
				}
			},			
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'cross',
		      crossStyle: {
		        color: '#999'
		      }
		    }
		  },
			xAxis : [{
				type : "category",
				axisLabel : {
					color : "#fff"
				}
			}],
			yAxis :  [{
				type : "value",
				axisLabel : {
					formatter : "{value} " + unit,
					color : "#fff"
				},
				min: function(item){
	                var diff = item.max-item.min;
	                if(diff == 0) {diff = 1}
	                return (item.min - ((diff) * 0.2)).toFixed(2);
	            },
	            max: function(item){
	                var diff = item.max-item.min;
	                if(diff == 0) {diff = 1}
	                return (item.max + ((diff) * 0.2)).toFixed(2);
	            }
			}],
			series : item.list
			
	};
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};

HISTORY.CHART.CREATE_LINE_ELEC_MULTI = function(id, item = null){
		
	var title = item.title;
	var unit = item.unit;
		
	var option = {
			textStyle : {
				color : "#fff"
			},
			title : {
				text : title,
				x : "center",
				show : true,
				textStyle : {
					fontSize : 14,
					color : "#fff"
				}
			},
			legend : {
				show : true,
				top : 0,
				right : 0,
				orient : "vertical",
				textStyle : {
					color : "#fff"
				}
			},
			
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'cross',
		      crossStyle: {
		        color: '#999'
		      }
		    }
		  },
			xAxis : [{
				type : "time",
				axisLabel : {
					color : "#fff"
				}
			}],
			yAxis :  [{
				type : "value",
				axisLabel : {
					formatter : "{value} " + unit,
					color : "#fff"
				}
			}],
			series : item.list
			
	};
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};

/*
HISTORY.CHART.CREATE_LINE_ELEC_MULTI = function(id, item = null){
		
	var title = item.title;
	var unit = item.unit;
		
	var option = {
			textStyle : {
				color : "#fff"
			},
			title : {
				text : title,
				x : "center",
				show : true,
				textStyle : {
					fontSize : 14,
					color : "#fff"
				}
			},
			legend : {
				show : true,
				top : 0,
				right : 0,
				orient : "vertical",
				textStyle : {
					color : "#fff"
				}
			},
			
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'cross',
		      crossStyle: {
		        color: '#999'
		      }
		    }
		  },
			xAxis : [{
				type : "time",
				axisLabel : {
					color : "#fff"
				}
			}],
			yAxis :  [{
				name : "순시전력",
				type : "value",
				axisLabel : {
					formatter : "{value} KW",
					color : "#fff"
				}
			},{
				name : "전력량",
				type : "value",
				axisLabel : {
					formatter : "{value} KWH",
					color : "#fff"
				}
			}],
			  dataZoom: [
			    {
			      type: 'inside',
			      start: 0,
			      end: 10
			    },
			    {
			      start: 0,
			      end: 10
			    }
			  ],
			series : item.list
			
	};
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};
*/

HISTORY.CHART.CREATE_LINE = function(id, item = null){
	
	var series = [];	
	var title = item.title;
	var unit = item.unit;
		
	for(var i = 100; i > 0; i--){
		var now = moment().subtract(i, 'seconds').format("YYYY-MM-DD hh:mm:ss");
		var nowdata = {
			name : title,
			value : [
				now,
				UtilM.GET_RANDOM(100)
			]
		};
		
		item.list.push(nowdata);
		
	}		
		
	series.push({
		name : title,
		type : "line",
		data : item.list
	});
		
	var option = {
			color : [
				item.color
			],
			textStyle : {
				color : "#fff"
			},
			title : {
				text : title,
				x : "center",
				show : true,
				textStyle : {
					fontSize : 14,
					color : "#fff"
				}
			},
			legend : {
				show : false,
				y : "bottom",
				textStyle : {
					color : "#fff"
				}
			},
			
		  tooltip: {
		    trigger: 'axis'
		  },
			xAxis : [{
				type : "time",
				axisLabel : {
					color : "#fff"
				}
			}],
			yAxis :  [{
				type : "value",
				axisLabel : {
					formatter : "{value} " + unit,
					color : "#fff"
				}
			}],
			series : series
			
	};
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};


