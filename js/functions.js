game = (function(){
	var body = document.body,
		canvas = DOM.create('canvas'),
		preDrawCanvas = DOM.create('canvas'),
		container  = DOM.get('#canvas-container'),
		ctx = canvas.getContext('2d'),
		width = 800,
		height = 480,
		funcInput = DOM.get('#function-input'),		
		previousTime=0,		
		pause = false,
		actualLevel = 0,
		level,

		tipIndex = 0,
		tipTime, tipCounter,
		showingTips;

	var lastCall, fps, delta;

	var levelHeader = DOM.create('div'),
		levelNumber = DOM.create('h1'),
		levelDescription = DOM.create('h3'),

		levelTip = DOM.create('div');

	function update(t){
		

		t = Math.round(t || 0);		

		previousTime = t;		

		if(!lastCall)
			lastCall = t;
			
		delta = (t - lastCall)/1000;
		
		fps = 1/delta;

		if(!!level){
			level.update(t);
		}

		lastCall = t;
	}	

	function draw(){
		ctx.clearRect(0,0,width,height);
		
		if(!!level)
			level.draw();
		
		
		ctx.fillStyle='#fff';
		ctx.fillText('fps: ' + Math.round(fps), width - 35, 15);
	}

	function setup(){
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		preDrawCanvas.setAttribute('width', width);
		preDrawCanvas.setAttribute('height', height);
		container.appendChild(canvas);

	

		funcInput.addEventListener('keydown', function(e){
			if(e.keyCode === 13 && funcInput.value
				&& funcInput.value.match(/\[-?\d+,\d+]\s.+/)){

				e.preventDefault();

				if(!!level) level.setInput(funcInput.value);
			}
		});

		DOM.get('#btn-play')
		.addEventListener('click', function(e){
			DOM.get('#game-header').
				style.top = 0;

			DOM.get('#game-title')
				.classList.add('header');
			e.target.style.display = 'none';

			transitionIn();
		});
	}

	function loop(t){
		if(!pause){
			update(t);
			draw();
		}
		window.requestAnimationFrame(loop);
	}

	function loadLevel(e){
		if(actualLevel < LEVELS.length){
			level = new Level(LEVELS[actualLevel++]);

			level.setContainer(container);
			level.setDimensions(width, height);
			level.setPreDrawCanvas(preDrawCanvas);
			level.setCanvas(canvas);

			level.setPassedCallback(transitionIn);
			level.setLevelDescription(levelDescription);
			level.setLevelNumber(levelNumber);
			level.setLevelHeader(levelHeader);
	
			levelHeader.classList.add('level-info');
			levelHeader.appendChild(levelNumber);
			levelHeader.appendChild(levelDescription);
	
			levelHeader.addEventListener('animationend', function(e){
				console.log(1);
				
				level.showTips();
			});

			levelTip.classList.add('level-tip');
			level.setLevelTip(levelTip);

			level.setFunctionInput(funcInput);
	
			// container.appendChild(levelHeader);
			// container.appendChild(levelTip);


			level.preDrawCurve();
			transitionOut();
		}else{
			alert('Wow! You\'re the master of functions! =)');
		}
	}

	function transitionIn(){
		var div = DOM.get('#level-transition');
		div.style.left = 0;

		div.addEventListener('transitionend',loadLevel);		
	}

	function transitionOut(){
		var div = DOM.get('#level-transition');

		div.removeEventListener('transitionend', loadLevel);

		div.style.left = 'calc(100%)';
	}

	return {
		start: function(){
			setup();
			// drawGuides();
			// drawAxis();
			loop();
		},

		setPause: function(){
			pause = !pause;
		},

		transitionIn: transitionIn,
		transitionOut: transitionOut
	}
})();

game.start();
