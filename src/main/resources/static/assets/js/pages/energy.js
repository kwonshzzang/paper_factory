/**
 * 
 */


/******************************
 *
 * ENERGY MANAGER
 *
 *******************************/
var ENERGY = {
	UI : function(){},
	REQ : function(){},
	MODAL : function(){},
	CHART : function(){},
	unit : {
		step1 : {			
			title : "순시유량",
			unit : "KG/HR"
		},
		step2 : {			
			title : "적산유량",
			unit : "Ton"
		},
		step3 : {			
			title : "압력",
			unit : "Bar"
		},
		step4 : {			
			title : "온도",
			unit : "°C"
		}
	},
	data : {
		
	}
};

ENERGY.INIT = function(){
	
	ENERGY.INIT_EVENT();
	ENERGY.CHART_CREATE_TEST();

	ENERGY.UI.TBL_CREATE_FAULT();
	ENERGY.UI.TBL_CREATE_SYSLOG();
	
	ENERGY.REQ.LOAD_PLAN_NOW();
	ENERGY.REQ.LOAD_PLAN_TOTAL();
		
	ENERGY.REQ.LOAD_CHART_STEAM_MINUTE("step1");
	ENERGY.REQ.LOAD_CHART_ELEC_MINUTE("step1");
};

ENERGY.INIT_EVENT = function(){
	
	$("#btn_show_product_schedule").off("click").on("click", function(){
		ENERGY.MODAL.SHOW_PRODUCT_SCHEDULE();
	});
	
	
	$("#btn_show_system_info").off("click").on("click", function(){
		ENERGY.MODAL.SHOW_SYSTEM_INFO();
	});
	
	
	$("#btn_show_process_time").off("click").on("click", function(){
		ENERGY.MODAL.SHOW_PROCESS_TIME();
	});	
	
	
	$(".opt_energy_steam").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK STEAM MINUTE", "STEP" + step);
		
		ENERGY.REQ.LOAD_CHART_STEAM_MINUTE(step);
	});
	
	
	$(".opt_energy_elec").off("click").on("click", function(){
		var step = $(this).data("step");
		
		console.log("CLICK ELEC MINUTE", "STEP" + step);
		
		ENERGY.REQ.LOAD_CHART_ELEC_MINUTE(step);
	});
		
};


/******************************
 *
 * MODAL FUNCTION
 *
 *******************************/
ENERGY.MODAL.SHOW_PRODUCT_SCHEDULE = function(){
	
	ENERGY.REQ.LOAD_PLAN_MONTH_LIST(function(list){
		ENERGY.UI.TBL_CREATE_PRODUCT_PLAN(list);
	});
	
	$("#modal_energy_production_schedule").modal("show");
};


ENERGY.MODAL.SHOW_SYSTEM_INFO = function(){
	$("#modal_energy_system_info").modal("show");
};


ENERGY.MODAL.SHOW_PROCESS_TIME = function(){
	$("#modal_energy_process_time").modal("show");
	
	ENERGY.REQ.LOAD_PLAN_NOW();
};



/******************************
 *
 * REST API REQUEST FUNCTION
 *
 *******************************/
ENERGY.REQ.LOAD_PLAN_NOW = function(){
	
	RM.GET({
		path : "/energy/plan/now"
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_PLAN_NOW", json);
		
		if(json.check){
			var now_plan = json.result.now_plan;
			var lst_todayplan = json.result.list_todayplan;
			
			ENERGY.UI.SET_PLAN_NOW(now_plan);
			
		}
		
	});
};

ENERGY.REQ.LOAD_PLAN_TOTAL = function(){
	
	RM.GET({
		path : "/energy/plan/total"
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_PLAN_TOTAL", json);
		
		if(json.check){
			var today = json.result.today;
			var todaytotal = json.result.todaytotal;
			
			ENERGY.UI.SET_PLAN_TOTAL(today, todaytotal);
		}
		
	});
};

ENERGY.REQ.LOAD_PLAN_MONTH_LIST = function(func){
	
	RM.GET({
		path : "/energy/plan/list"
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_PLAN_MONTH_LIST", json);
		
		if(json.check){
			var list = json.result;
			
			if(func){
				func(list);
			}
		}
	});
};


