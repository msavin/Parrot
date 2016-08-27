Package.describe({
	name:    	   'msavin:parrot',
	summary: 	   'The Parameter-based Router for Meteor',
	version: 	   '1.0.0',
	git:           'https://github.com/msavin/tinyrouter.git',
	documentation: 'README.md',
});

clientFiles = [
	'Router.js',
	'Router.parser.js',
	'Router.internal.js',
	'Router.parameters.js',
	'Router.parameters.cache.js',
	'Router.windowEvents.js'
];

Package.onUse(function(api) {
	api.addFiles(clientFiles, 'client');
	api.use('reactive-dict');
	api.use('reactive-var');
	api.versionsFrom('1.0');
	api.export("Router", "client")
});