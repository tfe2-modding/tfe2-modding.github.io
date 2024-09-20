// this js runs site-wide
const body = document.getElementsByTagName("body")[0]
const darkmode = document.getElementById("darkmode")
const highlights = document.getElementById("highlights")

const defaultDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

if (localStorage.getItem("darkmode") == "true" || (localStorage.getItem("darkmode") == null && defaultDark)) {
	body.className = "darkmode"
	darkmode.checked = true
	highlights.href = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/styles/dark.min.css"
}

darkmode.onchange = function() {
	localStorage.setItem("darkmode", darkmode.checked)
	if (darkmode.checked) {
		body.className = "darkmode"
		highlights.href = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/styles/dark.min.css"
	} else {
		body.className = ""
		highlights.href = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/styles/default.min.css"
	}
}

for (const codeBlock of document.getElementsByTagName("pre")) {
	const copyText = codeBlock.innerText
	const copyButton = document.createElement("div")
	copyButton.className = "copy"
	copyButton.innerText = "📋"
	codeBlock.append(copyButton)
	copyButton.onclick = function() {
		navigator.clipboard.writeText(copyText).then(
			() => {
				copyButton.innerText = "✔️"
				setTimeout(()=>copyButton.innerText = "📋", 1000)
			}
		)
	}
}