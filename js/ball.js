function Ball(x, y){
		var pos = { x: x, y: y},
			vel = { x: 0, y: 0},
			mass = 2,
			gravity = 1,
			accel = { x: 0, y: mass*gravity},
			radius = 5,
			restitution = 0.4,
			inv_mass = 1/mass,
			hide,
			preDrawCanvas,
			moving = false,
			maxX, maxY;

		this.setBounds = function(x,y){
			maxX = x;
			maxY = y;
		}

		this.update = function(t){
			if(!hide && moving){
				vel.x += accel.x*t /1000;
				vel.y += accel.y*t /1000;

				pos.x += vel.x;
				pos.y += vel.y;


				if(pos.x < 0 || pos.x > maxX ||
				   pos.y < 0 || pos.y > maxY)
					this.reset();
			}
		}

		this.draw = function(ctx){
			if(!hide){
				ctx.beginPath()
				ctx.fillStyle = '#fff';
				ctx.arc(pos.x, pos.y, radius, 0, 2*Math.PI, false);
				ctx.fill();
			}
		}

		this.getPosition = function(){
			return pos;
		}

		this.setPosition = function(p){
			pos=p;
		}

		this.getRadius = function(){
			return radius;
		}

		this.getVelocity = function(){
			return vel;
		}

		this.setVelocity = function(v){
			vel = v;
		}

		this.impulse = function(impulse){
			vel.x += impulse.x; 
			vel.y -= impulse.y;
		}

		this.getRestitution = function(){
			return 0.2;
		}

		this.getMass = function(){
			return mass;
		}

		this.positionalCorrection = function(normal, closestPoint){
			var percent = 0.8, slop=0.1,
				disCenterPoint = vectors.length(vectors.getVector(pos, closestPoint))
				penetration = radius - disCenterPoint,
				correction = {x:0,y:0},
				value = Math.max( penetration - slop, 0);

			correction = {
				x: value / inv_mass*percent*normal.x,
				y: value / inv_mass*percent*normal.y
			};

			pos.x += correction.x;
			pos.y += correction.y;
		}

		this.hide = function(h){
			hide = h;
		}

		this.setMoving = function(m){
			moving = m;
		}

		this.reset = function(){
			vel.x = 0; vel.y = 0;
			pos.x = x; pos.y = y;
			moving = false;
		}

		this.setPreDrawCanvas = function(pdc){
			preDrawCanvas = pdc;
		}
	}