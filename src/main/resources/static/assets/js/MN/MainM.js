/******************************
 *
 * MAIN MANAGER
 *
 *******************************/

var MainM = {
	isready : false,
	pageurl : {
		dashboard : "/pages/dashboard.html",
		energy : "/pages/energy.html",
		system : "/pages/system.html",
		analysis : "/pages/analysis.html",
		history : "/pages/history.html",
		setting : "/pages/settings.html"
	}
};


MainM.INIT = function(){
	
	MainM.INIT_PAGE();
	MainM.INIT_EVENT();
	
};

MainM.INIT_PAGE = function(){	
	var d = new Date();
		
	$("#page_dashboard").load(MainM.pageurl.dashboard + "?v=" + d.getTime(), function(data, status, xhr){
		MainM.CHANGE_MENU("dashboard");
	});
};

MainM.LOAD_PAGE = function(type){
	
	var d = new Date();
	var area = null;
	var page = "";
	
	switch(type){
		case "dashboard": 
		area = $("#page_dashboard");
		page = MainM.pageurl.dashboard + "?v=" + d.getTime();
		break;
		case "energy": 
		area = $("#page_energy");
		page = MainM.pageurl.energy + "?v=" + d.getTime();
		break;
		case "system": 
		area = $("#page_system");
		page = MainM.pageurl.system + "?v=" + d.getTime();
		break;
		case "analysis": 
		area = $("#page_analysis");
		page = MainM.pageurl.analysis + "?v=" + d.getTime();
		break;
		case "history": 
		area = $("#page_history");
		page = MainM.pageurl.history + "?v=" + d.getTime();
		break;
		case "settings": 
		area = $("#page_settings");
		page = MainM.pageurl.setting + "?v=" + d.getTime();
		break;
	}	
	
	area.load(page, function(data, status, xhr){
		MainM.CHANGE_MENU(type);
	});
};

MainM.INIT_EVENT = function(){	
    
	$(document).on('show.bs.modal', '.modal', function () {
	    var zIndex = 1040 + (10 * $('.modal:visible').length);
	    $(this).css('z-index', zIndex);
	    setTimeout(function() {
	        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
	    }, 0);
	});
	
	$(document).on('hidden.bs.modal', '.modal', function () {
	    $('.modal:visible').length && $(document.body).addClass('modal-open');
	});
	
	$(".menu-item").click(function(){
		var ele = $(this);
		var type = ele.data("menu");
		
		if(type != "dashboard"){
			MainM.LOAD_PAGE(type);
		}else{
			MainM.CHANGE_MENU(type);
		}
		
	});
	
};

MainM.CHANGE_MENU = function(type){		
	$(".nav-item").removeClass("active");
	$(".page").hide();
	
	switch(type){
		case "dashboard":
		$(".nav-dashboard").addClass("active");
		$("#page_dashboard").show();
		break;
		case "energy":
		$(".nav-energy").addClass("active");
		$("#page_energy").show();
		break;
		case "system":
		$(".nav-system").addClass("active");
		$("#page_system").show();
		break;
		case "analysis":
		$(".nav-analysis").addClass("active");
		$("#page_analysis").show();	
		break;
		case "history":
		$(".nav-history").addClass("active");
		$("#page_history").show();
		break;
		case "settings":
		$(".nav-settings").addClass("active");
		$("#page_settings").show();
		break;
	}
	
	
	ChartM.resize();
	
};



