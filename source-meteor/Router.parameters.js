Router.parameters = {}

Router._set    = Router.set;
Router._delete = Router.delete;

Router.set = function (key, value) {
	Router.parameters.updateHash(key, value);
}

Router.delete = function () {
	var args;
	
	// Convert arguments into array
	if (typeof arguments[0] === "object") {
		args = arguments[0]
	} else {
		args = [].slice.apply(arguments);
	}

	if (args.length > 1) {
		keys = {};
		args.forEach(function (item) {
			keys[item] = null;
		});

		Router.parameters.updateHash(keys, null);
	} else {
		Router.parameters.updateHash(args[0], null);		
	}
}

Router.parameters.updateHash = function (key, value) {
	// 1. Grab the current hash
	var current = Router.parser.parse(Router.internal.getURL())

	// 2. Place the new value
	if (typeof key === "object") {
		keys = Object.keys(key);
		keys.forEach(function (item) {
			current.parameters[item] = key[item];
		});
	} else {
		current.parameters[key] = value;	
	}

	// 3. Reconstruct the hash
	var newHash = Router.internal.constructURL(current);

	// 4. Be fruitful and multiply
	Router.go(newHash);
}

Router.parameters.updateFromURL = function (data) {
	// 1. Diff the current parameters and previous parameters
	// 2. Update the existing parameters
	var newParameters     = data.parameters;
	var newParameterNames = Object.keys(newParameters);
	var oldParameters     = Object.keys(Router.all());

	// 3. Remove the old parameters 
	oldParameters.forEach(function (key) {
		if (newParameterNames.indexOf(key) > -1) {
			// nothing to do all day
		} else {
			Router._delete(key);
		}
	});
	
	newParameterNames.forEach(function (key) {
		value = newParameters[key];
		Router._set(key, value);
	});
}