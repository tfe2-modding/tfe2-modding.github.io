const builder = require("./builder")
const fs = require("fs")

fs.rmSync("./.out/", { recursive: true, force: true })
fs.mkdirSync("./.out/")
const links = {
	Home: "index.html"
}
const struct = builder.build(links)
builder.write(struct, links)

fs.mkdirSync("./.out/Index")
fs.writeFileSync("./.out/Index/Custom Scenario JSON.html", `
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="refresh" content="0; url=https://tfe2-modding.github.io/DataFiles/CustomScenarioJSON.html" />
</head>
<body>
<p>This page has moved, redirecting to <a href="https://tfe2-modding.github.io/DataFiles/CustomScenarioJSON.html">DataFiles/CustomScenarioJSON.html</a></p>
</body>
</html>
`)