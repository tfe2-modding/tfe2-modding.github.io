# `buildingCategoriesInfo.json`

The `buildingCategoriesInfo.json` file contains a list of building categories to be added to the game. The structure of this file contains an array of objects in JSON format. These objects must have the following keys:

- `name` (string) - The name to use when referencing the category in [buildinginfo.json](buildinginfo.json.html).
- `image` (string) - The name of the sprite to display for this category.

Additionally, the following keys are optional:

- `displayName` (string) - The name to display ingame when hovering over this category. If not provided, defaults to the translation key associated with `name` (generally `!!! missing text !!!` for custom categories).
- `description` (string) - The description to display ingame when hovering over this category. If not provided, defaults to the translation key associated with `name`.

Here's an example of a possible `buildingCategoriesInfo.json`:

```json
[
	{
		"displayName": "Magic",
		"description": "Build magical buildings to generate mana.",
		"name": "magic",
		"image": "spr_icon_magic"
	},
	{
		"displayName": "Alchemy",
		"description": "Conduct research and transform materials.",
		"name": "alchemy",
		"image": "spr_icon_potion"
	}
]
```