/******************************
 *
 * REQUEST MANAGER
 *
 *******************************/
var RM = {
	url : "localhost:8080",
	path : "/api/",
	datatype : "json",
	contentType : "application/json"
};


RM.PARAM = function(action, data){
	var param = {
		action : action,
		data : data
	};
	
	return param;	
};

RM.POST = function(data, func){
	
	var param = data;
	
	$.ajax({
		type : "POST",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.path + "",
		data : JSON.stringify(param),
		success : function(json){
			
			console.log(json);
			
			if(func){
				func(json);
			}
				
		}
	});
};

RM.GET = function(data, func){
	
	$.ajax({
		type : "GET",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.path + "",
		success : function(json){
			
			console.log(json);
			
			if(func){
				func(json);
			}
				
		}
	});
};
