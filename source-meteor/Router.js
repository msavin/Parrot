Router          = new ReactiveDict("Router");
Router.current  = new ReactiveVar(null);
Router.routes   = {};
Router.config   = {};

Router.register = function (routes) {
	var keys = Object.keys(routes)

	keys.forEach(function (route) {
		callback = routes[route]
		Router.routes[route] = {};
		Router.routes[route].callback = callback;
	});
}

Router.go = function (name, parameters) {
	if (typeof parameters === "object") {
		Router.internal.go.fromObject(name, parameters);
	} else if (typeof name === "string") {
		Router.internal.go.fromString(name);
	} else {
		console.log("Router: Invalid destination:");
		console.log(name);
	}
}

Router._get = Router.get;

Router.get = function (key) {
	if (key) {
		return Router._get(key);
	} else {
		return Router.current.get();
	}
}

Router.init = function (config) {
	if (typeof config.home     === "string") {
		Router.config.defaultRoute = config.home;
	}
	if (typeof config.home     === "function") {
		Router.config.defaultRoute = config.home();
	}
	if (typeof config.onError  === "function") {
		Router.config.onRouteError = config.onError;
	}
	if (typeof config.onChange === "function") {
		Router.config.onRouteChange = config.onChange; 
	}
}

Router.debug = function () {
	console.log("The defined routes are:");
	console.log(Router.routes);
	console.log("The router configuration is:");
	console.log(Router.config);
	console.log("The current route is:");
	console.log(Router.parser.parse(Router.internal.getURL()));
	console.log("The cached parameters are:");
	console.log(Router.cache.data);
}