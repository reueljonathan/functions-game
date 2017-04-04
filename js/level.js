function Level(params){
	var unitSize = params.unitSize || 20,
		numUnitsX,
		numUnitsY,
		center = params.center,
		ball = new Ball(params.ballPos.x, params.ballPos.y),
		goal = new Goal(params.goalPos.x, params.goalPos.y),
		segments=[],
		obstacles=[],
		tipIndex = 0,
		tipTime, 
		tipCounter=0,
		lastCall = 0,
		tips = params.tips,
		container,

		levelHeader,
		levelNumber,
		levelDescription,

		levelTip,

		functionInput,

		canvas,
		preDrawCanvas,

		ctx,
		preDrawCtx,

		width,
		height,

		previousTime = 0,

		showingTips = false,

		lowestX,
		greatestX,

		lowestY,
		greatestY;

	goal.setTarget(ball);

	for(var i=0; !!params.obstacles && i<params.obstacles.length; i++){
		obstacles.push(new Obstacle(params.obstacles[i]));
	}

	this.setFunctionInput = function(input){
		functionInput = input;
		input.setAttribute('disabled', true);
	}

	this.setCanvas = function(c){
		canvas = c;

		ctx = c.getContext('2d');
	}

	this.setPreDrawCanvas = function(c){
		preDrawCanvas = c;
		preDrawCtx = c.getContext('2d');
	}

	this.setDimensions = function(w, h){
		width = w;
		height = h;
		numUnitsX = Math.round(width/unitSize);
		numUnitsY = Math.round(height/unitSize);

		lowestX = (center.x/unitSize)*-1;
		greatestX = (width-center.x)/unitSize;

		lowestY = ((height-center.y)/unitSize)*-1;
		greatestY = center.y/unitSize;

		ball.setBounds(w,h);
	}

	this.drawAxis = function(){
		preDrawCtx.setLineDash([0]);
		
		graphics.drawLine(preDrawCtx,
			{x:0,y:center.y}, {x:width,y:center.y},
			'#fff', 2);
		graphics.drawLine(preDrawCtx,
			{x:center.x,y:0}, {x:center.x,y:height},
			'#fff', 2);
	}

	this.drawNumbers = function(){
		preDrawCtx.fillStyle = "#fff";
		preDrawCtx.textAlign = "center";
		preDrawCtx.font = "bold 15px Architects Daughter";

		for(var x = 5; x<greatestX; x+=5)
			preDrawCtx.fillText(x, center.x + x*unitSize, center.y + 15);

		for(var x = -5; x>lowestX; x-=5)
			preDrawCtx.fillText(x, center.x + x*unitSize, center.y + 15);


		for(var y=5; y<greatestY; y+=5)
			preDrawCtx.fillText(y, center.x - 10 , center.y - y*unitSize + 5);

		for(var y=-5; y>lowestY; y-=5)
			preDrawCtx.fillText(y, center.x-10, center.y - y*unitSize + 5);
	}

	this.drawGuides = function(){
		preDrawCtx.beginPath();
		preDrawCtx.strokeStyle = '#241158';
		preDrawCtx.setLineDash([0]);
		preDrawCtx.lineWidth = 1;


		for(var x = 0; x<numUnitsX; x++){	
			preDrawCtx.moveTo(x*unitSize, 0);
			preDrawCtx.lineTo(x*unitSize, height);			
		}

		for(var y = 0; y<numUnitsY; y++){
			preDrawCtx.moveTo(0, y*unitSize);
			preDrawCtx.lineTo(width, y*unitSize);
		}

		preDrawCtx.stroke();
	}

	this.setPassedCallback = function(gameCallback){
		var hideTips = this.hideTips;
		goal.setPassedCallback(function(){
			console.log(2);
			gameCallback();
			hideTips();
		});
	}

	this.update = function(t){
		if(!previousTime)
			previousTime = t;

		if(!!ball)
			ball.update(t - previousTime);

		if(!!goal)
			goal.update(t-previousTime);

		for(var i = 0; i<segments.length; i++){
			segments[i].update();
		}

		for(var i =0; i<obstacles.length; i++){
			obstacles[i].update(t);
		}

		if(showingTips){
			tipCounter += t-previousTime;
			if(tipCounter > tips[tipIndex][1] && showingTips){
				if(tipIndex+1 < tips.length){
					tipCounter = 0;
					tipIndex++;
					levelTip.innerHTML = tips[tipIndex][0];

				}else{
					console.log(2);				
					container.removeChild(levelTip);
					showingTips = false;
					this.enableFunctionInput();
				}
			}
		}
		previousTime = t;
	}

	this.enableFunctionInput= function(){
		console.log(4);
		functionInput.removeAttribute('disabled');
	}

	this.showTips = function(){
		console.log(7);
		if( params.tips.length > 0){
			tipCounter = 0;
			showingTips = true;
			levelTip.innerHTML = tips[tipIndex][0];
			container.appendChild(levelTip);


		}else{
			console.log(6);
			showingTips = false;
			this.enableFunctionInput();
		}

		if( levelHeader.parentNode === container){
			console.log(3);
			container.removeChild(levelHeader);
		}
	}

	this.hideTips = function(){
		console.log(5);
		showingTips = false;
	}

	this.setContainer = function(c){
		container =c;
	}

	this.calcCurve = function(input){
		var functions;
		segments = [];

		for(var i =0;i<segments.length; i++){
			segments[i].setTarget(ball);
		}		

		functions = input.split(';');

		for(var i = 0, f, interval; i<functions.length; i++){
			f = functions[i].split(' ');

			console.log('f', f);
			interval = f[0].match(/-?\d+/g);
			console.log('interval', interval);

			var lower = parseInt(interval[0]) > lowestX ? parseInt(interval[0]) : lowestX,
				greater = parseInt(interval[1]) < greatestX ? parseInt(interval[1]) : greatestX;
				funcString = f[1];



			for(; lower < greater; lower+=0.5){
				var x1 = center.x + lower*unitSize,
					y1 = center.y - eval(funcString.replace(/x/g, lower).replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos'))*unitSize,
					x2 = center.x + (lower+0.5)*unitSize,
					y2 = center.y - eval(funcString.replace(/x/g, (lower+0.5)).replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos'))*unitSize,
					s = new Segment(x1, y1, x2, y2);

				s.setTarget(ball);
				segments.push(s);
			}			
		}
	}

	this.preDrawCurve = function(){
		preDrawCtx.clearRect(0,0,width,height);
		ctx.clearRect(0,0,width, height);
		if( !!numUnitsY && !!numUnitsX){
			this.drawGuides();
			this.drawAxis();
			this.drawNumbers();
		}

		for(var i = 0; i<segments.length; i++){
			segments[i].draw(preDrawCtx);
		}

		for(var i = 0; i<obstacles.length; i++){
			obstacles[i].draw(preDrawCtx);
		}


		ctx.drawImage(preDrawCanvas,0,0);
	}

	this.draw = function(){
		ctx.drawImage(preDrawCanvas,0,0);

		if(!!ball)
			ball.draw(ctx);

		if(!!goal)
			goal.draw(ctx);
	}

	this.setLevelHeader = function(el){
		levelHeader = el;
		container.appendChild(levelHeader);
	}

	this.setLevelNumber = function(el){
		levelNumber = el;
		levelNumber.innerHTML = 'Level ' + params.number;
	}

	this.setLevelDescription = function(el){
		levelDescription = el;
		levelDescription.innerHTML = params.name;
	}

	this.setLevelTip = function(el){
		levelTip = el;
	}

	this.setInput = function(input){
		

		if(!!ball){
			ball.reset();
			ball.setMoving(true);
		}
		else
			ball = new Ball(level.ballPos.x,level.ballPos.y);

		for(var i = 0; i<obstacles.length; i++)
			obstacles[i].setTarget(ball);

		this.calcCurve(input);
		this.preDrawCurve();
	}
}