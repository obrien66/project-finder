var fs = require("fs")
var stdin = process.stdin
var stdout = process.stdout

console.log("Enter a port for the server:")

stdin.setEncoding('utf8')

stdin.on('readable', function(){
	var chunk = stdin.read()
	if (chunk) {
		var writeVal = `PORT=${chunk}`
		fs.writeFile(".env", writeVal, (err) => {
			if (err) {
				throw err
			}
			else {
				console.log("Wrote to .env -> PORT=" + chunk)
				stdin.pause()
			}
		})
	}
})
stdin.on('end', function(){
	stdout.write('[end]')
})
