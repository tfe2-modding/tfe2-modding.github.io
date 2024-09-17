const builder = require("./builder")
const fs = require("fs")

fs.rmSync("./.out/", { recursive: true, force: true })
fs.mkdirSync("./.out/")
const struct = builder.build()
builder.write(struct)