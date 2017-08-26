function createSitemapRecord(url, pageType) {
	var result = "\t<url>";
	if(pageType == "post") {
		result += "\n\t\t<loc>" + url + "</loc>\n\t\t<changefreq>daily</changefreq>\n\t\t<priority>0.9</priority>\n\t</url>\n"
	}
	if(pageType == "portfoliowork") {
		result += "\n\t\t<loc>" + url + "</loc>\n\t\t<changefreq>never</changefreq>\n\t\t<priority>0.3</priority>\n\t</url>\n"
	}
	return result;
}

function getPostAdress(url) {
	return "https://devshift.co.uk/blog/post/" + url;
}
var io = require('fs');

function insertSitemapRecord(record) {
	io.readFile("sitemap.xml", {encoding: "utf8"}, function(err, data) {
		if(err) {
			console.log("failed to read sitemap.xml");
			console.log(err);
			data = "</urlset>";
		}
		data = data.slice(0, -9) + record + "</urlset>";
		io.open("sitemap.xml", 'w', function(err, fd) {
			if(err) {
				console.log("failed to access sitemap.xml");
				console.log(err);
				return;
			}
			io.write(fd, data, 0, "utf8", function(err) {
				if(err) console.log("failed to write in sitemap.xml");
				io.close(fd, function() { return; });
			});
		});
	});
}
function addSitemapRecord(url, type) {
	var r = createSitemapRecord(url, type);
	insertSitemapRecord(r);
	return r;
}

exports.getPostAdress = getPostAdress;
exports.addSitemapRecord = addSitemapRecord;