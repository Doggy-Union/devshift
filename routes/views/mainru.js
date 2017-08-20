var keystone = require('keystone');
var PortfolioWork = keystone.list('PortfolioWork');
var ClientRequest = keystone.list('ClientRequest');

exports = module.exports = function(req, res) {
	//render whole this russian story;
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.on('init', function(next) {
		var q = PortfolioWork.model.find().limit(5).select('title preview link').exec(function(err, res) {
			locals.res = [];
			locals.res = res;
			console.log(locals.res);
			next();
		});
	});

	view.on('post', function(next) {
		var application = new ClientRequest.model();
		var updater = application.getUpdateHandler(req);
		updater.process(req.body, {}, function(err) {
			if (err) console.log(err);
			next();
		});
	});
	
	view.render('mainru');
}