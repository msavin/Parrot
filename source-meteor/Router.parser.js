Router.parser   = {};

Router.parser.parse = function (inputURL) {
	// 1. remove the base URL, since we don't need it.
	var query      = Router.parser.getQueryFromURL(inputURL);

	// 2. Grab the rest and split on slashes. 
	var name     = Router.parser.getActionFromQuery(query);
	
	// 3. The first part is the "command" ("#order")
	var parameters = Router.parser.getParametersFromQuery(query);
	
	// 4. Generate and return object
	var result           = {};
	result["parameters"] = {};
	result["name"]       = name;
	result["hash"]		 = Router.parser.getQueryFromURL(inputURL);
	result["url"]		 = inputURL;


	for (var key in parameters) {
		result.parameters[key] = parameters[key];
	}

	return result;
}

Router.parser.getQueryFromURL = function (inputURL) {
	// Remove the base URL and return a query string (fails on localhost)
	// var regex = RegExp(/((http(s)*(:\/\/)){1})([0-z]+)((\.+)([a-z]{2,3}))+(\/)*/g);
	// var output = inputURL.replace(regex, "");
	var absoluteUrl = window.location.origin + window.location.pathname;
	var output = inputURL.replace(absoluteUrl, "");

	// strip out the search field
	output = output.replace(location.search, "");
	return output;
}

Router.parser.getActionFromQuery = function (queryString) {
	// Get the action from the query string
	var components = Router.parser.getComponentsFromQueryString(queryString);
	var first = components[0];
	first = first.replace("#", "")
	return first;
}

Router.parser.getComponentsFromQueryString = function (queryString) {
	// Get the components from a query string
	var components = queryString.split("/");
	return components;
}

Router.parser.getParametersFromQuery = function (queryString) {
	// Get the pairs after the action
	var components = Router.parser.getComponentsFromQueryString(queryString);
	var pairs = components.slice(1, components.length);
	var parameters = {};
	
	// Now convert the pairs into the paramaters
	// NOTE: Assume proper encoding. 
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i];
		var partsOfPair = pair.split("=");
		var key = partsOfPair[0];
		var value = partsOfPair[1];
		
		// decode 
		key = Router.internal.decode(key);
		value = Router.internal.decode(value);

		parameters[key] = value;
	}
	
	return parameters;
}