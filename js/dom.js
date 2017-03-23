DOM = {
	create: function(tag){
		if (typeof(tag) === 'string')
			return document.createElement(tag);
	},

	get: function(querySelector){
		if (typeof(querySelector) === 'string')
			return document.querySelector(querySelector);
	}
};