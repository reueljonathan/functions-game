graphics = {
	drawLine: function(ctx, p1, p2, color, width){
		color = color || '#fff';
		width = width || 1;

		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
		ctx.stroke();

	}
}