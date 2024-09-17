const marked = require("marked")
const fs = require("fs")
var http = require('http')
var path = require('path')

function makeTOC(title, files) {
	if (files.length == 0) {
		return "Nothing in this directory"
	} else {
		return files.map(e=>{
			if (e.isDirectory()) {
				return `- [${e.name}](${encodeURI(e.name)}/)`
			} else {
				return `- [${e.name.replace(/\.md$/, "")}](${encodeURI(e.name.replace(/\.md$/, ".html"))})`
			}
		}).join("\n")
	}
}

function build(from="./", toc="Home", struct={}) {
	const files = fs.readdirSync(from, {
		withFileTypes: true
	})
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		if (file.name[0] == "." || file.name == "node_modules") {
			files.splice(i, 1)
			i--
			continue
		}
	}
	if (toc) {
		struct["index.html"] = marked.parse(makeTOC(toc, files))
	}
	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		if (file.isDirectory()) {
			const dir = struct[file.name] = {}
			build(from+file.name+"/", file.name, dir)
		} else {
			let isMD = false
			let fn = file.name.replace(/\.md$/, function(m) {
				isMD = true
				return ".html"
			})
			if (isMD) {
				struct[fn] = marked.parse(fs.readFileSync(from+file.name, "utf8"))
			} else {
				struct[fn] = fs.readFileSync(from+file.name, "utf8")
			}
		}
	}
	return struct
}

function write(struct, to="./.out/") {
	let stack = [{
		label: "Home",
		href: "/",
	}]
	function recursiveWrite(struct, to="./.out/") {
		for (const [k, v] of Object.entries(struct)) {
			if (typeof v == "object") {
				fs.mkdirSync(to+k)
				stack.push({
					label: k.replace(/\.html$/,""),
					href: to.replace(/^\.\/.out/,"")+k+"/",
				})
				recursiveWrite(v, to+k+"/")
				stack.pop()
			} else {
				let content = v
				if (path.extname(to+k) == ".html") {
					let navpath = stack.map((e, i) => {
						return '<a href="'+e.href+'">'+e.label+"</a>"
					}).join(" / ")
					content = `<!DOCTYPE html>
<html lang="en">
	<head>
		<title>The Final Earth 2 - Unofficial Modding Guide</title>
		<meta charset="utf-8">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400" rel="stylesheet" type="text/css">
		<meta name="description" content="Unofficial modding guide for The Final Earth 2.">
		<meta name="author" content="DT makes games">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="https://florianvanstrien.nl/TheFinalEarth2/modding-style.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/styles/default.min.css">
		<style> summary {user-select: none;} p, li {font-size: unset !important;} main > p, main > * > li {font-size: 1.1 em !important;} </style>
		<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/highlight.min.js"></script>
		<script>hljs.initHighlightingOnLoad();</script>
	</head>
	<body>
		<main>
			<p>${navpath}</p>
${v}
<br>
<p><small><a href="https://github.com/tfe2-modding/tfe2-modding.github.io">GitHub repository</a> • <a href="https://florianvanstrien.nl/TheFinalEarth2/modding.php">Official modding guide</a></small>
		</main>
	</body>
</html>`
				}
				fs.writeFileSync(to+k, content)
			}
		}
	}
	recursiveWrite(struct, to)
}

let timeout = 0

function redo() {
	clearTimeout(timeout)
	timeout = setTimeout(function() {
		console.log("Something changed, rebuilding...")
		fs.rmSync("./.out/", { recursive: true, force: true })
		fs.mkdirSync("./.out/")
		const struct = build()
		write(struct)
		console.log("Done!")
	}, 10)
}

fs.watch("./src/", {
	recursive: true,
}, redo)

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