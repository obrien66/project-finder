var http = require("http")
var fs = require("fs")
var Mustache = require("mustache")

function error(code, res){
	// if the code is an actual code (check by seeing if string for code exists)
	if (http.STATUS_CODES[code]) {
		// writeHead code with code's message for html
		res.writeHead(code, http.STATUS_CODES[code], {'content-type': 'text/html'})
		// get template file
		var file = fs.readFileSync(__dirname + "/../public/error.html", "utf8");
		// make object
		var obj = {
			errcode: code,
			message: http.STATUS_CODES[code]
		}
		// template string for error page
		res.end(Mustache.render(file, obj))
		return
	}
	return
}

module.exports = error
