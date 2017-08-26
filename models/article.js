var keystone = require('keystone');
var sitemapfuncs = require('./sitemapcreator.js');
var Types = keystone.Field.Types;

var Article = new keystone.List("Article", { autokey: {from: "title", path: "url", unique: true, fixed: true }});

Article.add({
	title: { type: String, required: true, initial: true },
	content: { type: Types.Html, wysiwyg: true, required: true, initial: true },
	headInsert: { type: Types.Html },
	brief: { type: String, required: true, initial: true },
	pubDate: { type: Types.Date, required: true, initial: true },
	keywords: { type: String, required: true, initial: true },
	preview: { type: Types.Url }
});

Article.schema.pre("save", function(next) {
	if(this.isNew) {
		sitemapfuncs.addSitemapRecord(sitemapfuncs.getPostAdress(this.url), "post");
		console.log(this.url + " added to sitemap.xml as post");
	}
	next();
});

Article.register();