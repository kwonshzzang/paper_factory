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
	HISTORY.CHANGE_PAGE("steam");
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
		
		HISTORY.SEARCH(type);
	});
	
	
	$(".btn-history-download-excel").off("click").on("click", function(){
		var type = $(this).data("type");
		
		HISTORY.DOWNLOAD_EXCEL(type);
	});
	
	
	$(".btn-history-download-csv").off("click").on("click", function(){
		var type = $(this).data("type");
				
		HISTORY.DOWNLOAD_CSV(type);
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
};

HISTORY.SEARCH = function(type){
		
	switch(type){
		case "steam":
		break;
		case "elec":
		break;
		case "system":
		break;
		case "papertype":
		break;
	}
};

HISTORY.DOWNLOAD_EXCEL = function(type){
		
	switch(type){
		case "steam":
		break;
		case "elec":
		break;
		case "system":
		break;
		case "papertype":
		break;
	}
};

HISTORY.DOWNLOAD_CSV = function(type){
		
	switch(type){
		case "steam":
		break;
		case "elec":
		break;
		case "system":
		break;
		case "papertype":
		break;
	}
};


/******************************
 *
 * REST API REQUEST FUNCTION
 *
 *******************************/
HISTORY.REQ.LOAD_STEAM_HISTORY = function(path, func){
	
	RM.GET_ENERGY({
		path : path
	}, function(json){		
		
		console.log("HISTORY.REQ.LOAD_STEAM_HISTORY [" + path + "]", json);
		
		if(json.check){
			var list = json.result;
			
			if(func){
				func(list);
			}
		}
	});
};

HISTORY.REQ.LOAD_TAGS_HISTORY = function(path, func){
	
	RM.GET_TAGS({
		path : path
	}, function(json){		
		
		console.log("HISTORY.REQ.LOAD_TAGS_HISTORY [" + path + "]", json);
		
		if(json.check){
			var list = json.result;
			
			if(func){
				func(list);
			}
		}
	});
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
	
	$(".opt_history_elec_type1").off("click").on("click", function(){
		var step = $(this).data("step");
		
	});
	
	$(".opt_history_elec_type2").off("click").on("click", function(){
		var step = $(this).data("step");
		
	});
	
	$(".opt_history_elec_type3").off("click").on("click", function(){
		var step = $(this).data("step");
		
	});
	
	$(".opt_history_elec_total").off("click").on("click", function(){
		var step = $(this).data("step");
		
	});
	
	
	HISTORY.CHART.CREATE_ELEC();
		
};

HISTORY.UI.INIT_SYSTEM = function(){
	
	$(".opt_history_system_pre_dryer").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK PRE DRYER", "STEP" + step);
		
	});
	
	$(".opt_history_system_press").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK SIZE PRESS", "STEP" + step);
		
	});
	
	$(".opt_history_system_after_dryer").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK AFTER DRYER", "STEP" + step);
		
	});
	
	$(".opt_history_system_reel").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK REEL", "STEP" + step);
		
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

/******************************
 *
 * CHART CREATE FUNCTION
 *
 *******************************/

HISTORY.CHART.CREATE_STEAM = function(){
	
	HISTORY.REQ.LOAD_STEAM_HISTORY("/list/flux", function(list){		
	
		HISTORY.CHART.CREATE_LINE_STEAM("chart_history_steam_step",{
			title : "순시유량",
			unit : "KG/HR",
			color : "#66bb6a",
			list : list
		});
		
	});
	
	
	HISTORY.REQ.LOAD_STEAM_HISTORY("/list/totalflux", function(list){		
				
		HISTORY.CHART.CREATE_LINE_STEAM("chart_history_steam_total",{
			title : "적산유량",
			unit : "Ton",
			color : "#26a69a",
			list : list
		});
		
	});
	
	
	HISTORY.REQ.LOAD_STEAM_HISTORY("/list/press", function(list){		
			
		HISTORY.CHART.CREATE_LINE_STEAM("chart_history_steam_pressure",{
			title : "압력",
			unit : "Bar",
			color : "#2196f3",
			list : list
		});
	
	});
	
	
	HISTORY.REQ.LOAD_STEAM_HISTORY("/list/temp", function(list){		
		
		HISTORY.CHART.CREATE_LINE_STEAM("chart_history_steam_temp",{
			title : "온도",
			unit : "C",
			color : "#f44336",
			list : list
		});
		
	});
		
		
};

