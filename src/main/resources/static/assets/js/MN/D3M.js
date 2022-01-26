var D3M = {
	model_cam : null,
	model_video : null,
	frameid : -1,
	anim : {
		bubbleArray : [],
		started : false
	}
};

D3M.drawBody = function(){
	console.log("draw");
	return;
	var container = d3.select("#canvas_user_body");
	var svg = container.append("svg")
				.attr("width", 300)
				.attr("height", 400);
				
	svg.on("click", circleDrawing);
	
	
	function circleDrawing(event){
		console.log("call");
		
		var mouseXY = d3.pointer(event);
		
		var circle = svg.append("circle")
               .attr("cx",mouseXY[0]) //시작위치
               .attr("cy",mouseXY[1])
				//.attr("class", "blink")
               .attr("r",20)    
               .attr("fill","#03a9f47a")
	};
};

D3M.createCircle = function(c, x, y, radius, colorFill){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.minRadius = radius;
	
	this.draw = function() {
	  c.beginPath();
	  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	  c.fillStyle = colorFill;
	  c.fill();
	};
	
	this.update = function() {
	  
	
	  this.draw();
	};
	
	this.draw();
};

D3M.START_MEDIC_ANI = function(){
	if(!D3M.anim.started){
		return;
	}
	
	requestAnimationFrame(D3M.START_MEDIC_ANI);
	
	for(var i = 0; i < D3M.anim.bubbleArray.length; i++){
		D3M.anim.bubbleArray[i].update();
	}
};

D3M.drawPointLine = function(context){
	var list = [];
	
	list.push({
		type : "head", //머리
		x : 150,
		y : 34,
		title : "Headbands"
	});
	
	list.push({
		type : "neck",//목
		x : 150,
		y : 120,
		title : "Sociometric badges"
	});
	
	list.push({
		type : "heart",//심장
		x : 170,
		y : 180,
		title : "Camera clips"
	});
	
	list.push({
		type : "wrist",//손목
		x : 250,
		y : 318,
		title : "Smartwatches"
	});
	
	list.push({
		type : "ankle",//발목
		x : 200,
		y : 597,
		title : "Sensors embedded in clothing"
	});
	
	$.each(list, function(i, item){
		var start = [];
		var middle = [];
		var end = [];
		
		start.push(item.y);
		start.push(item.x);
		
		if(item.type == "heart" ||
		item.type == "wrist"){
			middle.push(item.y + 80);
			middle.push(item.x + 50);
			
			end.push(item.y + 80);
			end.push(620);
			
		}else{
			
			middle.push(item.y + 50);
			middle.push(item.x + 50);
			
			end.push(item.y + 50);
			end.push(620);
		}
		
		
		drawPoint(context, item.y, item.x, 6, "#2196f3");
		
		drawSegment(start, middle, "#2196f3", 1, context);
		drawSegment(middle, end, "#2196f3", 1, context);
		
		drawText(item.title, end[1] - (item.title.length * 10), middle[0] - 20, context);
		
		console.log(item.title.length);
	});
	
};

D3M.loadModel = function(){
	posenet.load({
					inputResolution: { width: 675, height: 485 }
				})
	.then(function(model) {
    	D3M.model_cam = model;

		D3M.drawSkeletonCam();
    });

	posenet.load({
					inputResolution: { width: 686, height: 386 }
				})
	.then(function(model) {
    	D3M.model_video = model;

		D3M.drawSkeletonPlayer();
    });
};

D3M.drawSkeletonCam = function(){
	
	if(D3M.model_cam){
		var video_cam = document.getElementById("video_user_cam");
		var canvas_cam = document.getElementById("canvas_user_cam");
		var ctx_cam = canvas_cam.getContext("2d");		
				
		D3M.model_cam.estimateSinglePose(video_cam).then(function(pose){	
			try{
				ctx_cam.clearRect(0, 0, video_cam.width, video_cam.height);	
				
				
				canvas_cam.width = video_cam.width;
		    	canvas_cam.height = video_cam.height;			
	
				drawKeypoints(pose.keypoints, 0.6, ctx_cam, "#2196f3");
				drawSkeleton(pose.keypoints, 0.6, ctx_cam, "#2196f3");	   
				
				//console.log("측정 데이터 : " + moment().format("HH:mm:ss.SSS"));
				
				
				if(pose && pose.score){
					ChartM.SET_DATA(pose.score, true);
				}
			}catch{
				
			}
	  	});

		D3M.frameid = requestAnimationFrame(D3M.drawSkeletonCam);
	}
	
};


