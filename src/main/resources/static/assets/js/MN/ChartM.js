/******************************
 *
 * CHART MANAGER
 *
 *******************************/
var ChartM = {
	chart : echarts,
	color : [
        '#027A65','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ],
	chartlist : {
		stream : null,
		water : null,
		temp : null,
		energy : {
			datalist : [],
			chart : null
		}
	}
};

ChartM.resize = function(){
	$(".chart").each(function(){
    	try{
	        var id = $(this).attr('_echarts_instance_');
	        window.echarts.getInstanceById(id).resize();
    	}catch{
    		
    	}
    });
};

ChartM.getChart = function(id){
	var chart = null;
	
	chart = ChartM.chart.getInstanceByDom(document.getElementById(id));
	
	return chart;
	
};


/* ------------------------------------------------------------------------------
 *
 *  # DATA MANAGEMENT
 *
 * ---------------------------------------------------------------------------- */
 
ChartM.CREATE_RAND_COLOR = function(){
	
	var randomColor = '#'+ ('000000' + 
	Math.floor(Math.random()*16777215).toString(16)).slice(-6);


	return randomColor;
};


ChartM.CREATE_REALTIME_RAND_DATA = function(min, max, list){
	if(list == null || list.length == 0){
		list = Array(120).fill(0);
	}
	
	list.shift();
	
	list.push(UtilM.GET_RANDOM_PERIOD(min, max));
	
	return list;
	
};


ChartM.CREATE_RAND_DATA = function(index = 0){
	var list = [];
	
	var base = 0;
	
	for(var i = 0; i < 100; i++){
		var period = UtilM.GET_RANDOM_PERIOD(0, 60);
		
		if(base > 1200)
			continue;		
		
		if(period % 2 == 0 && period != 0){		
			var start = moment().hour(0).minute(0).second(base).valueOf();
			var end = moment(start).add(period, "seconds").valueOf();
			
			var data = {
				index : index,
				start : start,
				end : end,
				name : ChartM.category[index]
			};
			
			list.push(data);
		}		
		
		base += period;
		
		
	}
	
	return list;
	
};


ChartM.CREATE_INIT_DATA = function(){
	ChartM.chartlist.energy.datalist = UtilM.CREATE_INIT_DATA(120);
};

ChartM.SET_DATA = function(list, val){	
	list.shift();
	list.push(ChartM.GET_DATA(val));
	
	return list;
};

ChartM.GET_DATA = function(val){
	var now = moment().format("YYYY-MM-DD HH:mm:ss");
	var data = {
		name : now,
		value : [
			now,
			val
		]
	};
	
	return data;
};




/* ------------------------------------------------------------------------------
 *
 *  # GUAGE CHART DRAW FUNCTION
 *
 * ---------------------------------------------------------------------------- */
ChartM.CREATE_GAUGE_TEMP = function(id, item){	
	
	var option = {
		  series: [
		    {
		      type: 'gauge',
			  center: ['50%', '60%'],
		      startAngle: 200,
		      endAngle: -20,
		      min: 0,
		      max: 100,
		      splitNumber: 5,
		      itemStyle: {
		        color: '#fd666d'
		      },
		      progress: {
		        show: true,
		        width: 10
		      },
		      pointer: {
		        show: false
		      },
		      axisLine: {
		        lineStyle: {
		          width: 10,
				  color: [[1, '#9d9d9d54']]
		        }
		      },
		      axisTick: {
		        distance: -20,
		        length: 6,
		        lineStyle: {
		          color: '#fff',
		          width: 1
		        }
		      },
		      splitLine: {
		        distance: -20,
		        length: 20,
		        lineStyle: {
		          color: '#fff',
		          width: 2
		        }
		      },
		      axisLabel: {
		        color: '#999',
		        distance: -30,
		        fontSize: 12
		      },
		      title: {
		        offsetCenter: [0, '-20%'],
		        fontSize: 20,
				textStyle : {
					color : "white",
					fontWeight : "bold"
				},
				text : item.title
		      },
		      detail: {
		        valueAnimation: true,
		        formatter: '{value} ' + item.unit,
		        color: 'auto',
        		fontSize : 20
		      },
		      data: [
		        {
		          value: 70,
				  name : "온도"
		        }
		      ]
		    }
		]
	};	
	
	ChartM.chartlist.temp = ChartM.chart.init(document.querySelector("#" + id));
			
	ChartM.chartlist.temp.setOption(option);
};

ChartM.UPDATE_GAUGE_TEMP = function(val){
	if(ChartM.chartlist.temp){
		ChartM.chartlist.temp.setOption({
			series: [
		      {
		        data: [
		          {
		            value: +(Math.random() * 100).toFixed(2),
				  	name : "온도"
		          }
		        ]
		      }
		    ]
		});
	}
	
};

ChartM.CREATE_GAUGE_STEAM = function(id, item){
	
	var option = {
		  series: [
		    {
		      type: 'gauge',
		      axisLine: {
		        lineStyle: {
		          width: 10,
		          color: [
		            [0.3, '#67e0e3'],
		            [0.7, '#37a2da'],
		            [1, '#fd666d']
		          ]
		        }
		      },
		      pointer: {
		        itemStyle: {
		          color: 'auto'
		        }
		      },
		      axisTick: {
		        distance: -20,
		        length: 6,
		        lineStyle: {
		          color: '#fff',
		          width: 1
		        }
		      },
		      splitLine: {
		        distance: -20,
		        length: 20,
		        lineStyle: {
		          color: '#fff',
		          width: 2
		        }
		      },
		      axisLabel: {
		        color: 'auto',
		        distance: 20,
		        fontSize: 12
		      },
		      title: {
		        offsetCenter: [0, '-20%'],
		        fontSize: 16,
				textStyle : {
					color : "white",
					fontWeight : "bold"
				},
				text : item.title
		      },
		      detail: {
		        valueAnimation: true,
		        formatter: '{value} ' + item.unit,
		        color: 'auto',
        		fontSize : 20
		      },
		      data: [
		        {
		          value: 70,
				  name : "스팀 압력"
		        }
		      ]
		    }
		]
	};	
	
	ChartM.chartlist.stream = ChartM.chart.init(document.querySelector("#" + id));
			
	ChartM.chartlist.stream.setOption(option);
};

ChartM.UPDATE_GAUGE_STEAM = function(val){
	if(ChartM.chartlist.stream){
		ChartM.chartlist.stream.setOption({
			series: [
		      {
		        data: [
		          {
		            value: +(Math.random() * 100).toFixed(2),
				  	name : "스팀 압력"
		          }
		        ]
		      }
		    ]
		});
	}
};


ChartM.CREATE_GAUGE_WATER = function(id, item){	
	
	var option = {
		  series: [
		    {
		      type: 'gauge',
		      itemStyle: {
		        color: '#2196f3'
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
		          value: 70,
				  name : "수분 함량"
		        }
		      ]
		    }
		]
	};	
	
	ChartM.chartlist.water = ChartM.chart.init(document.querySelector("#" + id));
			
	ChartM.chartlist.water.setOption(option);
};

