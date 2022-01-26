
/******************************
 *
 * Util MANAGER
 *
 *******************************/
var UtilM = {
	
};

UtilM.GET_CACHE_NOW = function(){
	return moment().valueOf();
};

UtilM.SAVE_STORAGE = function(key, json){
	if(window.localStorage){
		localStorage.setItem(key, JSON.stringify(json));	
	}
};

UtilM.LOAD_STORAGE = function(key){
	var item = null;
	
	if(window.localStorage){
		var result = localStorage.getItem(key);	
		
		item = JSON.parse(result);
	}
	
	return item;
};


UtilM.CREATE_INIT_DATA = function(max, val = 0){
	var list = [];
	
	for(var i = max; i > 0; i--){
		var now = moment().subtract(i, 'seconds').format("YYYY-MM-DD HH:mm:ss");
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

UtilM.GET_NOWTIME = function(){
	return moment().format("YYYY-MM-DD HH:mm:ss");
};

UtilM.GET_RANDOM = function(max){
	var rand = Math.round(Math.random() * max);
	
	return rand;
};

UtilM.GET_RANDOM_PERCENT = function(total){
	var temp = total - 10;
	
	if(temp > 40){
		temp = 40;
	}
	
	var rand = UtilM.GET_RANDOM(temp);
	var result = rand;
	
	return result;
};


UtilM.GET_RANDOM_STR = function(length) {
	
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    return result;
};

UtilM.GET_RANDOM_PERIOD = function(min, max){
	var rand = Math.round(Math.random() * (max - min + 1) + min);
	
	return rand;
};

UtilM.GET_URL_PARAM = function(){
	var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });

    return params;
};

UtilM.IS_CHECKED = function(ele){
	return $(ele).is(":checked");
};


UtilM.SET_NUMBER_COMMA = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

UtilM.SORT = function(list, asc){
	if(asc == "asc"){
		list.sort(function(a, b) { // 내림차순
		    return a - b		    
		});
	}else{
		list.sort(function(a, b) { // 오름차순
		    return b - a;
		});
	}
};

UtilM.SORT_FIELD = function(list, field, asc){
	if(asc == "asc"){
		list.sort(function(a, b) { // 내림차순
		    return a[field] > b[field] ? -1 : 1;		    
		});
	}else{
		list.sort(function(a, b) { // 오름차순
		    return a[field] < b[field] ? -1 : 1;	
		});
	}
};


UtilM.GET_JSON_KEY = function(json){
	var list = [];
	
	for(key in json){
		list.push(key);
	}
	
	return list;
};

UtilM.CHECK_IN_KEY = function(json, key){
	var list = UtilM.GET_JSON_KEY(json);
	var result = false;
	
	$.each(list, function(i, item){
		if(item == key){
			result = true;
			return false;
		}
	});
	
	return result;
};

UtilM.IS_NULL = function(val){
	if(val && val.length > 0)
		return false;
				
	return true;
};

UtilM.IS_ARRAY = function(val){
	if(Array.isArray(val))
		return true;
				
	return false;
};

/******************************
 *
 * HTML ELEMENT MANAGER
 *
 *******************************/


/* 
//////////////////////////////////////
해당 값이 select의 option 리스트에 없을 때 추가
/////////////////////////////////////
*/
UtilM.CHECK_SELECT_OPTION = function(select, option, ele){
	var exist = false;
	
	select.find("option").each(function(){
		if(this.value == option){
			exist = true;
			return false;
		}
	});
	
	if(!exist){
		select.append(ele);
	}
	
};

UtilM.GET_DATALIST = function(elelist, name, list){
	
	$.each(elelist, function(i, ele){
		var data = $(ele).data(name);
		
		list.push(data);
	});
	
	return list;
};
