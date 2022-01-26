/**
 * 
 */


/******************************
 *
 * ANALYSIS MANAGER
 *
 *******************************/
var ANALYSIS = {
	
};

ANALYSIS.INIT = function(){
	
	ANALYSIS.INIT_EVENT();
	ANALYSIS.CHART_CREATE_TEST();
};

ANALYSIS.INIT_EVENT = function(){
	
	$("#btn_save_vs_chart").click(function(){
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
	
	
	$("#btn_analysis_modal_alert").click(function(){
		ModalM.SHOW_ALERT("알림", "알림 모달 출력 테스트");
	});
	
	
	$("#btn_analysis_modal_confirm").click(function(){
		ModalM.SHOW_CONFIRM("선택", "Confirm 모달 출력 테스트",
		function(){
			alert("선택했음");
		});
	});
	
	
	$("#btn_analysis_modal_loading").click(function(){
		
		ModalM.SHOW_LOADING("show");
	});
		
};


ANALYSIS.CHART_CREATE_TEST = function(){
	ChartM.CREATE_BAR_VS("chart_analysis_energy_vs");
	
};


