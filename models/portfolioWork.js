var keystone = require('keystone');
var sitemapfuncs = require('./sitemapcreator.js');
var Types = keystone.Field.Types;

var PortfolioWork = new keystone.List('PortfolioWork', {
	autokey: { from: 'preview', path: 'key', unique: true }
});

PortfolioWork.add({
    title: { type: String, required: true, initial: true },
    preview: { type: Types.Url, required: true, initial: true },
	description: { type: String },
	link: { type: Types.Url, required: true, initial: true }
});

PortfolioWork.schema.pre("save", function(next) {
	if(this.isNew) {
		sitemapfuncs.addSitemapRecord(this.link, "portfoliowork");
		console.log(this.link + " added to sitemap.xml as portfolio work");
	}
	next();
});

PortfolioWork.register();