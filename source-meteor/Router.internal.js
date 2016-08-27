Router.internal = {};
Router.internal.latestRoute = null;

Router.internal.run = function (newRoute) {
	routeName = newRoute.name;

	if (Router.routes[routeName]) {
		if (Router.internal.latestRoute !== routeName) {
			Router.routes[routeName].callback(newRoute.parameters);
			Router.internal.latestRoute = routeName;
		}
	} else {
		Router.internal.onError();
	}

	if (typeof Router.config.onRouteChange === "function") {
		Router.config.onRouteChange(newRoute);
	}

	if (newRoute.name) {
		Router.current.set(newRoute.name);
		Router.cache.set(newRoute);
	};

}

Router.internal.init = function () {
	if (window.location.hash === "") {
		if (Router.config.defaultRoute) {
			Router.go(Router.config.defaultRoute);
		}
	} else {
		var DudeWheresMyCar = Router.parser.parse(location.href);
		Router.internal.run(DudeWheresMyCar);
		Router.parameters.updateFromURL(DudeWheresMyCar);
	}
}

Router.internal.onRouteChange = function (newRoute, oldRoute) {
	if (typeof Router.config.onRouteChange === "function") {
		Router.config.onRouteChange(newRoute, oldRoute);
	}
}

Router.internal.onError = function () {
	if (typeof Router.config.onRouteError === "function") {
		Router.config.onRouteError();
	}
}

Router.internal.constructURL = function (target) {
	newHash = target.name || "";
	routeKeys = Object.keys(target.parameters);

	routeKeys.forEach(function (parameter) {
		if (target.parameters[parameter]) {
			newHash = newHash + "/" + parameter + "=" + target.parameters[parameter];
		}
	});

	return newHash;
}

Router.internal.go = {};

Router.internal.go.fromString = function (name) {
	if (location.hash !== name) {
		target = Router.parser.parse(name);
		hash = Router.internal.constructURL(target);
		hash.replace("#", "");
		location.hash = hash;
	}
}

Router.internal.go.fromObject = function (name, parameters) {
	var params = Object.keys(parameters);
	var route = name; 

	params.forEach(function (paramKey) {
		var paramValue = parameters[paramKey];

		if (typeof paramValue === "function") {
			var cache = Router.cache.get(name, paramKey);
			paramValue = paramValue(cache);
		}

		if (paramValue) {
			route += "/" + paramKey + "=" + paramValue;
		}
	});

	Router.internal.go.fromString(route);
}