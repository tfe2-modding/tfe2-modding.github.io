# Custom Scenario JSON

Custom scenarios are quite complex, and not everything has been fully found out/documented yet.

A custom scenario is a JSON file with a name corresponding with the link in `stories.json`, and places in a sub-folder named `stories`. Each custom scenario contains a single object file defining everything in that scenario. A scenario object must have the following keys:

- `startGoal` (string) - The name of the start goal to use for the scenario. You can leave it blank to not start a goal, or if the goals array is empty.
- `initialMaterials` (object of strings) - A list of the materials to start with in the scenario and how much to start with. These keys correspond to the ids of the materials. If unspecified, they default to 0. The built in ones are as follows:
	- `food`
	- `wood`
	- `stone`
	- `knowledge`
	- `machineParts`
	- `refinedMetal`
	- `computerChips`
- `viewYFromBottom` (number) - The lowest Y position you can scroll and place floating platforms in your city.
- `worlds` (array of world objects) - A list of floating islands for the scenario to create.

	<details>
	<summary>Expand for more info.</summary>

	Each world object specifies a floating island in the scenario, and must have the following keys:

	- `rect` (object) - The position and size of the island.

		- `x` (number) - The x position to place the island at. Should be a multiple of 20 to align with the grid, otherwise things get weird.
		- `y` (number) - The y position to place the island at. Should be a multiple of 20 to align with the grid, otherwise things get weird.
		- `width` (number) - The width of the island. MUST be a multiple of 20, or the game will crash.
		- `height` (number) - The height of the island in pixels.

		Each number here is in pixels not tiles. Each tile is 20 pixels wide and tall.

	- `seed` (number) - The seed to use when generating the image for the island. Using the same seed will generate the same island structure.
	- `worldResources` (array of objects) - A list of the world resources to place into the world.

		- `position` (integer) - The position in tiles to place this resource.
		- `className` (string) - The `className` of the corresponding world resource as defined in [buildableWorldResourcesInfo.json](buildableWorldResourcesInfo.json.html)

		World resources place directly on the ground, regardless of anything else placed in the same position.

	- `buildingStacks` (array of objects) - A list of the building stacks to place into the world.

		- `position` (integer) - The position in tiles to place this building stack.
		- `classNames` (array of strings) - The `className` of the corresponding buildings as defined in [buildinginfo.json](buildinginfo.json.html)

		Building stacks will place directly on the ground unless there is a world resource in the same position. If a building stack is going to overlap a world resource, it places one tile higher. Building stacks place their buildings starting with the first building in the list as the bottom of the stack.

	- `citizens` (array of objects) - A list of the citizen groups to spawn into the world.

		- `amount` (integer) - The number of citizens to spawn.
		- `ageRangeMin` (number) - The minimum age a citizen can spawn as.
		- `ageRangeMax` (number) - The maximum age a citizen can spawn as.
		- `minX` (number) - The minimum x position a citizen can spawn at in pixels.
		- `maxX` (number) - The maximum x position a citizen can spawn at in pixels.

		Citizens spawn directly on the ground. The game will choose a random age between `ageRangeMin` and `ageRangeMax` for each citizen, and spawns them randomly between `minX` and `maxX` on the x position.

	- `decoration` (string) - The sprite name for the decoration to place on every remaining empty spot on the island.
	- `appearance` (string) - Changes the color and style of the island. Existing valid values are:
		- `key`
		- `key2`
		- `snow`
		- `rock`
		- `rock:lessJagged`

	Additionally, the following keys for worlds are optional:

	- `decorations` (array of objects) - A list of decorations to place at specific positions in the world.
	
		- `position` (integer) - The position in tiles to place this decoration.
		- `spriteName` (string) - The decoration sprite to place at that position.
	
	- `protectedKey` (boolean) - If set to true, you will not be able to destroy buildings related to the Secret Society of the Key.

	</details>