ENERGY.REQ.LOAD_CHART_ENERGY_COST = function(){
	
	RM.GET({
		path : "/energy/cost"
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_CHART_ENERGY_COST", json);
		
		if(json.check){
			var steam = json.result.steam;
			var elec = json.result.elec;
			
			var steam_now_usage = steam.now.tagUsage;
			var steam_now_cost = steam.now.tagCost;
			var steam_total_usage = steam.total.tagUsage;
			var steam_total_cost = steam.total.tagCost;
			
			var elec_now_usage = elec.now.tagUsage;
			var elec_now_cost = elec.now.tagCost;
			var elec_total_usage = elec.total.tagUsage;
			var elec_total_cost = elec.total.tagCost;
			
			ENERGY.CHART.CREATE_GAUGE("chart_energy_gauge_steam", {
				title : "월 스팀 사용량",
				unit : "%",
				value : Math.round((steam_now_usage/steam_total_usage) * 100)
			});
			
			ENERGY.CHART.CREATE_GAUGE("chart_energy_gauge_elec", {
				title : "월 전력 사용량",
				unit : "%",
				color : '#FFB74D',
				value : Math.round((elec_now_usage/elec_total_usage) * 100)
			});
			
			$("#txt_energy_cost_total").text(UtilM.SET_NUMBER_COMMA(Math.round(steam_total_cost + elec_total_cost)));
		}
		
	});
};



ENERGY.REQ.LOAD_CHART_STEAM_MINUTE = function(step){
	
	RM.GET({
		path : "/energy/steam/chart/minute/" + step
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_CHART_STEAM_MINUTE", json);
		
		if(json.check){
			var result = json.result;
			var today = result.today;
			var yesterday = result.yesterday;
						
			ENERGY.CHART.CREATE_STEAM_MINUTE(step, today, yesterday);
		}
		
	});
};


ENERGY.REQ.LOAD_CHART_ELEC_MINUTE = function(step){
	
	RM.GET({
		path : "/energy/elec/chart/minute/" + step
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_CHART_ELEC_MINUTE", json);
		
		if(json.check){
			var result = json.result;
			var today = result.today;
			var yesterday = result.yesterday;
						
			ENERGY.CHART.CREATE_ELEC_MINUTE(step, today, yesterday);
						
		}
		
	});
};


ENERGY.REQ.LOAD_CHART_STEAM_TOTAL = function(){
	
	RM.GET({
		path : "/energy/steam/total"
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_CHART_STEAM_TOTAL", json);
		
		if(json.check){
			var result = json.result;
			var today = result.today;
			var yesterday = result.yesterday;
			var max = result.max;						
						
			ENERGY.CHART.CREATE_USAGE_BAR("chart_energy_bar_usage_steam", {
				title : "스팀 사용량",
				data : [{
		          value: max.tagUsage,
		          itemStyle: {
		            color: '#FFB74D'
		          }
		        },{
		          value: yesterday.tagUsage,
		          itemStyle: {
		            color: '#2196F3'
		          }
		        },{
		          value: today.tagUsage,
		          itemStyle: {
		            color: '#4CAF50'
		          }
		        }]
			});
		}
		
	});
};


ENERGY.REQ.LOAD_CHART_ELEC_TOTAL = function(){
	
	RM.GET({
		path : "/energy/elec/total"
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_CHART_ELEC_TOTAL", json);
		
		if(json.check){
			var result = json.result;
			var today = result.today;
			var yesterday = result.yesterday;
			var max = result.max;
						
			ENERGY.CHART.CREATE_USAGE_BAR("chart_energy_bar_usage_elec", {
				title : "전력 사용량",
				data : [{
		          value: max.tagUsage,
		          itemStyle: {
		            color: '#FFB74D'
		          }
		        },{
		          value: yesterday.tagUsage,
		          itemStyle: {
		            color: '#2196F3'
		          }
		        },{
		          value: today.tagUsage,
		          itemStyle: {
		            color: '#4CAF50'
		          }
		        }]
			});
			
		}
		
	});
};


