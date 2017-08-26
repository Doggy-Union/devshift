var keystone = require('keystone');
var sitemapfuncs = require('./sitemapcreator.js');
var Types = keystone.Field.Types;

var ArticleRu = new keystone.List("ArticleRu", { autokey: {from: "title", path: "url", unique: true, fixed: true }});

ArticleRu.add({
	title: { type: String, required: true, initial: true },
	content: { type: Types.Html, wysiwyg: true, required: true, initial: true },
	headInsert: { type: Types.Html },
	brief: { type: String, required: true, initial: true },
	pubDate: { type: Types.Date, required: true, initial: true },
	keywords: { type: String, required: true, initial: true },
	preview: { type: Types.Url }
});

ArticleRu.schema.pre("save", function(next) {
	if(this.isNew) {
		sitemapfuncs.addSitemapRecord(sitemapfuncs.getPostAdress(this.url), "post");
		console.log(this.url + " added to sitemap.xml as post");
	}
	next();
});

ArticleRu.register();