ChartM.UPDATE_GAUGE_WATER = function(val){
	if(ChartM.chartlist.water){
		ChartM.chartlist.water.setOption({
			series: [
		      {
		        data: [
		          {
		            value: +(Math.random() * 100).toFixed(2),
				  	name : "수분 함량"
		          }
		        ]
		      }
		    ]
		});
	}
};


/* ------------------------------------------------------------------------------
 *
 *  # LINE CHART DRAW FUNCTION
 *
 * ---------------------------------------------------------------------------- */
ChartM.CREATE_REALTIME_LINE_ENERGY = function(id, item){
	ChartM.CREATE_INIT_DATA();
				
	var series = [];	
	var title = item.title;
	var unit = item.unit;
	
	series.push({
		name : item.title,
		type : "line",
        showSymbol: false,
		areaStyle: {},
		data : ChartM.chartlist.energy.datalist
	});
	
	var option = {
			color : [
				"#2196f3",
				"#5ab55e"
			],
			textStyle : {
				color : "#fff"
			},
			title : {
				text : title,
				x : "center",
				show : true,
				textStyle : {
					fontSize : 16,
					color : "#fff"
				}
			},
			legend : {
				show : true,
				bottom : 0,
				textStyle : {
					fontSize : 14,
					color : "#fff"
				}
			},
			
			tooltip: {
			  	trigger: 'axis',
			 	formatter : function(params){
					var res = params[0];
					
					var result = "";
					
					result += res.marker;
					result += res.seriesName + "<br/>";
					result += res.data.name + "<br/>";
					result += res.data.value[1] + item.unit;					
										
					return result;
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
				min : 0,
				max : 100,
				axisLabel : {
					formatter : "{value} " + unit,
					color : "#fff",
					overflow : "breakAll"
				}
			}],
			series : series
			
	};
	
	ChartM.chartlist.energy.chart = ChartM.chart.init(document.querySelector("#" + id));
			
	ChartM.chartlist.energy.chart.setOption(option);
	
};

