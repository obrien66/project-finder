require "socket"
require "dotenv/load"
require "json"
require "cgi"
# require_relative "Template.rb"
require_relative "Responder.rb"

port = ENV['PORT'] or 8000

server = TCPServer.new("localhost", port)

trap("INT") { puts "\nShutting down."; exit}
puts "Running on http://localhost:#{port}\nStop with ^C (ctrl+c)"

def file_response(url, needs_template, socket)
	filename = "public#{url}"
	res = ""
	begin
		File.open(filename).each do |line|
			res += line
		end
		status = "200"
		message = "OK"
		type = filename.split(".")[-1]
	rescue Exception => e
		File.open("public/error.html").each do |line|
			res += line
		end
		status = "404"
		message = "File not found"
		type = "html"
	end
	socket.print Responder.new(status, message, type, res).respond
	socket.close
	return
end


loop do
	socket = server.accept
	req = socket.gets
	puts req
	# 0 is method
	# 1 is url
	req_parts = req.split(" ")

	url = req_parts[1]
	needs_template = false
	if url.include? "?"
		url = url[2..-1]
		res = CGI::parse(url).to_s
		socket.print Responder.new("200", "OK", "plain", res).respond
		socket.close
	elsif url == "/"
		url = "/index.html"
		needs_template = true
	end
	file_response url, needs_template, socket

end
