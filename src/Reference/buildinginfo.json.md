# `buildinginfo.json`

The `buildinginfo.json` file controls what buildings are registered in the game. The structure of this file contains an array of building objects in JSON format. Building objects must have the following keys:

- `className` (string) - The name of the building class created using [ModTools.makeBuilding](https://florianvanstrien.nl/TheFinalEarth2/modding.php#makeBuilding).
- `specialInfo` (array of strings) - An array of strings that specify conditions and properties for buildings.<details><summary>Expand for all special info strings</summary>

	- `"rooftop"` - This building cannot have buildings placed on top of it.
	- `"premium"` - This building is not available in demo or free versions of the game (unused in Steam version).
	- `"unique"` - There can only be one of these buildings placed at a time.
	- `"halloween"` - This building is a halloween building. This changes the tooltip to say "Halloween" with an icon.
	- `"limited"` - Makes this building a limited building. If this is present, you must also have a `"limitedToCitizens:N"` string present or the game will crash.
	- `"limitedToCitizens:N"` - Specifies how many citizens must exist per building to be able to build another. Replace `N` with the desired number. For example, `"limitedToCitizens:1000"` would limit placing this building to only having one for every 1000 citizens.
	- `"disableCopy"` - Disables being able to hold shift + click to copy the building.
	- `"buildOnGround"` - This building must be built on the ground.
	- `"disableInsertReplaceOrBuildOnTop"` - This building cannot have a building inserted directly below it or placed directly on top of it.
	- `"notUniqueIfGalacticLibrary"` - If unique, this building can be built twice if the Galactic Library has been built.
	- `"cityTop"` - This building cannot have anything placed anywhere above it. Used in the rocket.
	- `"as_multi_decor"` - Replaces the standard build button with multiple copies of this building with different sprites in the build menu. Used with the painted blocks, requires additional code to function correctly.
	- `"as_multi_decor_anycolor"` - Replaces the standard build button with a button to pull up a color wheel, specifying the color of the building. Used with the painted blocks, requires additional code to function correctly.
	- `"has_multi_decor_spec"` - Specifies that this building has a multi decor spec. Requires a `"multi_decor_spec:L"` string and a `"as_multi_decor"` string.
	- `"multi_decor_spec:L"` - Sets the sprites replaced by `"as_multi_decor"` with specific sprites in the build menu. Replace `L` with a comma-separated list of sprite names. Used with the decorative windows, requires additional code to function correctly.
	- `"mirrorable"` - This building can be mirrored.

</details>

Additionally, the following keys are optional:

- `name` (string) - The in-game display name for the building. If not provided, the game will auto fill it with the translation key for that building (generally `!!! missing text !!!` for custom buildings).
- `description` (string) - The in-game description of the building. If not provided, the game will auto fill it with the translation key for that building.
- `category` (string) - The name of the category the building should be placed in. If not provided, the building is not present in the build menu.
- `unlockedByDefault` (boolean) - Sets whether or not the building should be automatically unlocked on most saves. This does not apply to scenarios that override unlocks such as A New Beginning. Defaults to false.
- `residents` (number) - The number of citizens that should be able to live in this building. Defaults to 0.
- `jobs` (number) - The number of citizens that should be able to live in this building. Defaults to 0.
- `quality` (number) - The quality of the building, only used when the building has reesidents. Defaults to NaN.
- `showUnlockHint` (string) - The hint to show when the building isn't unlocked, but is visible in the category with a lock icon. When not provided, no hint is displayed.
- `buttonBack` (string) - The sprite to show in the background of the building button in the build menu. Defaults to the part of the building texture that the background is stored on. Typically used in buildings like parks.
- `notUnlockedWithAll` (boolean) - Disables the building from being unlocked automatically in freeplay when "Most Unlocks" is selected.
- `onBuildSprite` (string) - The sprite to use instead of the building on the overlay when the building is selected. If not provided, just uses the building's sprite.
- `teleporterOperatingCost` (number) - The daily operating cost of using the building's teleporter. Used in buildings that have teleporters built in, as well as the actual Teleporter building. Defaults to 0.
- `tooltipBottomIconInfo` (array) - An array of objects that determine icons and text used in the tooltip. Defaults to an empty array. Typically used in buildings that receive boosts or give boosts to other buildings, like the Lab or Graphene Factory. Each sub object must have the following keys:
	- `texture` (string) - The name of the texture to use for the icon.
	- `text` (string) - The text to display next to the icon.

Lastly, a building object can have keys in it to specify how much it costs. These keys correspond to the ids of the materials used to purchase/build it, so modded materials work as keys. If unspecified, they default to 0. The built in ones are as follows:
- `food`
- `wood`
- `stone`
- `knowledge`
- `machineParts`
- `refinedMetal`
- `computerChips`

`buildinginfo.json` can contain any number of buildings in it. Specifying a `className` that already exists will overwrite the properties of that building.

Here's an example of a possible `buildinginfo.json`:

```json
[
    {
        "className": "CorporationOfTheOwl",
        "name": "Corporation of the Owl HQ",
        "description": "They see everything.",
        "food": 50000,
        "wood": 50000,
        "stone": 0,
        "machineParts": 0,
        "refinedMetal": 0,
        "computerChips": 1250,
        "knowledge": 75000,
        "category": "Unique Buildings",
        "unlockedByDefault": false,
        "specialInfo": [
            "unique"
        ],
        "residents": 12,
        "quality": 100,
        "jobs": 12,
        "showUnlockHint": "Build The Machine to unlock!"
    },
    {
        "className": "FunctionalHouse",
        "name": "Functional House",
        "description": "Don't complain, this house is exactly what you need.",
        "food": 0,
        "wood": 0,
        "stone": 10,
        "machineParts": 0,
        "knowledge": 10000,
        "computerChips": 1,
        "category": "Houses",
        "unlockedByDefault": false,
        "specialInfo": [],
        "residents": 10,
        "quality": 35
    }
]
```