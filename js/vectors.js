vectors = {
	getVector: function(p1, p2){
		return {
			x: p2.x - p1.x,
			y: p2.y - p1.y
		}
	},

	length: function(v){
		return Math.sqrt( v.x*v.x + v.y*v.y);
	},

	normalize: function(v){
		var length = vectors.length(v);
		return {
			x: v.x/length,
			y: v.y/length
		}
	},
}