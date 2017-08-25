var keystone = require('keystone');
var Article = keystone.list("Article");

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.on('init', function(next) {
		var q = Article.model.find().sort("-pubDate").limit(5).select('title preview brief url').exec(function(err, res) {
			locals.posts = res;
			next();
		});
	});
	
	view.render('blog');
}