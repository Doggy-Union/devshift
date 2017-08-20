var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.secureRedirect);
keystone.pre('static', middleware.secureRedirect);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function(req, res, next) {
	res.notfound();
});

keystone.set('500', function(req, res, next) {
	var title, message;
	if(err instanceof Error) {
		message = err.message;
		err = err.stack;
	}
	res.err(err, title, message);
});

var routes = {
	views: importRoutes('./views')
};

exports = module.exports = function(app) {
	app.all('/' , routes.views.main);
	app.all('/ru' , routes.views.mainru);
	app.get('/blog', routes.views.blog);
	app.get('/blog/post/:url', routes.views.postfinder);
	app.get('/.well-known/acme-challenge/:challengeHash', function(req, res) { // for Let's Encrypt
	    var hash = req.params.challengeHash;
	    res.send(hash + '.UlLLEEZQuSBOxhO8W20LKMtd6LhjEr39n5felDCXDPc');
	});
	app.use(middleware.secureRedirect);
}