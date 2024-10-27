# buildingCategoriesInfo.json

The `buildingUpgradesInfo.json` file contains a list of building upgrades to be added to the game. The structure of this file contains an array of objects in JSON format. These objects must have the following keys:

- `className` (string) - The name of the upgrade class created using [ModTools.makeBuildingUpgrade](https://florianvanstrien.nl/TheFinalEarth2/modding.php#makeBuildingUpgrade).

Additionally, the following keys are optional:

- `unlockedByDefault` (boolean) - Sets whether or not the upgrade should be automatically unlocked. Defaults to true.
- `notUnlockedWithAll` (boolean) - Disables the upgrade from being unlocked automatically in freeplay when "Most Unlocks" is selected.
- `name` (string) - The in-game display name for the upgrade. If not provided, the game will auto fill it with the translation key for that upgrade (generally `!!! missing text !!!` for custom upgrades).
- `description` (string) - The in-game description of the upgrade. If not provided, the game will auto fill it with the translation key for that upgrade.

Lastly, an upgrade object can have keys in it to specify how much it costs. These keys correspond to the ids of the materials used to purchase/build it, so modded materials work as keys. If unspecified, they default to 0. The built in ones are as follows:
- `food`
- `wood`
- `stone`
- `knowledge`
- `machineParts`
- `refinedMetal`
- `computerChips`
- `graphene`
- `rocketFuel`
- `cacao` (unused)
- `chocolate` (unused)

`buildingUpgradesInfo.json` can contain any number of upgrades in it. Specifying a `className` that already exists will overwrite the properties of that upgrade.

Here's an example of a possible `buildingUpgradesInfo.json`:

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