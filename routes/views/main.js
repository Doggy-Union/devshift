var keystone = require('keystone');
var PortfolioWork = keystone.list('PortfolioWork');

exports = module.exports = function(req, res) {
	//dealing with user's language
	var al = req.get('Accept-Language'); //read Accept-Language header
	var lang = al.slice(0, al.indexOf(',')); //formatting it
	if(req.get('Cookie').indexOf('preflang') != -1) { //if user have a cookie parse them and format
		var cookie = req.get('Cookie');
		lang = cookie.slice(cookie.indexOf('preflang=') + 9);
		if(lang.indexOf(';') != -1)
			lang = lang.slice(0, lang.indexOf(';'));
	}
	if(!lang) lang = 'en-US'; //if no lang set en-us as standart
	
	if(lang == 'ru' || lang.toLowerCase() == 'ru-ru') { //if user speak russian send him to another page
		res.redirect('/ru');
		return;
	}
	
	//else render whole this english story;
	
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
	
	view.render('main');
}