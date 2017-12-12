// Initialize .env variable
require("dotenv").config()

// Set up http, and the request handler
var http = require("http");
var handler = require("./src/handler")

// Initialize and run server on process.env.PORT
var server = http.createServer(handler)
server.listen(process.env.PORT)

console.log("http://localhost:" + process.env.PORT)
