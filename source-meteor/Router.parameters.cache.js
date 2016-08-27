Router.cache = {};
Router.cache.data = {}

Router.cache.setParam = function (section, key, value) {
	// ensure the cache store exists
	if (typeof Router.cache.data[section] !== "object") {
		Router.cache.data[section] = {};
	}

	// save the data
	Router.cache.data[section][key] = value;
}	

Router.cache.set = function(data) {
	routeName = data.name;
	parameters = Object.keys(data.parameters);

	parameters.forEach(function (item) {
		Router.cache.setParam(routeName, item, data.parameters[item]);
	});
}

Router.cache.get = function (section, key) {
	try {
		return Router.cache.data[section][key];
	} catch (e) {
		return undefined;
	}
}

Router.getCache = Router.cache.get;