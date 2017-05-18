LEVELS = [
	{
		number: 1,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'the beginning',
		ballPos: {x:550,y:60},
		goalPos: {x:220,y:400},
		// tip: 'Write functions in the format: \'Lower X, Greater X, function\'',
		tutorial: [
			['Welcome to the <b>Functions</b> game!', 3000],
			['Let\'s start with the basics:', 3000],
			['Your goal is to take the ball to the target', 3000],
			['To do that, just write below something in the pattern: <b>[a, b] f(x)</b>', 5000],
			['where <b>a</b> is the lowest value that f(x) will calculate,',  4000],
			['and <b>b</b> is the greatest value that f(x) will calculate',  4000],
			['and <b>f(x)</b> is path to the ball go to target',  4000],
			['Type <b>[-9, 9] x</b> below and press Enter', 4000]
		],
		tips: [
			['remember that a line formula is <b>f(x) = ax + b</b>', 5000]

		],
		triesBeforeTip: 2
	},
	{
		number: 2,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'elevator',
		ballPos: {x:550,y:100},
		goalPos: {x:220,y:440},
		tutorial:[
			// ['Great! You drew a line!', 3000],
			// ['You can move the line upwards or downwards', 3000],
			// ['using a function like <b>x+c</b> or <b>x-c</b>', 3000],
			// ['where <b>c</b> is a number.', 3000],
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
		tutorial:[
			// ['Well done!', 3000],
			// ['You can also move the line to the left or to the right',  4000],
			// ['Just use a <b>x+c</b> or <b>x-c</b>...', 4000],
			// ['and change the interval!', 3000],
			// ['What about \'<b>-13, 4, x+5</b>\'?', 5000]
		],
	},

	{
		number: 4,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'rotating',
		ballPos: {x:700,y:200},
		goalPos: {x:100,y:300},
		tutorial:[
			// ['Well done!', 3000],
			// ['You can also move the line to the left or to the right',  4000],
			// ['Just use a <b>x+c</b> or <b>x-c</b>...', 4000],
			// ['and change the interval!', 3000],
			// ['What about \'<b>-13, 4, x+5</b>\'?', 5000]

		],
	},

	{
		number: 5,
		unitSize: 20,
		center: { x:400, y:240},
		name: 'inverting signals',
		ballPos: {x:220,y:50},
		goalPos: {x:575,y:400},
		tutorial:[
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
		tutorial:[
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