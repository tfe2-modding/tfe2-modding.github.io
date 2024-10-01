const fs = require("fs")
const path = require('path')
const marked = require("./marked")

const contrib = fs.readFileSync(".contrib")

const link = Symbol()

function makeTOC(title, files) {
	if (files.length == 0) {
		return "Nothing in this directory"
	} else {
		return `# ${title}\n\n${files.map(e=>{
			if (e.isDirectory()) {
				return `- [${e.name}](${encodeURI(e.name.replace(/\s+/gm, ""))}/)`
			} else {
				return `- [${e.name.replace(/\.md$/, "")}](${encodeURI(e.name.replace(/\.md$/, ".html").replace(/\s+/gm, ""))})`
			}
		}).join("\n")}`
	}
}

function build(links={
	Home: "index.html"
}, from="./", toc="Home", struct={}) {
	const files = fs.readdirSync(from, {
		withFileTypes: true,
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
		const f = file.name
		if (file.isDirectory()) {
			const dir = struct[f] = {}
			build(links[file.name] = {}, from+file.name+"/", f, dir)
		} else {
			let isMD = false
			let fn = f.replace(/\.md$/, function(m) {
				isMD = true
				return ".html"
			})
			if (isMD) {
				links[file.name] = fn
				struct[fn] = marked.parse(fs.readFileSync(from+file.name, "utf8").replace("{{@.contrib}}", contrib))
			} else {
				struct[fn] = fs.readFileSync(from+file.name)
			}
		}
	}
	return struct
}

function makeSidebar(links, from="/") {
	return `<ul>${Object.entries(links).map(([key, value])=>{
		if (typeof value == "object") {
			return `<li><a href="${from+key.replace(/\s+/gm, "")+"/"}">${key}</a>\n${makeSidebar(value, from+key.replace(/\s+/gm, "")+"/")}\n</li>`
		} else {
			if (key == "index.md" || key == "404.md") {
				return ""
			} else return `<li><a href="${from+value.replace(/\s+/gm, "")}">${key.replace(/\.md$/,"")}</a></li>`
		}
	}).join("\n")}</ul>`
}

function write(struct, links, to="./.out/") {
	let stack = [{
		label: "Home",
		href: "/",
	}]
	function recursiveWrite(struct, to="./.out/", real="./.out/") {
		for (const [k, v] of Object.entries(struct)) {
			let kn = k.replace(/\s+/gm, "")
			if (typeof v == "object" && !(v instanceof Buffer)) {
				fs.mkdirSync(to+kn)
				stack.push({
					label: k.replace(/\.html$/,""),
					href: to.replace(/^\.\/.out/,"")+kn+"/",
				})
				recursiveWrite(v, to+kn+"/", real+k+"/")
				stack.pop()
			} else {
				let content = v
				if (path.extname(to+k) == ".html") {
					let navpath = stack.map((e, i) => {
						return '<a href="'+e.href+'">'+e.label+"</a>"
					}).join(" / ")
					let sidebar = makeSidebar(links)
					let title = (content.match(/<h1>(?<title>[^<]+)<\/h1>/m) || {groups:{title:"Modding The Final Earth 2 - Unofficial Documentation"}}).groups.title
					content = `<!DOCTYPE html>
<html lang="en">
	<head>
		<title>${title}</title>
		<meta charset="utf-8">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400" rel="stylesheet" type="text/css">
		<meta name="description" content="Documentation put together by the community to make modding the game a little bit easier.">
		<meta name="author" content="DT mods games">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="/style.css" rel="stylesheet" type="text/css">
		<link id="highlights" rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/styles/default.min.css">
		<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/highlight.min.js"></script>
		<script>hljs.initHighlightingOnLoad();</script>
	</head>
	<body>
		<sidebar>
${sidebar}
<small><a href="https://florianvanstrien.nl/TheFinalEarth2/modding.php">Official modding guide</a></small>
		</sidebar>
		<main>
			<label id="upperright"><input type="checkbox" id="darkmode"> Dark mode</label>
			<p>${navpath}</p>
${v}
		<br>
		<p><small><a href="https://github.com/tfe2-modding/tfe2-modding.github.io">GitHub repository</a> • <a href="https://florianvanstrien.nl/TheFinalEarth2/modding.php">Official modding guide</a></small></p>
		</main>
		<script src="/global.js"></script>
	</body>
</html>`
				}
				fs.writeFileSync(to+kn, content)
			}
		}
	}
	recursiveWrite(struct, to)
}

exports.build = build
exports.write = write
exports.makeTOC = makeTOC
