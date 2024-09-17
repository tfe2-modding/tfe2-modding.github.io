const builder = require("./builder")
const fs = require("fs")

fs.rmSync("./.out/", { recursive: true, force: true })
fs.mkdirSync("./.out/")
const links = {
	Home: "index.html"
}
const struct = builder.build(links)
builder.write(struct, links)