ChartM.UPDATE_REALTIME_LINE_ENERGY = function(){
	
	ChartM.chartlist.energy.datalist = ChartM.SET_DATA(ChartM.chartlist.energy.datalist, +(Math.random() * 100).toFixed(2));
	
    ChartM.chartlist.energy.chart.setOption({
        series: [{
            data: ChartM.chartlist.energy.datalist
        }]
    });
};



/* ------------------------------------------------------------------------------
 *
 *  # BAR CHART DRAW FUNCTION
 *
 * ---------------------------------------------------------------------------- */

ChartM.CREATE_RND_DATA_FOR_VS = function(max){
	var list = [];
	
	for(var i = max; i > 0; i--){
		
		var val = UtilM.GET_RANDOM(100);
		var now = moment().subtract(i, 'days').format("YYYY-MM-DD");
		var data = {
			name : now,
			value : [
				now,
				val
			]
		};
		
		list.push(data);
	}
	
	return list;
};

ChartM.CREATE_BAR_VS = function(id){
				
	var series = [];	
	var unit = "kw/h";
	
	var data_real = [];
	var data_predict = [];
	
	data_real = ChartM.CREATE_RND_DATA_FOR_VS(31);
	data_predict = ChartM.CREATE_RND_DATA_FOR_VS(31);
	
	series.push({
		name : "예측 소비량",
		type : "bar",
        showSymbol: false,
		data : data_predict
	});
	
	series.push({
		name : "측정 소비량",
		type : "bar",
        showSymbol: false,
		data : data_real
	});
	
	var option = {
			color : [
				"#2196f3",
				"#5ab55e"
			],
			textStyle : {
				color : "#fff"
			},
			title : {
				text : "에너지 소비량",
				x : "center",
				show : true,
				textStyle : {
					fontSize : 16,
					color : "#fff"
				}
			},
			legend : {
				show : true,
				bottom : 0,
				textStyle : {
					fontSize : 14,
					color : "#fff"
				}
			},
			/*
			toolbox: {
		        feature: {
		            saveAsImage: {
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						title : "이미지로 저장"
					}
		        },
   				right: 30
		    },
			*/
			tooltip: {
			  	trigger: 'axis'
			},
			xAxis : [{
				type : "category",
				axisLabel : {
					color : "#fff"
				}
			}],
			yAxis :  [{
				type : "value",
				min : 0,
				max : 100,
				axisLabel : {
					formatter : "{value} " + unit,
					color : "#fff",
					overflow : "breakAll"
				}
			}],
			series : series
			
	};
	
	var chart = ChartM.chart.init(document.querySelector("#" + id));
			
	chart.setOption(option);
	
};


