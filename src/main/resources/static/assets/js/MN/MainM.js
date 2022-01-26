/******************************
 *
 * MAIN MANAGER
 *
 *******************************/

var MainM = {
	
};


MainM.INIT = function(){
	
	MainM.INIT_PAGE();
	MainM.INIT_EVENT();
	MainM.CHAGE_PAGE("dashboard");
	
};

MainM.INIT_PAGE = function(){	
	
	var d = new Date();
	var dashboard = "/pages/dashboard.html?v=" + d.getTime(); 
	var analysis = "/pages/analysis.html?v=" + d.getTime(); 
	var settings = "/pages/settings.html?v=" + d.getTime(); 
	
	MainM.LOAD_PAGE($("#page_dashboard"), dashboard);
	MainM.LOAD_PAGE($("#page_analysis"), analysis);
	MainM.LOAD_PAGE($("#page_settings"), settings);
};

MainM.LOAD_PAGE = function(area, page){
	area.load(page, function(data, status, xhr){
		
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
		
		MainM.CHAGE_PAGE(type);
	});
	
};

MainM.CHAGE_PAGE = function(type){		
	$(".nav-item").removeClass("active");
	$(".page").hide();
	
	switch(type){
		case "dashboard":
		$(".nav-dashboard").addClass("active");
		$("#page_dashboard").show();
		break;
		case "analysis":
		$(".nav-analysis").addClass("active");
		$("#page_analysis").show();		
		break;
		case "settings":
		$(".nav-settings").addClass("active");
		$("#page_settings").show();
		break;
	}
	
	
	ChartM.resize();
	
};



