// Initialize .env variable
require("dotenv").config()

// Set up http, and the request handler
var http = require("http");
var handler = require("./src/handler")

var port = process.env.PORT || 8000
// Initialize and run server on process.env.PORT
var server = http.createServer(handler)
server.listen(port)

console.log("http://localhost:" + port)