- `goals` (array of goal objects) - EACH GOAL NEEDS DOCUMENTATION. WILL DO LATER.

Additionally, the following keys for scenarios are optional, but need more documentation on what they do:

- `lockPermanents` (array of strings) - list of building classes that are locked on start
- `viewStartX` (number) - x pos camera starts at
- `useInviteCitizens` (boolean) - can you invite citizens or not
- `backgroundSprites` (list of objects) - planets. not restricted to just that tho, sprite can be anything
	- `sprite` (string) - sprite name
	- `width` (number) - width of sprite
	- `image` (number) - image index if its a sprite sheet
	- `x` (number) - xpos
	- `y` (number) - ypos
	- `velocity` (number) - number that makes it move, idk what scale its on
- `name` (string) - name of scenario? idk what its used for
- `viewYMobi` (number) - my guess is `viewYFromBottom` mobile override
- `isFreePlay` (boolean) - is it free play mode, no idea how this influences the free play window
- `generatorScripts` (array of objects) - giant object that controls completely random island generation.

	<details><summary>heres the type object i generated</summary>

	```json
	"?generatorScripts[]": {
		"name": "string",
		"args": {
			"numberOfWorldsMin": "number",
			"numberOfWorldsMax": "number",
			"minX": "number",
			"minY": "number",
			"maxX": "number",
			"maxY": "number",
			"minWidth": "number",
			"maxWidth": "number",
			"minHeight": "number",
			"maxHeight": "number",
			"heightVariation": "number",
			"initialBuildings[]": {
				"className": "string",
				"numberMin": "number",
				"numberMax": "number"
			},
			"initialWorldResources[]": {
				"className": "string",
				"numberMin": "number",
				"numberMax": "number"
			},
			"spreadBuildingsEvenlyBetweenWorlds": "boolean",
			"spreadWorldResourcesEvenlyBetweenWorlds": "boolean",
			"rememberWorldSpreadBetweenBuildingsAndWorldResources": "boolean",
			"avoidGeneratingOverfullWorlds": "boolean"
		}
	}
	```

	</details>

- `extraResourcesDisabled` (boolean) - no clue
- `mobileViewStartX` (number) - `viewStartX` override for mobile
- `lockAllPermanents` (boolean) - does the thing from scenario 1 where it hides every category
- `speedUpStartNights` (boolean) - makes the nights at the start of the game faster, also used in scenario 1

Here is an example scenario taken from the Free Play Mini World scenario:

