
var ModalM = {
	
};


ModalM.SHOW_ALERT = function(title, msg){
	if(!title){
		title = "선택";
	}
	
	$("#modal_alert_title").text(title);
	$("#modal_alert_msg").html(msg);
	
	$("#modal_alert").modal("show");
};


ModalM.SHOW_CONFIRM = function(title, msg, func){
	
	if(!title){
		title = "선택";
	}
	
	$("#modal_confirm_title").text(title);
	$("#modal_confirm_msg").html(msg);
	
	$("#btn_modal_confirm_ok").off("click").on("click", function(){
		if(func){
			func();
		}
	});
	
	$("#modal_confirm").modal("show");
};

ModalM.SHOW_LOADING = function(mode, txt = null){
	var msg = "3D 모델 로딩중";
	
	if(txt){
		msg = txt;
	}
	
	$("#txt_md_loading_msg").text(msg);	
	
	switch(mode){
		case "show":
		$("#btn_loading_stop").off("click").on("click", function(){			
			ModalM.SHOW_LOADING("hide");
		});		
		
		$("#modal_loading_data").modal("show");
		break;
		case "hide":
		$("#modal_loading_data").modal("hide");
		break;
		case "change":		
		$("#txt_md_loading_msg").text("데이터 검색 중");	
		break;
	}
	
};


ModalM.SHOW_SETTING = function(){		
	
	$("#modal_server_setting").modal("show");
};
