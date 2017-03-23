function Obstacle(points){
	var segments=[];

	function createSegments(){
		var s;
		for(var i = 0; i<points.length-1; i++){
			s = new Segment(points[i].x, points[i].y, 
				points[i+1].x, points[i+1].y);

			segments.push(s);
		}

		s = new Segment(points[points.length-1].x, points[points.length-1].y, 
				points[0].x, points[0].y);
		segments.push(s);
	}

	this.update = function(){
		for(var i=0; i<segments.length; i++)
			segments[i].update();
	}

	this.draw = function(ctx){
		ctx.beginPath();
		ctx.fillStyle='#241158';
		ctx.moveTo(points[0].x,points[0].y);
		for(var i=1; i<points.length; i++){
			ctx.lineTo(points[i].x,points[i].y);
		}
		ctx.lineTo(points[0].x,points[0].y);
		ctx.fill();
			

		for(var i=0; i<segments.length; i++)
			segments[i].draw(ctx);	
	}

	this.setTarget = function(target){
		for(var i=0; i<segments.length; i++)
			segments[i].setTarget(target);
	}

	createSegments();
}