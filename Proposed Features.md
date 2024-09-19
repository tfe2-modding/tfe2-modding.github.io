# Proposed Features

This page is for proposed extensions, functions, and features of the current modding API. If you have ideas for a new feature, you can make a pull request to add it to this page, so long as there is a clear reason why it is being added.

This page is split into 3 sections: Propositions, Accepted, and Rejected. Everything in Accepted is something that the developer of the game has confirmed will be coming in a future update, and everything in Rejected is something that the developer has stated will not be added. The rest of the unconfirmed ideas are placed in Propositions.

## Propositions

### `buildinginfo.json` and `buildingUpgradesInfo.json` key for spriteName

This would add a new optional key to an entry in `buildinginfo.json` and `buildingUpgradesInfo.json` to specify the spriteName, which would normally be provided in the `ModTools.makeBuilding` or `ModTools.makeBuildingUpgrade`. The advantage of this is consistency with other data files that specify texture or sprite data.

### `materialsInfo.json`

This would be a new file that is an array of objects with the following properties:

- `variableName` (string) - Specifies the variable name in the code.
- `displayName` (string) optional - Specifies the in-game display name, would default to the translation key for `variableName` (`!!! missing text !!!` most likely)
- `description` (string) optional - Specifies the in-game description, would default to the translation key for `variableName` (`!!! missing text !!!` most likely)
- `unlockedByDefault` (boolean) optional - Specifies whether this material should be visible on the materials list by default. Defaults to true.
- `spriteName` (string) optional - A string to specify for the sprite used ingame to display the resource. Defaults to `spr_resource_varName`, where varName should be equal to the provided varName

Materials could be added automatically from data files, or if a tooltipExt override (or other potential overrides like when to turn the text red, or what text to display) are required, a `ModTools.makeMaterial(varName, fields)` could be added to be consistant with the rest of the maker functions (the `ModTools.addMaterial` function would be preserved). The advantage of this would be to allow data files for materials similar to other data files ingame, as well as providing extra functionality that cannot be achieved right now.

### Mod event system

This would add two new functions, `ModTools.addListener(eventType: string, callback: any->void)`, `ModTools.removeListener(callback: any->void)`, `ModTools.hasListener(callback: any->void)` and `ModTools.emit(eventType: string, data: any)`. Any file could register a listener under an eventType, and running `ModTools.emit` would run all functions associated with the same eventType. The advantage of this being allowing mods to communicate with each other, as well as to communicate with themselves in certain scenarios. For example, a global event sending a message to all buildings to update some property within them, or one mod waiting on another mod to send some data over to finish loading.

### `maxCount` key in `buildinginfo.json`

This would add a new optional `maxCount` key to `buildinginfo.json` that takes in a number. Whatever `maxCount` is set to is the maximum of that type of building you are allowed to build. The advantage of this being it's a new feature.

### `cost` key in relevant data files.

This would add a new optional `cost` key to the following files:

- `buildinginfo.json`
- `buildingUpgradesInfo.json`
- `bridgesInfo.json`
- `decorationsInfo.json`
- `buildableWorldResourcesInfo.json`
- `cityUpgradesInfo.json`
- `policiesInfo.json`

The `cost` key would contain an object that holds keys corresponding to the material costs of the respective object. If a `cost` key exists, the game should ignore any material keys present in the base structure of the file. If a key exists in the `cost` object that is not a valid material, the game should throw an error or show a notification. The advantages of this are to prevent naming clashes with material names and preexisting keys, provide a slightly cleaner data structure, and prevent misspellings of material names not notifying the programmer of what went wrong.

## Accepted

### `ModTools.onCityCreate(callback: city->void)`

This function would run whenever a city is created, allowing for initialization to happen. The advantage of this is not needing to try and extend the constructor for the City class.

**Accepted**: Feature will be included in the next update.

## Rejected

### `buildinginfo.json` key for upgrades

This would add a new optional key to an entry in `buildinginfo.json` where you could specify a static list of upgrades that were always available. The advantage of this is to provide simplicity for less complex mods as the only way to add upgrades currently is to make a custom field when using `ModTools.makeBuilding`

**Reason for rejection**: `ModTools.addUpgradeToBuilding(buildingClass, upgradeClass)` is being added in the next update.
