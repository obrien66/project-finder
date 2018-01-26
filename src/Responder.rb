class Responder
	def initialize(status, message, type, response)
		@status = status
		@message = message
		@type = type
		@response = response
	end
	def respond
		if @type != "json"
			text = "text"
		else
			text = "application"
		end
		return "HTTP/1.1 #{@status} #{@message}\r\n" +
               "Content-Type: #{text}/#{@type}\r\n" +
               "Content-Length: #{@response.bytesize}\r\n" +
               "Connection: close\r\n\r\n#{@response}"
	end
end
