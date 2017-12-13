// Initialize fs
var fs = require("fs")
var http = require("http")

function handler(req, res) {
	var extension = req.url.split(".").reverse()[0]
	if (req.method === "GET") {
		if (req.url === "/") {
			fs.readFile(__dirname + "/../public/index.html", "utf8", (err, data) => {
				if (err) {
					error(404, res)
				}
				else {
					res.writeHead(200, {'content-type': 'text/html'})
					res.end(data)
				}
			})
		}
		else if (req.url === "/post") {
			fs.readFile(__dirname + "/../public/publish.html", "utf8", (err, data) => {
				if (err) {
					error(404, res)
				}
				else {
					res.writeHead(200, {'content-type': 'text/html'})
					res.end(data)
				}
			})
		}
		else if (extension === "css") {
			var filename = req.url.split("/").reverse()[0]
			fs.readFile(__dirname + "/../public/" + filename, "utf8", (err, data) => {
				if (err) {
					error(404, res)
				}
				else {
					res.writeHead(200, {'content-type': 'text/css'})
					res.end(data)
				}
			})
		}
		else {
			error(404, res)
		}
	}
	else {
		error(405, res)
	}
}

function error(code, res){
	if (http.STATUS_CODES[code]) {
		res.writeHead(code, http.STATUS_CODES[code], {'content-type': 'text/html'})
		res.end(`
			<html>
			<head>
				<meta charset="utf8">
				<title>${code}: Repo Finder</title>
				<link rel="stylesheet" href="/master.css">
				<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
			</head>
			<body>
				<div class="container">
					<div class="display">
						<h1>${code}: ${http.STATUS_CODES[code]}!</h1>
						<a href="/">Head home</a>
					</div>
				</div>
			</body>
			</html>
		`)
		return
	}
	return
}

module.exports = handler