```json
{
    "goals": [
        {
            "name": "FreePlayStart",
            "title": "",
            "text": "Welcome to this Free Play Scenario!\nA few citizens are already here. Some more will arrive over the coming days.",
            "quickText": "",
            "nextGoal": "",
            "subGoals": [],
            "planning": [
                {
                    "type": "ScriptedStoryPart",
                    "className": "SpawnCitizensRegularly",
                    "spawnNumber": 100,
                    "time": 0,
                    "groupSizeMin": 2,
                    "groupSizeMax": 3,
                    "ageRangeMin": 18,
                    "ageRangeMax": 40,
                    "world": 0,
                    "timeBetweenMin": 15,
                    "timeBetweenMax": 25,
                    "afterDoneMessage": "All the people from your ship have now arrived. Of course, your population can still grow through their offspring."
                }
            ]
        }
    ],
    "startGoal": "FreePlayStart",
    "lockPermanents": [],
    "worlds": [
        {
            "rect": {
                "x": 100,
                "y": 160,
                "width": 260,
                "height": 60
            },
            "seed": 2000,
            "worldResources": [
                { "position": 2, "className": "AlienRuins" },
                { "position": 5, "className": "AlienRuins" },
                { "position": 7, "className": "AlienRuins" },
                { "position": 10, "className": "AlienRuins" }
            ],
            "buildingStacks": [
                { "position": 0, "classNames": ["FuturisticHome", "FuturisticHome", "FuturisticHome", "FuturisticHome", "FuturisticHome", "LandingSite"] },
                { "position": 1, "classNames": ["StoneMine", "StoneMine", "StoneMine"] },
                { "position": 2, "classNames": ["StoneTeleporter", "LandedExplorationShip"] },
                { "position": 3, "classNames": ["StoneMine", "StoneMine", "StoneMine"] },
                { "position": 4, "classNames": ["FuturisticHome", "FuturisticHome", "FuturisticHome", "FuturisticHome", "LandingSite"] },
                { "position": 5, "classNames": ["GrapheneLab", "LandingSite"] },
                { "position": 6, "classNames": ["GrapheneLab", "GrapheneLab", "GrapheneLab", "LandingSite"] },
                { "position": 7, "classNames": ["GrapheneLab", "LandingSite"] },
                { "position": 8, "classNames": ["FuturisticHome_mirrored", "FuturisticHome_mirrored", "FuturisticHome_mirrored", "FuturisticHome_mirrored", "LandingSite"] },
                { "position": 9, "classNames": ["MachinePartsFactory", "StoneMine", "StoneMine"] },
                { "position": 10, "classNames": ["StoneTeleporter", "LandedExplorationShip_mirrored"] },
                { "position": 11, "classNames": ["StoneMine", "StoneMine", "MachinePartsFactory"] },
                { "position": 12, "classNames": ["FuturisticHome_mirrored", "FuturisticHome_mirrored", "FuturisticHome_mirrored", "FuturisticHome_mirrored", "FuturisticHome_mirrored", "LandingSite"] }
            ],
            "citizens": [
                { "amount": 40, "ageRangeMin": 20, "ageRangeMax": 25, "minX": 0, "maxX": 230 }
            ]
        }
    ],
    "initialMaterials": {
        "food": 1000,
        "stone": 2000,
        "wood": 999,
        "knowledge": 100,
        "machineParts": 1000,
        "refinedMetal": 0,
        "computerChips": 0,
        "graphene": 100
    },
    "viewYFromBottom": 270,
    "extraResourcesDisabled": true,
    "useInviteCitizens": true,
    "isFreePlay": true,
    "backgroundSprites": [
        {
            "sprite": "spr_planets_small",
            "width": 40,
            "image": 1,
            "x": 200,
            "y": 500,
            "velocity": 0.3
        },
        {
            "sprite": "spr_planets_small",
            "width": 40,
            "image": 3,
            "x": 300,
            "y": -200,
            "velocity": 0.5
        },
        {
            "sprite": "spr_planets_small",
            "width": 40,
            "image": 2,
            "x": -200,
            "y": 30,
            "velocity": -0.6
        },
        {
            "sprite": "spr_planets_big",
            "width": 100,
            "image": 1,
            "x": -400,
            "y": -180,
            "velocity": 1.2
        },
        {
            "sprite": "spr_planets_bigger",
            "width": 120,
            "image": 0,
            "x": 600,
            "y": -340,
            "velocity": -0.4
        },
        {
            "sprite": "spr_planets_big",
            "width": 100,
            "image": 6,
            "x": -400,
            "y": 350,
            "velocity": 0.63
        },
        {
            "sprite": "spr_planets_bigger",
            "width": 120,
            "image": 2,
            "x": 800,
            "y": 440,
            "velocity": 0.5
        },
        {
            "sprite": "spr_planet_ring_big",
            "width": 277,
            "image": 0,
            "x": 200,
            "y": -900,
            "velocity": 0.55
        },
        {
            "sprite": "spr_planets_small",
            "width": 40,
            "image": 0,
            "x": -900,
            "y": -500,
            "velocity": 0.1
        },
        {
            "sprite": "spr_planets_medium",
            "width": 80,
            "image": 0,
            "x": -900,
            "y": -500,
            "velocity": 0.1
        }
    ]
}
```