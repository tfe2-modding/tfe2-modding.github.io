# Proposed Features

This page is for proposed extensions, functions, and features of the current modding API. If you have ideas for a new feature, you can make a pull request to add it to this page, so long as there is a clear reason why it is being added.

This page is split into 3 sections: Propositions, Accepted, and Rejected. Everything in Accepted is something that the developer of the game has confirmed will be coming in a future update, and everything in Rejected is something that the developer has stated will not be added. The rest of the unconfirmed ideas are placed in Propositions.

## Propositions



## Accepted



## Rejected

### `buildinginfo.json` key for upgrades

This would add a new optional key to an entry in `buildinginfo.json` where you could specify a static list of upgrades that were always available. The advantage of this is to provide simplicity for less complex mods as the only way to add upgrades currently is to make a custom field when using `ModTools.makeBuilding`

**Reason for rejection**: `ModTools.addUpgradeToBuilding(buildingClass, upgradeClass)` is being added in the next update.
