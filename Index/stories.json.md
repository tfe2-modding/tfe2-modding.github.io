# `stories.json`

The `stories.json` file contains a list of custom scenarios to be added to the game. It does not contain the definition for any of the scenarios, this just registers them on the list in-game. The structure of this file contains an array of objects in JSON format. These objects must have the following keys:

- `link` (string) - The file name in the `stories` folder without the `.json` extension that contains a [custom scenario](Custom%20Scenario%20JSON.html)

Additionally, the following keys are optional:

- `freePlay` (boolean) - If set to true, places this scenario under the free play section of the list and shows the free play customization menu when selected.
- `unlockedWithAll` (boolean) - If set to true, should unlock this scenario by default if the player clicked "Played Before" when booting the game for the first time.
- `requirements` (array of strings) - A list of scenarios or conditions that must be satisfied in order for this scenario to show up on the list. Each string can be the `link` of another scenario or one of the following special strings:
	- `isSnow` - Only shows up near December.
	- `notDemo` - This scenario is not available in demo or free versions of the game (unused in Steam version).
	- `premium` - This scenario is not available in demo or free versions of the game (unused in Steam version).
	- `fullVersion` - Completely unused, does nothing.

`stories.json` can contain any number of scenarios in it. Specifying a `link` that already exists will overwrite the properties of that scenario.

Here's an example of a possible `stories.json`:

```json
[
	{
		"link": "computerization",
		"requirements": [
			"hackersandaliens"
		],
		"unlockedWithAll": true
	},
	{
		"link": "advancedTechnology",
		"requirements": [
			"computerization"
		]
	}
]
```