const fs = require("fs")
var http = require('http')
var path = require('path')
const {build, write} = require("./builder")

let timeout = 0

function redo() {
	clearTimeout(timeout)
	timeout = setTimeout(function() {
		console.log("Something changed, rebuilding...")
		fs.rmSync("./.out/", { recursive: true, force: true })
		fs.mkdirSync("./.out/")
		const links = {
			Home: "index.html"
		}
		const struct = build(links)
		write(struct, links)
		console.log("Done!")
	}, 10)
}

fs.watch("./", {
	recursive: true,
}, (e, fn) => {
	if (fn[0] != ".") redo()
})

redo()

http.createServer(function (request, response) {

	var filePath = './.out/' + decodeURI(request.url)

	var extname = path.extname(filePath)
	var contentType = 'text/html'
	switch (extname) {
		case '.js':
			contentType = 'text/javascript'
			break
		case '.css':
			contentType = 'text/css'
			break
		case '.json':
			contentType = 'application/json'
			break
		case '.png':
			contentType = 'image/png'
			break    
		case '.jpg':
			contentType = 'image/jpg'
			break
		case '.wav':
			contentType = 'audio/wav'
			break
	}

	function tryRead(filePath, do404=false) {
		fs.readFile(filePath, function(error, content) {
			if (error) {
				if (error.code == 'ENOENT') {
					if (do404) {
						fs.readFile('./.out/404.html', function(error, content) {
							response.writeHead(200, { 'Content-Type': contentType })
							response.end(content || "404 "+filePath, 'utf-8')
						})
					} else tryRead(filePath+".html", true)
				} else {
					if (error.code == "EISDIR") {
						tryRead(filePath+"/index.html")
					} else {
						response.writeHead(500)
						response.end('Sorry, check with the site admin for error: '+error.code+' ..\n'+filePath)
						response.end()
					}
				}
			} else {
				response.writeHead(200, { 'Content-Type': contentType })
				response.end(content, 'utf-8')
			}
		})
	}

	tryRead(filePath)

}).listen(8125)