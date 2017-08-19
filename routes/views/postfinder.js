var keystone = require('keystone');
var Article = keystone.list("Article");

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	view.on('init', function(next) {
		var q = Article.model.find({"url": req.params.url}).select("title content preview pubDate keywords")
			.exec(function(error, result) {
				console.log(result);
				if(result.length == 0) {
					return res.status(404).send(keystone.wrapHTMLError('No such articles.'));
					next();
				} else {
					res.locals.data = result[0];
					next();
				}
			});
	});
	
	view.render('post');
}