ENERGY.REQ.LOAD_CHART_PROCESS_CHANGE_TIME = function(){
	
	RM.GET({
		path : "/energy/process/changetime"
	}, function(json){		
		
		console.log("ENERGY.REQ.LOAD_CHART_PROCESS_CHANGE_TIME", json);
		
		if(json.check){
			var list = json.result.list;

			var lst_category = [];
			var lst_period = [];
			var lst_avg = [];
			
			$.each(list, function(i, item){
				lst_category.push(item.product_type_name);
				lst_period.push(UtilM.NUMBER_2_POINT(item.total));
				lst_avg.push(UtilM.NUMBER_2_POINT(item.average));
			});
				
			ENERGY.CHART.CREATE_TOTAL_BAR("chart_energy_bar_vs_total", {
				title : "지종 교체 통계",
				period : lst_period,
				avg : lst_avg,
				category : lst_category
			});
						
		}
		
	});
};



/******************************
 *
 * UI CREATE FUNCTION
 *
 *******************************/
ENERGY.UI.SET_PLAN_NOW = function(item){
	
	$("#txt_energy_product_type").text(item.product_type_name);
	$("#txt_energy_product_weight").text(item.weight);
	
	var start = moment(item.product_start_date);
	var end = moment(item.product_end_date);
	var now = moment();
	
	var process_hour = moment.duration(now.diff(start)).hours();
	var process_minute = moment.duration(now.diff(start)).minutes();
	
	var goal_hour = moment.duration(end.diff(start)).hours();
	var goal_minute = moment.duration(end.diff(start)).minutes();
	
	if(process_hour < 10){
		process_hour = "0" + process_hour;
	}
	
	if(process_minute < 10){
		process_minute = "0" + process_minute;
	}
	
	if(goal_hour < 10){
		goal_hour = "0" + goal_hour;
	}
	
	if(goal_minute < 10){
		goal_minute = "0" + goal_minute;
	}
	
	
	$("#txt_modal_process_time_hour").text(process_hour);
	$("#txt_modal_process_time_minute").text(process_minute);
	
	$("#txt_modal_goal_time_hour").text(goal_hour);
	$("#txt_modal_goal_time_minute").text(goal_minute);
	
};


ENERGY.UI.SET_PLAN_TOTAL = function(today, total){
	var output_today = 0;
	var output_total = 0;
	var output_percent = 0;
	var pie_list = [];
	
	$.each(today, function(i, item){
		var count = item.total;
		
		if(isNaN(count)){
			count = 0
		}
		
		output_today += (count * 1);
	});
	
	$.each(total, function(i, item){
		var count = item.total;
		
		if(isNaN(count)){
			count = 0
		}
		
		output_total += (count * 1);
		
		pie_list.push({
			name : item.product_type_name,
			value : count
		});
	});
	
	output_percent = Math.round((output_today / output_total) * 100);
	
	$("#txt_plan_output_today").text(UtilM.SET_NUMBER_COMMA(output_today));
	$("#txt_plan_output_month").text(UtilM.SET_NUMBER_COMMA(output_total));
	$("#txt_plan_output_percent").text(output_percent + "%");
	
	ENERGY.CHART.CREATE_GOAL_PIE("chart_energy_goal_pie", pie_list);
};


ENERGY.UI.TBL_CREATE_PRODUCT_PLAN_ITEM = function(item){
	var tr = $("<tr/>");
	var td_id = $("<td/>");
	var td_start = $("<td/>");
	var td_end = $("<td/>");
	var td_output = $("<td/>");
	var td_paper_category = $("<td/>");
	var td_paper_category_weight = $("<td/>");
	var td_cotting_category = $("<td/>");
	var td_cotting_category_weight = $("<td/>");
	var td_coiling = $("<td/>");
	var td_skid = $("<td/>");
	var td_bigo = $("<td/>");
	
	var start = moment(item.product_start_date).format("YYYY-MM-DD HH:mm:ss");
	var end = moment(item.product_end_date).format("YYYY-MM-DD HH:mm:ss");
	
	td_id.text(item.product_plan_id);
	td_start.text(start);
	td_end.text(end);
	td_output.text(item.output);
	td_paper_category.text(item.product_type_name);
	td_paper_category_weight.text(item.weight);
	td_cotting_category.text(item.cotting_product_type_name);
	td_cotting_category_weight.text(item.cotting_weight);
	td_coiling.text(item.coiling);
	td_skid.text(item.skid);
	td_bigo.text(item.bigo);
		
	tr.append(td_id);
	tr.append(td_start);
	tr.append(td_end);
	tr.append(td_output);
	tr.append(td_paper_category);
	tr.append(td_paper_category_weight);
	tr.append(td_cotting_category);
	tr.append(td_cotting_category_weight);
	tr.append(td_coiling);
	tr.append(td_skid);
	tr.append(td_bigo);
	
	if(moment().isBetween(start, end)){
		tr.addClass("bg-primary");
	}else{
		tr.removeClass("bg-primary");
	}
	
	return tr;
};

