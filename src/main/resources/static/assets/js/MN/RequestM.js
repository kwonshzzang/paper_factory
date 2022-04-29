/******************************
 *
 * REQUEST MANAGER
 *
 *******************************/
var RM = {
	url : "http://localhost:9111/",
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
	
	$.ajax({
		type : "POST",
		dataType : this.datatype,
		contentType : this.contentType,
		url : data.path,
		data : JSON.stringify(data.param),
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
		url : data.path,
		success : function(json){
			
			console.log(json);
			
			if(func){
				func(json);
			}
				
		}
	});
};


/******************************
 *
 * DASHBOARD PAGE
 *
 *******************************/
RM.GET_DASHBOARD = function(data, func){
	
	$.ajax({
		type : "GET",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.url + data.path,
		success : function(json){
						
			if(func){
				func(json);
			}
				
		}
	});
};

RM.POST_DASHBOARD = function(data, func){
		
	$.ajax({
		type : "POST",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.url + data.path,
		data : JSON.stringify(data.param),
		success : function(json){
			
			if(func){
				func(json);
			}
				
		}
	});
};


/******************************
 *
 * ANALYSIS PAGE
 *
 *******************************/
RM.GET_ANALYSIS = function(data, func){
	
	$.ajax({
		type : "GET",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.url + data.path,
		success : function(json){
						
			if(func){
				func(json);
			}
				
		}
	});
};

RM.POST_ANALYSIS = function(data, func){
		
	$.ajax({
		type : "POST",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.url + data.path,
		data : JSON.stringify(data.param),
		success : function(json){
			
			if(func){
				func(json);
			}
				
		}
	});
};


/******************************
 *
 * PLAN RESTAPI
 *
 *******************************/
RM.GET_PLAN = function(data, func){
	
	$.ajax({
		type : "GET",
		dataType : this.datatype,
		contentType : this.contentType,
		url : "/plan" + data.path,
		success : function(json){
						
			if(func){
				func(json);
			}
				
		}
	});
};

RM.POST_PLAN = function(data, func){
		
	$.ajax({
		type : "POST",
		dataType : this.datatype,
		contentType : this.contentType,
		url : "/plan" + data.path,
		data : JSON.stringify(data.param),
		success : function(json){
			
			if(func){
				func(json);
			}
				
		}
	});
};

RM.PUT_PLAN = function(data, func){
		
	$.ajax({
		type : "PUT",
		dataType : this.datatype,
		contentType : this.contentType,
		url : "/plan" + data.path,
		data : JSON.stringify(data.param),
		success : function(json){
			
			if(func){
				func(json);
			}
				
		}
	});
};

RM.DELETE_PLAN = function(data, func){
		
	$.ajax({
		type : "DELETE",
		dataType : this.datatype,
		contentType : this.contentType,
		url : "/plan" + data.path,
		success : function(json){
			
			if(func){
				func(json);
			}
				
		}
	});
};



/******************************
 *
 * ENERGY RESTAPI
 *
 *******************************/
RM.GET_ENERGY = function(data, func){
	
	$.ajax({
		type : "GET",
		dataType : this.datatype,
		contentType : this.contentType,
		url : "/energy" + data.path,
		success : function(json){
						
			if(func){
				func(json);
			}
				
		}
	});
};

RM.GET_TAGS = function(data, func){
	
	$.ajax({
		type : "GET",
		dataType : this.datatype,
		contentType : this.contentType,
		url : "/tags" + data.path,
		success : function(json){
						
			if(func){
				func(json);
			}
				
		}
	});
};


/******************************
 *
 * SETTINGS PAGE
 *
 *******************************/
RM.GET_SETTINGS = function(data, func){
	
	$.ajax({
		type : "GET",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.url + data.path,
		success : function(json){
						
			if(func){
				func(json);
			}
				
		}
	});
};

RM.POST_SETTINGS = function(data, func){
		
	$.ajax({
		type : "POST",
		dataType : this.datatype,
		contentType : this.contentType,
		url : this.url + data.path,
		data : JSON.stringify(data.param),
		success : function(json){
			
			if(func){
				func(json);
			}
				
		}
	});
};

