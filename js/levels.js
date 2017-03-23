LEVELS = [
	{
		number: 1,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'the beginning',
		ballPos: {x:550,y:60},
		goalPos: {x:220,y:400},
		// tip: 'Write functions in the format: \'Lower X, Greater X, function\'',
		tips: [
			// ['Welcome to the Functions game!', 3000],
			// ['Your goal is to take the ball to the target', 3000],
			// ['To do that, just write below something in the pattern: <strong>a, b, f(x)</strong>', 5000],
			// ['where <strong>a</strong> is the lowest value that f(x) will calculate,',  4000],
			// ['and <strong>b</strong> is the greatest value that f(x) will calculate',  4000],
			// ['and <strong>f(x)</strong> is path to the ball go to target',  4000],
			// ['Type \'<strong>-9, 9, x</strong>\' below and press Enter', 4000]
		]
	},
	{
		number: 2,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'elevator',
		ballPos: {x:550,y:100},
		goalPos: {x:220,y:440},
		tips:[
			// ['Great! You drew a line!', 3000],
			// ['You can move the line upwards or downwards', 3000],
			// ['using a function like <strong>x+c</strong> or <strong>x-c</strong>', 3000],
			// ['where <strong>c</strong> is a number.', 3000],
			// ['Can you beat this one?', 3000]
		],
	},

	{
		number: 3,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'left and right',
		ballPos: {x:430,y:100},
		goalPos: {x:100,y:440},
		tips:[
			// ['Well done!', 3000],
			// ['You can also move the line to the left or to the right',  4000],
			// ['Just use a <strong>x+c</strong> or <strong>x-c</strong>...', 4000],
			// ['and change the interval!', 3000],
			// ['What about \'<strong>-13, 4, x+5</strong>\'?', 5000]
		],
	},

	{
		number: 4,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'rotating',
		ballPos: {x:700,y:200},
		goalPos: {x:100,y:300},
		tips:[
			// ['Well done!', 3000],
			// ['You can also move the line to the left or to the right',  4000],
			// ['Just use a <strong>x+c</strong> or <strong>x-c</strong>...', 4000],
			// ['and change the interval!', 3000],
			// ['What about \'<strong>-13, 4, x+5</strong>\'?', 5000]

		],
	},

	{
		number: 5,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'inverting signals',
		ballPos: {x:220,y:50},
		goalPos: {x:575,y:400},
		tips:[
			// ['Well done!', 1000]
		],
	},

	{
		number: 6,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'inverting signals',
		ballPos: {x:220,y:50},
		goalPos: {x:575,y:400},
		tips:[
			// ['Well done!', 1000]
		],

		obstacles:[
			[
				{x:430, y:200},
				{x:650, y:200},
				{x:650, y:250},
				{x:400, y:250}, 
				// {x:320, y:200}
			]
		]
	}
];