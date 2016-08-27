window.onhashchange = function (e) {
	var newURL = Router.parser.parse(e.newURL);
	var oldURL = Router.parser.parse(e.oldURL);
	Router.internal.run(newURL, oldURL);
	Router.parameters.updateFromURL(newURL);
};

window.addEventListener('load', Router.internal.init);