HISTORY.CHART.CREATE_ELEC = function(){
	
	
	HISTORY.REQ.LOAD_STEAM_HISTORY("/list/elec", function(list){	
		var lst_kw1 = [];
		var lst_kw2 = [];
		var lst_kw3 = [];
		var lst_kw1_total = [];	
		var lst_kw2_total = [];
		var lst_kw3_total = [];	
		
		var lst_kwh1 = [];
		var lst_kwh2 = [];
		var lst_kwh3 = [];
		var lst_kwh1_total = [];	
		var lst_kwh2_total = [];	
		var lst_kwh3_total = [];				
	
		$.each(list, function(i, ele){
			var date = moment(ele.date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");
			var kw_total = (ele.kw1 * 1) + (ele.kw2 * 1) + (ele.kw3 * 1);
			var kwh_total = (ele.kwh1 * 1) + (ele.kwh2 * 1) + (ele.kwh3 * 1);
			
			lst_kw1.push([date, ele.kw1]);
			lst_kw2.push([date, ele.kw2]);
			lst_kw3.push([date, ele.kw3]);
			
			if(kw_total > 0){				
				lst_kw1_total.push([date, (ele.kw1 * 1) / kw_total]);
				lst_kw2_total.push([date, (ele.kw2 * 1) / kw_total]);
				lst_kw3_total.push([date, (ele.kw3 * 1) / kw_total]);
			}else{
				lst_kw1_total.push([date, 0]);
				lst_kw2_total.push([date, 0]);
				lst_kw3_total.push([date, 0]);
			}
			
			lst_kwh1.push([date, ele.kwh1]);
			lst_kwh2.push([date, ele.kwh2]);
			lst_kwh3.push([date, ele.kwh3]);
			
			if(kwh_total > 0){				
				lst_kwh1_total.push([date, (ele.kwh1 * 1) / kwh_total]);
				lst_kwh2_total.push([date, (ele.kwh2 * 1) / kwh_total]);
				lst_kwh3_total.push([date, (ele.kwh3 * 1) / kwh_total]);
			}else{
				lst_kwh1_total.push([date, 0]);
				lst_kwh2_total.push([date, 0]);
				lst_kwh3_total.push([date, 0]);
			}
						
		});
			
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_type1",{
			title : "전력(Drive 5-1)",
			unit : "KW",
			color : "#66bb6a",
			list : [{
				name : "순시전력",
				type : "line",
				data : lst_kw1
			},{
				name : "전력량",
				type : "line",
				data : lst_kwh1
			}]
		});
		
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_type2",{
			title : "전력(Drive 5-2)",
			unit : "KW",
			color : "#26a69a",
			list : [{
				name : "순시전력",
				type : "line",
				data : lst_kw2
			},{
				name : "전력량",
				type : "line",
				data : lst_kwh2
			}]
		});
		
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_type3",{
			title : "전력(Drive 5-3)",
			unit : "KW",
			color : "#2196f3",
			list : [{
				name : "순시전력",
				type : "line",
				data : lst_kw3
			},{
				name : "전력량",
				type : "line",
				data : lst_kwh3
			}]
		});
		
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_elec_total",{
			title : "전체전력(Drive 5-1, 5-2, 5-3)",
			unit : "KW",
			color : "#f44336",
			list : [{
				name : "순시전력[5-1]",
				type : "line",
				data : lst_kw1_total
			},{
				name : "순시전력[5-2]",
				type : "line",
				data : lst_kw2_total
			},{
				name : "순시전력[5-3]",
				type : "line",
				data : lst_kw3_total
			},{
				name : "전력량[5-1]",
				type : "line",
				data : lst_kwh1_total
			},{
				name : "전력량[5-2]",
				type : "line",
				data : lst_kwh2_total
			},{
				name : "전력량[5-3]",
				type : "line",
				data : lst_kwh3_total
			}]
		});
	});	
	
	
};

