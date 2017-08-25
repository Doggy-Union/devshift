var keystone = require('keystone');
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

ArticleRu.register();