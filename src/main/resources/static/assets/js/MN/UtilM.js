
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

UtilM.NUMBER_2_POINT = function(val){
	var result = Math.round(val * 100) / 100;
	
	return result;
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

UtilM.DOWNLOAD_CSV = function(header, list, filename = ""){
	
	setTimeout(function(){
				
    	filename = filename ? filename + '.csv' : 'export.csv';
		 
		var csv = header + "\r\n";		
		
		$.each(list, function(i, item){
			var date = item.regdate;
			var min = item.minval;
			var max = item.maxval;
			var avg = item.avgval;
			
			date = moment(date).format("YYYY-MM-DD");
			
			csv += date + "," + min + "," + max + "," + avg + "\r\n";
		});

	    var blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
	    if (navigator.msSaveBlob) { // IE 10+
	        navigator.msSaveBlob(blob, filename);
	    } else {
	        var link = document.createElement("a");
	        if (link.download !== undefined) { // feature detection
	            // Browsers that support HTML5 download attribute
	            var url = URL.createObjectURL(blob);
	            link.setAttribute("href", url);
	            link.setAttribute("download", filename);
	            link.style.visibility = 'hidden';
	            document.body.appendChild(link);
	            link.click();
	            document.body.removeChild(link);
	        }
	    }
	    
	}, 200);
	
};

UtilM.DOWNLOAD_EXCEL = function(header, list, filename = ""){

    var downloadLink;
    var tableHTML = UtilM.ConvertTable(header, list);
                
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
		var excelFile = "<html xml:lang='ko' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
        
		excelFile += "<head>";
        excelFile += '<meta http-equiv="Content-type" content="text/html;charset=utf-8" />';
        excelFile += "<!--[if gte mso 9]>";
        excelFile += "<xml>";
        excelFile += "<x:ExcelWorkbook>";
        excelFile += "<x:ExcelWorksheets>";
        excelFile += "<x:ExcelWorksheet>";
        excelFile += "<x:Name>";
        excelFile += "{worksheet}";
        excelFile += "</x:Name>";
        excelFile += "<x:WorksheetOptions>";
        excelFile += "<x:DisplayGridlines/>";
        excelFile += "</x:WorksheetOptions>";
        excelFile += "</x:ExcelWorksheet>";
        excelFile += "</x:ExcelWorksheets>";
        excelFile += "</x:ExcelWorkbook>";
        excelFile += "</xml>";
        excelFile += "<![endif]-->";
        excelFile += "</head>";
        excelFile += "<body>";
        excelFile += tableHTML.replace(/"/g, '\'');
        excelFile += "</body>";
        excelFile += "</html>";

        var uri = "data:application/vnd.ms-excel;base64,";
        var ctx = { worksheet: filename, table: tableHTML };

        // Create a link to the file
        downloadLink.href = uri + UtilM.base64(UtilM.format(excelFile, ctx));
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
};

UtilM.ConvertTable = function(header, list){
	var result = "";
	var div = $("<div/>");
	var table = $("<table/>");
	var tb_header = $("<thead/>");
	var tb_body = $("<tbody/>");
	
	var hr_header = $("<tr/>");
	
	var lst_header = header.split(",");
	
	$.each(lst_header, function(i, item){
		hr_header.append(UtilM.CREATE_HEADER(item));
	});
	
	tb_header.append(hr_header);
	
	$.each(list, function(i, item){
		tb_body.append(UtilM.CREATE_BODY_ITEM(item));
	});
	
	table.append(tb_header);
	table.append(tb_body);
	
	div.append(table);
	
	result = div.html();

    return result;
};

UtilM.CREATE_HEADER = function(item){
	var th = $("<th>" + item + "</th>");
	
	return th;
};

UtilM.CREATE_BODY_ITEM = function(item){
	var tr = $("<tr/>");
	var td_date = $("<td>" + item.regdate + "</td>");
	var td_min = $("<td>" + item.minval + "</td>");
	var td_max = $("<td>" + item.maxval + "</td>");
	var td_avg = $("<td>" + item.avgval + "</td>");
	
	tr.append(td_date);
	tr.append(td_min);
	tr.append(td_max);
	tr.append(td_avg);
	
	return tr;
};

UtilM.base64 = function(s){
	return window.btoa(unescape(encodeURIComponent(s)));
};

UtilM.format = function(s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; });
};