ENERGY.UI.SET_ANALYSIS_HISTORY = function(){	
	var table = $("#tbl_analysis_history").DataTable();
	
	table.destroy();
	
	$("#tbl_analysis_history").DataTable({
		"ordering": false,		
		"scrollX": false,
		pageLength : 5
	});
};




/******************************
 *
 * TABLE CREATE FUNCTION
 *
 *******************************/
ENERGY.UI.TBL_CREATE_PRODUCT_PLAN = function(list){
		
	var tbody = $("#tbl_energy_product_plan_body");
	var table = $("#tbl_energy_product_plan").DataTable();
	
	table.destroy();
	tbody.empty();
	
	$.each(list, function(i, item){
		var tr = ENERGY.UI.TBL_CREATE_PRODUCT_PLAN_ITEM(item);
		
		if(tr){
			tbody.append(tr);
		}
	});
	
	$("#tbl_energy_product_plan").DataTable({
		"ordering": false,		
		"scrollX": false,
		pageLength : 10
	});
};

ENERGY.UI.TBL_CREATE_FAULT = function(){	
	var table = $("#tbl_energy_fault").DataTable();
	
	table.destroy();
	
	$("#tbl_energy_fault").DataTable({
		"ordering": false,		
		"scrollX": false,
		pageLength : 5
	});
};

ENERGY.UI.TBL_CREATE_SYSLOG = function(){	
	var table = $("#tbl_energy_syslog").DataTable();
	
	table.destroy();
	
	$("#tbl_energy_syslog").DataTable({
		"ordering": false,		
		"scrollX": false,
		pageLength : 5
	});
};


/******************************
 *
 * CHART CREATE FUNCTION
 *
 *******************************/


