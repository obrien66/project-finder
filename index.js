// Initialize .env variable
require("dotenv").config()

// Set up http, and the request handler
var http = require("http");
var handler = require("./src/handler")

// if process.env.port then set port to it. Otherwise set port to 8000
var port = process.env.PORT || 8000

// Initialize and run server on process.env.PORT
var server = http.createServer(handler)
server.listen(port)

// prompt for the user
console.log("http://localhost:" + port)
