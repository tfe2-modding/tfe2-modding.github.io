const sprites = document.createElement("img")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.mozImageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false
const zoom = document.getElementById("zoom")
const background = document.getElementById("background")
const label = document.getElementById("label")
const spriteInput = document.getElementById("sprite")
const save = document.getElementById("save")
let spriteName = "unknown.png"
sprites.src = "./sprites.png"
save.onclick = function() {
	var link = document.createElement('a')
	link.download = spriteName
	link.href = canvas.toDataURL()
	link.click()
}
fetch("./sprites.json").then(v => v.json()).then(spriteData => {
	for (const [k, v] of Object.entries(spriteData.frames)) {
		const option = spriteInput.appendChild(document.createElement("option"))
		option.value = k
		option.innerText = k
	}
	function updateSprite() {
		spriteName = spriteInput.value
		const sprite = spriteData.frames[spriteName]
		const z = zoom.value
		canvas.width = sprite.frame.w
		canvas.height = sprite.frame.h
		if (z < 6) {
			label.innerText = z+"00%"
			canvas.style.width = sprite.frame.w * z + "px"
		} else {
			label.innerText = "Max"
			canvas.style.width = "100%"
		}
		canvas.style.backgroundColor = background.value
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.drawImage(sprites, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, 0, 0, canvas.width, canvas.height)
	}
	zoom.oninput = updateSprite
	background.oninput = updateSprite
	spriteInput.onchange = updateSprite
	sprites.onload = updateSprite
	updateSprite()
})