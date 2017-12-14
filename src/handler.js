// Initialize fs
var fs = require("fs")
var http = require("http")
var querystring = require("querystring")
var util = require("util")
var Mustache = require("mustache")
var error = require("./error")
// You know how legit it is when
var db = {
	list: []
}

function handler(req, res) {
	// get extension (for css)
	var extension = req.url.split(".").reverse()[0]
	if (req.method === "GET") {
		// Check get requests
		// if /
		if (req.url === "/") {
			// read index.html in public/
			fs.readFile(__dirname + "/../public/index.html", "utf8", (err, data) => {
				if (err) {
					// worst case scenario 404
					error(404, res)
				}
				else {
					// send data
					res.writeHead(200, {'content-type': 'text/html'})
					let retval = Mustache.to_html(data, db)
					res.end(retVal)
				}
			})
		}
		// if /post
		else if (req.url === "/post") {
			// read publish.html in public/
			fs.readFile(__dirname + "/../public/publish.html", "utf8", (err, data) => {
				if (err) {
					// worst case scenario 404
					error(404, res)
				}
				else {
					// send data
					res.writeHead(200, {'content-type': 'text/html'})
					res.end(data)
				}
			})
		}
		// if css or js requested
		else if (extension === "css" || extension === "js") {
			// get the stylesheet or script filename
			var filename = req.url.split("/").reverse()[0]
			// read it
			fs.readFile(__dirname + "/../public/" + filename, "utf8", (err, data) => {
				if (err) {
					// if no stylesheet or script respond with 404
					error(404, res)
				}
				else {
					// send stylesheet or script
					res.writeHead(200, {'content-type': 'text/css'})
					res.end(data)
				}
			})
		}
		// else if (req.url === "/data") {
		// 	res.writeHead(200, {'content-type': 'application/json'})
		// 	res.end(util.inspect(db.list.reverse()))
		// }
		// if none of the above send 404
		else {
			error(404, res)
		}
	}
	// if post
	else if (req.method === "POST" && req.url === "/"){
		var body = ""
		req.on('data', data => {
			body += data

			if (body.length > 1e6){
                request.connection.destroy()
            }
		})
		req.on('end', function(){
			var postData = querystring.parse(body)
			if (!containsObject(postData, db)) {
					db.list.push(postData)
			}

		})
		fs.readFile(__dirname + "/../public/index.html", "utf8", (err, data) => {
			if (err) {
				// worst case scenario 404
				error(404, res)
			}
			else {
				// send data
				res.writeHead(200, {'content-type': 'text/html'})
				res.end(data)
			}
		})
	}
	// if not get or post send 405
	else {
		error(405, res)
	}
}

// Bless stackoverflow
function containsObject(obj, list) {
    var key;
    for (key in list) {
        if (list.hasOwnProperty(key) && list[key] === obj) {
            return true;
        }
    }

    return false;
}
// return handler for index.js
module.exports = handler
