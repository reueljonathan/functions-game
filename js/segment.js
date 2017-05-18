function Segment(x1, y1, x2, y2){
		var target,
			segmentVector = { x: x2-x1, y: y2-y1},
			targetVector = {},
			projection,
			projectionVector = {x:null, y:null},
			closestPoint = {x:null, y:null},
			length = Math.sqrt( Math.pow(x2-x1,2) + Math.pow(y2-y1,2)),
			angle = Math.acos( (x2-x1) / length),
			normal = vectors.normalize({x: y2-y1, y: -(x2-x1)}),

			vel = { x: 0, y:0};

		var collisionColor = '#ff0';

		var collisionNormal, colx, coly;

		this.draw = function(ctx){

			//draw segment
			graphics.drawLine(ctx,
				{x: x1, y: y1}, {x: x2, y: y2},
				collisionColor);

			if(collisionNormal){
				graphics.drawLine(ctx,
					{x: colx, y: coly},
					{x: colx + collisionNormal.x, y: coly + collisionNormal.y},
					'#f0f');
			}
		}

		this.setTarget = function(t){
			target = t;
			radius = target.getRadius();
		}

		this.update = function(){
			if(target){
				targetPosition = target.getPosition();
				targetVector.x = targetPosition.x - x1;
				targetVector.y = targetPosition.y - y1;
	
				//projection
				var segLength = Math.sqrt(segmentVector.x * segmentVector.x + segmentVector.y* segmentVector.y);
				
				projection = 
					targetVector.x * (segmentVector.x / segLength )+ 
					targetVector.y * (segmentVector.y / segLength);
	
				if (projection < 0){
					closestPoint.x = x1;
					closestPoint.y = y1;
				} else if (projection > segLength){
					closestPoint.x = x2;
					closestPoint.y = y2;
				}else{
					projectionVector.x = projection*(segmentVector.x / segLength );
					projectionVector.y = projection*(segmentVector.y / segLength );
	
					closestPoint.x = x1 + projectionVector.x;
					closestPoint.y = y1 + projectionVector.y;
				}
	
	
				//test if colliding
				if(Math.pow( targetPosition.x - closestPoint.x ,2) 
					+  Math.pow( targetPosition.y - closestPoint.y,2) < (radius*radius) ){
					collisionColor = '#f00';
	
					var rv = target.getVelocity(),
						velAlongNormal = rv.x * normal.x + rv.y * normal.y;
	
					if (!(velAlongNormal > 0)){
						var e = target.getRestitution(),
							j = -(1+e) * velAlongNormal;
	
						j /= 1/target.getMass();
	
						var impulse = {
							x: j * normal.x,
							y: j * normal.y
						},
						ballVelocity = target.getVelocity();
	
						ballVelocity.x += 1/target.getMass() * impulse.x;
						ballVelocity.y += 1/target.getMass() * impulse.y;
	
						target.setVelocity(ballVelocity);
	
						target.positionalCorrection(normal, closestPoint);
					}
	
				}else{
					collisionColor = '#ff0';
				}
			}

		}

		this.getAngle = function(){ return angle; }
	}