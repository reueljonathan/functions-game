function Level(params){
	var unitSize = params.unitSize || 20,
		numUnitsX,
		numUnitsY,
		center = params.center,
		ball = new Ball(params.ballPos.x, params.ballPos.y),
		goal = new Goal(params.goalPos.x, params.goalPos.y),
		segments=[],
		obstacles=[],
		tutorialIndex = 0,
		tipIndex= 0,
		tipTime, 
		tutorialCounter=0,
		tipCounter=0,
		lastCall = 0,
		tutorial = params.tutorial,
		tips = params.tips,
		numTries = 0,
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

		showingTutorial	 = false,
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
		var hideTutorial = this.hideTutorial;
		goal.setPassedCallback(function(){
			gameCallback();
			hideTutorial();
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

		if(showingTutorial){
			tutorialCounter += t-previousTime;
			if(tutorialCounter > tutorial[tutorialIndex][1] && showingTutorial){
				if(tutorialIndex+1 < tutorial.length){
					tutorialCounter = 0;
					tutorialIndex++;
					levelTip.innerHTML = tutorial[tutorialIndex][0];

				}else{
					container.removeChild(levelTip);
					showingTutorial = false;
					this.enableFunctionInput();
				}
			}
		}

		if(showingTips){
			console.log(2);
			tipCounter += t-previousTime;

			if(tipCounter > tips[tipIndex][1] && showingTips){
				if(tipIndex+1 < tips.length)
					tipIndex = 0;

				container.removeChild(levelTip);
				showingTips = false;
			}
		}

		previousTime = t;
	}

	this.enableFunctionInput= function(){
		functionInput.removeAttribute('disabled');
	}

	this.showTutorial = function(){
		if( params.tutorial.length > 0){
			tutorialCounter = 0;
			showingTutorial = true;
			levelTip.innerHTML = tutorial[tutorialIndex][0];
			container.appendChild(levelTip);

		}else{
			showingTutorial = false;
			this.enableFunctionInput();
		}

		if( levelHeader.parentNode === container){
			container.removeChild(levelHeader);
		}
	}

	this.hideTutorial = function(){
		showingTutorial = false;
	}

	this.showTips = function(){
		if(params.tips.length > 0){
			showingTips = true;
			tipCounter = 0;
			levelTip.innerHTML = tips[tipIndex][0];
			container.appendChild(levelTip);
		}else{
			showingTips = false;
		}
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

		for(var i = 0, f, interval; i<functions.length && !!functions[i].length; i++){
			f = functions[i].trim().split(' ');

			interval = f[0].match(/-?\d+/g);

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

	this.isInputValid = function(input){
		if(!input.match(/\[-?\d+,-?\d+]\s.+/))
			return false;

		return true;
	}

	this.setInput = function(input){
		if(this.isInputValid(input)){
			if(!!ball){
				ball.reset();
				ball.setMoving(true);
			}
			else
				ball = new Ball(level.ballPos.x,level.ballPos.y);

			for(var i = 0; i<obstacles.length; i++)
				obstacles[i].setTarget(ball);

			numTries++;

			if(numTries > (params.triesBeforeTip || 1)){
				numTries = 0;
				this.showTips();
			}

			this.calcCurve(input);
			this.preDrawCurve();
		}
	}
}