HISTORY.CHART.CREATE_SYSTEM = function(){
	
	HISTORY.REQ.LOAD_TAGS_HISTORY("/list/pre", function(list){	
		
		var lst_flow = [];
		var lst_set = [];
			
		$.each(list, function(i, ele){
			var date = moment(ele.date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");
			var flow = 0;
			var set = 0;
			
			if(ele.flow1 != ""){
				flow = ele.flow1;
			}
			
			if(ele.set1 != ""){
				set = ele.set1;
			}
			
			lst_flow.push([date, flow]);
			lst_set.push([date, set]);
		});
			
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_pre_dryer",{
			title : "Pre Dryer",
			unit : "Kg/cm2",
			color : "#66bb6a",
			list : [{
				name : "순시값",
				type : "line",
				data : lst_flow
			},{
				name : "설정값",
				type : "line",
				data : lst_set
			}]
		});
		
	});
	
	
	HISTORY.REQ.LOAD_TAGS_HISTORY("/list/press", function(list){	
		
		var lst_flow = [];
		var lst_set = [];
			
		$.each(list, function(i, ele){
			var date = moment(ele.date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");
			var flow = 0;
			var set = 0;
			
			if(ele.flow1 != ""){
				flow = ele.flow1;
			}
			
			if(ele.set1 != ""){
				set = ele.set1;
			}
			
			lst_flow.push([date, flow]);
			lst_set.push([date, set]);
		});
			
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_press",{
			title : "Size Press",
			unit : "Kg/cm2",
			color : "#26a69a",
			list : [{
				name : "순시값",
				type : "line",
				data : lst_flow
			},{
				name : "설정값",
				type : "line",
				data : lst_set
			}]
		});
		
	});
	
	
	HISTORY.REQ.LOAD_TAGS_HISTORY("/list/after", function(list){	
	
		
		var lst_flow = [];
		var lst_set = [];
			
		$.each(list, function(i, ele){
			var date = moment(ele.date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");
			var flow = 0;
			var set = 0;
			
			if(ele.flow1 != ""){
				flow = ele.flow1;
			}
			
			if(ele.set1 != ""){
				set = ele.set1;
			}
			
			lst_flow.push([date, flow]);
			lst_set.push([date, set]);
		});
			
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_after_dryer",{
			title : "After Dryer",
			unit : "Kg/cm2",
			color : "#2196f3",
			list : [{
				name : "순시값",
				type : "line",
				data : lst_flow
			},{
				name : "설정값",
				type : "line",
				data : lst_set
			}]
		});
		
	});
	
	
	HISTORY.REQ.LOAD_TAGS_HISTORY("/list/reel", function(list){	
		
		var lst_flow = [];
		var lst_set = [];
			
		$.each(list, function(i, ele){
			var date = moment(ele.date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");
			var flow = 0;
			var set = 0;
			
			if(ele.flow1 != ""){
				flow = ele.flow1;
			}
			
			if(ele.set1 != ""){
				set = ele.set1;
			}
			
			lst_flow.push([date, flow]);
			lst_set.push([date, set]);
		});
			
		HISTORY.CHART.CREATE_LINE_ELEC("chart_history_system_reel",{
			title : "Reel",
			unit : "Kg/cm2",
			color : "#f44336",
			list : [{
				name : "순시값",
				type : "line",
				data : lst_flow
			},{
				name : "설정값",
				type : "line",
				data : lst_set
			}]
		});
	});
	
	
	
	
};

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
		var date = moment(ele.date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
		var data = {
			name : title,
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


