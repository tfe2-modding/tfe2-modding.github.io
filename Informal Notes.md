# Informal Nodes

This is a place to dump information about how the game works as you discover it. It does not need to be categorized in any way, and information will be removed from this page as it gets put into a proper documentation page elsewhere.

[Edit this page on the github repo](https://github.com/tfe2-modding/tfe2-modding.github.io/edit/main/Informal%20Notes.md)

## Notes





<!-- PLEASE DO NOT PUT ANY NOTES ABOVE THIS COMMENT -->






to splice up a 4-way merging sprite, the game cuts the sprite into 10x10 chunks on each corner. for example the botanical garden sprite. horizontally merging sprites split the sprite into halves sized 10x20, like the parks and restaurants. vertically i would assume does halves sized 20x10, but `buildingEnableMerging` needs testing

the makeBuilding field `addWindowInfoLines` (function) can be used to add custom text and ui to a building window by referencing `this.city.gui` and the window, make sure you call `Building.prototype.addWindowInfoLines.call(this)` to put the jobs display and such tho

enums like `upgradeDisplayLayer` also need to be documented. this has `Foreground`, `Middle`, and `Background` btw. no idea how many enums there are but its worth documenting the ones that come up prominently in modding stuff

`onModsLoaded` gets passed `game` if i remember correctly and thats not on the official docs.

theres a `ruleset` flag for scenarios now??? theres classes for each ruleset and so far ive only been able to find ones for cityofthekey.json and hippiecommune.json but this might be replacing the hardcoding going on with that possibly

its likely very easy to make a buildable world resource, just create a class copied from an existing one and add an info entry, maybe ill make a helper func for this and stick it into liquid just to prove its possible idk