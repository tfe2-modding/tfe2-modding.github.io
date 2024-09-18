# `decorationsInfo.json`

The `decorationsInfo.json` file contains a list of decorations, such as grass and small rocks, to be added to the build menu. The structure of this file contains an array of objects in JSON format. These objects must have the following keys:

- `textureName` (string) - The name of the sprite to display for this decoration. If the value provided is `spr_removedecoration`, this functions as removing a decoration from the map.
- `category` (string) - The name of the category the decoration should be placed in. If not provided, the decoration is not present in the build menu. Because decorations have no class associated with them, this makes the entire entry useless, so even though the game will technically run this key is required.

Additionally, the following keys are optional:

- `specialInfo` (array of strings) - An array of strings that specify conditions and properties for decorations. Defaults to an empty array.
	- `"geneEditingReq"` - This decoration is only available if you have unlocked gene editing.
	- `"snow"` - This decoration is only available in snow themed scenarios.
- `isRemoveDecoration` (boolean) - Gives it the remove decoration description.
- `name` (string) - The in-game display name for the decoration. If not provided, the game will auto fill it with the translation key for that buidecorationldecorationding (generally `!!! missing text !!!` for custom decorations).
- `description` (string) - The in-game description of the decoration. If not provided, the game will not display a description.

Lastly, a decoration object can have keys in it to specify how much it costs. These keys correspond to the ids of the materials used to purchase/build it, so modded materials work as keys. If unspecified, they default to 0. The built in ones are as follows:
- `food`
- `wood`
- `stone`
- `knowledge`
- `machineParts`
- `refinedMetal`
- `computerChips`

`decorationsInfo.json` can contain any number of decorations in it. Specifying a `textureName` that already exists will NOT overwrite the properties of that decoration, instead it will add a duplicate.

Here's an example of a possible `decorationsInfo.json`:

```json
[
    {
        "textureName": "spr_grass",
        "food": 0,
        "wood": 1,
        "stone": 0,
        "machineParts": 0,
        "knowledge": 0,
        "category": "Decoration & Nature"
    },
    {
        "textureName": "spr_redgrass",
        "food": 0,
        "wood": 1,
        "stone": 0,
        "machineParts": 0,
        "knowledge": 0,
        "category": "Decoration & Nature",
        "specialInfo": ["geneEditingReq"]
    },
    {
        "textureName": "spr_lanterns",
        "food": 0,
        "wood": 0,
        "stone": 5,
        "machineParts": 0,
        "knowledge": 0,
        "category": "Decoration & Nature",
        "specialInfo": ["snow"]
    }
]
```