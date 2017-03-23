function Goal(x, y){
	var pos = { x: x, y: y},
		drawRadius = 5,
		radius = 10,
		growingDirection = 1,
		target,
		targetPos,
		passedCallback,
		sumRadius,
		sumCatheti,
		preDrawCanvas,
		passed = false;

	this.update = function(t){
		if(!passed){
			if(drawRadius > 15 || drawRadius == 0)
				growingDirection*=-1;

			drawRadius += 0.5*growingDirection;


			targetPos = target.getPosition();

			sumRadius = radius+target.getRadius();
			sumCatheti = 
				(pos.x-targetPos.x)*(pos.x-targetPos.x) + 
				(pos.y-targetPos.y)*(pos.y-targetPos.y);

			if(passedCallback &&
				sumCatheti < (sumRadius*sumRadius)){
				passed = true;
				target.hide(true);
				passedCallback();

			}
		}
	}

	this.draw = function(ctx){
		ctx.beginPath()
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 5;
		ctx.arc(pos.x, pos.y, drawRadius, 0, 2*Math.PI, false);
		ctx.stroke();
	}

	this.setPassedCallback = function(callback){
		passedCallback = callback;
	}

	this.setTarget = function(t){
		target = t;
	}

	this.getPosition = function(){
		return pos;
	}

	this.setPreDrawCanvas = function(pdc){
		preDrawCanvas = pdc;
	}

}