ENERGY.CHART.CONVERT_DATA_LIST = function(list){
	var result = [];
	
	$.each(list, function(i, ele){		
		var date = moment(ele.measureDate).format("HH:mm");
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


ENERGY.CHART_CREATE_TEST = function(){
	
	ENERGY.REQ.LOAD_CHART_ENERGY_COST();	
	
	ENERGY.REQ.LOAD_CHART_STEAM_TOTAL();
	
	ENERGY.REQ.LOAD_CHART_ELEC_TOTAL();
	
	ENERGY.REQ.LOAD_CHART_PROCESS_CHANGE_TIME();
};

ENERGY.CHART.CREATE_STEAM_MINUTE = function(step, today, yesterday){
	var unit = ENERGY.unit[step];
	
	var lst_today = ENERGY.CHART.CONVERT_DATA_LIST(today);
	var lst_yesterday = ENERGY.CHART.CONVERT_DATA_LIST(yesterday);
	
	ENERGY.CHART.CREATE_STEAM_LINE("chart_energy_steam_line", {
		title : unit.title,
		unit : unit.unit,
		list : [{
			name : "현재값",
			type : "line",
			data : lst_today
		},{
			name : "과거값",
			type : "line",
			data : lst_yesterday
		}]
	});
};

ENERGY.CHART.CREATE_ELEC_MINUTE = function(step, today, yesterday){
	
	var lst_today = ENERGY.CHART.CONVERT_DATA_LIST(today);
	var lst_yesterday = ENERGY.CHART.CONVERT_DATA_LIST(yesterday);
	
	ENERGY.CHART.CREATE_ELEC_LINE("chart_energy_elec_line", {
		title : "전력 에너지 사용 현황",
		unit : "KW",
		list : [{
			name : "현재값",
			type : "line",
			data : lst_today
		},{
			name : "과거값",
			type : "line",
			data : lst_yesterday
		}]
	});
};

ENERGY.CHART.CREATE_GOAL_PIE = function(id, list){
	
	var option = {
		 tooltip: {
		    trigger: 'item'
		  },
		  legend: {
		    top: 'bottom',
			textStyle : {
				color: '#fff'
			}
		  },
		  series: [
		    {
		      name: 'Access From',
		      type: 'pie',
		      radius: '70%',
			  center : ["50%", "40%"],
		      label: {
		        color: '#fff',
				show : false
		      },
		      labelLine: {
		        lineStyle: {
		          color: 'rgba(255, 255, 255, 0.3)'
		        },
		        smooth: 0.2,
		        length: 10,
		        length2: 20
		      },
		      data: list,
		      emphasis: {
		        itemStyle: {
		          shadowBlur: 10,
		          shadowOffsetX: 0,
		          shadowColor: 'rgba(0, 0, 0, 0.5)'
		        }
		      }
		    }
		  ]
	};
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};

ENERGY.CHART.CREATE_GAUGE = function(id, item){
	var color = "#2196F3";
	
	if(item.color){
		color = item.color;
	}
	
	var option = {
		  series: [
		    {
		      type: 'gauge',
		      itemStyle: {
		        color: color
		      },
			  progress : {
				show : true
			  },
		      axisLabel: {
		        color: 'white',
		        distance: 20,
		        fontSize: 12
		      },
		      title: {
		        offsetCenter: [0, '-20%'],
		        fontSize: 16,
				show : false,
				textStyle : {
					color : "white",
					fontWeight : "bold"
				},
				text : item.title
		      },
		      axisTick: {
		        distance: 5,
		        length: 6,
		        lineStyle: {
		          color: '#fff',
		          width: 1
		        }
		      },
		      splitLine: {
		        distance: 5,
		        length: 10,
		        lineStyle: {
		          color: '#fff',
		          width: 2
		        }
		      },
		      axisLine: {
		        lineStyle: {
		          width: 10,
				  color: [[1, '#9d9d9d54']]
		        }
		      },
		      axisLabel: {
		        color: 'white',
		        distance: 14,
		        fontSize: 12
		      },
		      detail: {
		        valueAnimation: true,
		        formatter: '{value} ' + item.unit,
		        color: 'auto',
        		fontSize : 20
		      },
		      data: [
		        {
		          value: item.value,
				  name : item.title
		        }
		      ]
		    }
		]
	};
	
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};

ENERGY.CHART.CREATE_USAGE_BAR = function(id, item){
	var option = {
		  title: {
		    text: item.title,
			x : "center",
			textStyle : {
				color: '#fff'
			}
		  },
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'shadow'
		    }
		  },
		  legend: {
			show: false
		  },
		  grid: {
		    left: '3%',
		    right: '4%',
		    bottom: '3%',
		    containLabel: true
		  },
		  xAxis: {
		    type: 'value',
		    boundaryGap: [0, 0.01]
		  },
		  yAxis: {
		    type: 'category',
		    data: ['최대', '과거', '현재']
		  },
		  series: [
		    {
		      name: '2022',
		      type: 'bar',
		      data: item.data
		    }
		  ]
	};	
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};

ENERGY.CHART.CREATE_TOTAL_BAR = function(id, item){
	var series = [];
	
	series.push({ 
		name : "소요시간",
		type : "bar",
		data : item.period 
	});
	series.push({ 
		name : "평균시간",
		type : "bar",
		data : item.avg 
	});
	
	var option = {
		  title: {
		    text: item.title,
			x : "center",
			textStyle : {
				color: '#fff'
			}
		  },
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'shadow'
		    }
		  },
		  legend: {
			show: true,
			top: "bottom",
			textStyle : {
				color: '#fff'
			}
		  },
		  xAxis: {
		    type: 'category',
			data : item.category
		  },
		  yAxis: {
			name : "시간",
		    type: 'value',
			axisLabel : {
				formatter : "{value} Hour",
				color : "#fff"
			}
		  },
		  series: series
	};	
	
	var chart = ChartM.getChart(id);
	
	if(chart){
		
	}else{
		chart = ChartM.chart.init(document.querySelector("#" + id));
	}
	
	chart.setOption(option);
};

ENERGY.CHART.CREATE_STEAM_LINE = function(id, item = null){
	
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
				show : false,
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
			    trigger: 'axis'
			},
			grid: {
		      	left: 100,
		      	right: 20
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

ENERGY.CHART.CREATE_ELEC_LINE = function(id, item = null){
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
				show : false,
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
			    trigger: 'axis'
			},
			grid: {
		      	left: 100,
		      	right: 20
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
