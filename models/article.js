var keystone = require('keystone');
var Types = keystone.Field.Types;

var Article = new keystone.List("Article", { autokey: {from: "title", path: "url", unique: true, fixed: true }});

Article.add({
	title: { type: String, required: true, initial: true },
	content: { type: Types.Html, required: true, initial: true },
	brief: { type: String, required: true, initial: true },
	pubDate: { type: Types.Date, required: true, initial: true },
	keywords: { type: String, required: true, initial: true },
	preview: { type: Types.Url }
});

Article.register();