Router.internal = {};
Router.internal.latestRoute = null;

Router.internal.run = function (newRoute) {
	var routeName = newRoute.name;

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

Router.internal.encode = function (url) {
	if (typeof url !== "string") {
		url = JSON.stringify(url);
	}

	if (url) {
		url = url.trim();
		return encodeURIComponent(url)
	}
}

Router.internal.decode = function (url) {
	if (url) {
		url = url.trim();
		url = decodeURIComponent(url);

		try {
			url = JSON.parse(url);
		} catch (e) {
			// ...
		}

		return url;
	}
}

Router.internal.constructURL = function (target) {
	var newHash = target.name || "";
	newHash = Router.internal.encode(newHash)
	var routeKeys = Object.keys(target.parameters);

	routeKeys.forEach(function (parameter) {
		if (target.parameters[parameter]) {
			var key = Router.internal.encode(parameter);
			var value = Router.internal.encode(target.parameters[parameter]);
			newHash = newHash + "/" + key + "=" + value;
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

Router.internal.getURL = function () {
	var url = window.location.href
	var lastCharacter = url.substr(url.length - 1);

	if (lastCharacter === "/") {
		url = url.substring(0, url.length - 1)
	}

	return url;

}