D3M.drawSkeletonPlayer = function(){
	
	if(D3M.model_video){
		var video_player = document.getElementById("video_user_content");
		var canvas_player = document.getElementById("canvas_user_video");
		var ctx_player = canvas_player.getContext("2d");
				
		D3M.model_video.estimateSinglePose(video_player).then(function(pose){				

			try{
				ctx_player.clearRect(0, 0, canvas_player.width, canvas_player.height);			
				
				canvas_player.width = video_player.width;
		    	canvas_player.height = video_player.height;
	
				drawKeypoints(pose.keypoints, 0.6, ctx_player, "#5ab55e");
				drawSkeleton(pose.keypoints, 0.6, ctx_player, "#5ab55e");	 
				
				if(pose && pose.score){
					ChartM.SET_DATA(pose.score, false);
				}     
			}catch{
				
			}
	  	});


		D3M.frameid = requestAnimationFrame(D3M.drawSkeletonPlayer);
	}
	
};





D3M.pieDetect = function(element, size, goal, color, item = 0) {

	var dataset, d3Container, container, svg, field,
    padding = 2,
    strokeWidth = 20,
    width = size,
    height = size,
    T = 2 * Math.PI;

	var val = item;
		
	dataset = function () {
        return [
            {
            	percentage: val
            }
        ];
    };
    
    // Construct chart layout
    // ------------------------------

    // Foreground arc
    var arc = d3.arc()
        .startAngle(0)
        .endAngle(function (d) {
            return d.percentage / goal * T;
        })
        .innerRadius((size / 2) - strokeWidth)
        .outerRadius((size / 2) - padding)
        .cornerRadius(20);

    // Background arc
    var background = d3.arc()
        .startAngle(0)
        .endAngle(T)
        .innerRadius((size / 2) - strokeWidth)
        .outerRadius((size / 2) - padding);
    
    if($("#" + element).find("svg").length){
    	svg = d3.select("#" + element).select("#svg_group");
    	field = d3.select("#" + element + "_group");
    	    	
        d3.transition().duration(1000).each(update);
    }else{
    	// Main variables
        d3Container = d3.select("#" + element);


        // Create chart
        // ------------------------------

        // Add svg element
        container = d3Container.append("svg");
        
        // Add SVG group
        svg = container
            .attr("width", 300)
            .attr("height", 300)
            .append("g")
            .attr("id", "svg_group")
                .attr("transform", "translate(" +  150 + "," +  150 + ")");


        

        // Append chart elements
        // ------------------------------

        //
        // Group arc elements
        //

        // Group
        field = svg.selectAll("g")
            .data(dataset)
            .enter().append("g").attr("id", element + "_group");

        // Foreground arc
        field
            .append("path")
            .attr("class", "arc-foreground")
            .attr('fill', color);

        // Background arc
        field
            .append("path")
            .attr("d", background)
            .style("fill", color)
            .style("opacity", 0.2);



        field
        .append("text")
        .attr('class', 'arc-detect-text')
        .text("통과 : " + val + "/100 건")
        .attr("transform", "translate(0,40)")
        .css({
            'font-size': 12,
            'fill': '#999',
            'font-weight': 500,
            'text-transform': 'uppercase',
            'text-anchor': 'middle'
        });


        field
        .append("text")
        .text("CIS 평가 점수")
        .attr("transform", "translate(0,-30)")
        .css({
            'font-size': 14,
            'fill': '#4CAF50',
            'font-weight': 500,
            'text-transform': 'uppercase',
            'text-anchor': 'middle'
        });

        // Count
        field
            .append("text")
            .attr('class', 'arc-goal-completed')
            .attr("transform", "translate(0,10)")
            .css({
                'font-size': 23,
                'font-weight': 500,
                'text-anchor': 'middle',
				'fill' : color
            });

        d3.transition().duration(2500).each(update);
    }

    // Animation
    function update() {
        field = field
            .each(function (d) {
                this._value = d.percentage;
            })
            .data(dataset)
            .each(function (d) {
                d.previousValue = this._value;
            });
        
        // Foreground arc
        
        field
            .select("path.arc-foreground")
            .transition()
            .duration(600)
            .attrTween("d", arcTween);
           
            
        // Animate count text
        svg.select('.arc-goal-completed')
            .transition()
            .duration(600)
            .tween("text", function(d) {
                var i = d3.interpolate(this.textContent, d.percentage);
                return function(t) {
                    this.textContent = val + " 점";
                };
            });


        svg.select('.arc-detect-text')
            .transition()
            .duration(600)
            .tween("text", function(d) {
                var i = d3.interpolate(this.textContent, d.percentage);
                return function(t) {
                    this.textContent = "통과항목 : " + val + "/100 건";
                };
            });

    }

    // Arc animation
    function arcTween(d) {
        var i = d3.interpolateNumber(d.previousValue, d.percentage);
        return function (t) {
            d.percentage = i(t);
            return arc(d);
        };
    }
};
