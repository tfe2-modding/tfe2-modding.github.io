# Story Goals

This page is <red>extremely unfinished</red> as a lot of the mechanics surrouding goals are very complex and scattered throughout the game's code.

Story goals are the main driving force in a scenario, controlling just about every event that can occur. Therefore, goals objects are extremely complex and can have a number of properties. Each goal object must have the following keys:

- `name` (string) - The ID of the goal. Used to generate translation text for other fields, and to determine the type of goal in some cases. This is also what is saved to keep track of your progress. Specific hard-coded goal types are as follows:
	- `"Win"` - Sets the scenario to having been "won". If a text popup is shown on this goal, it contains a button to start the next scenario.
	- `"NowArrivingRegularly"` - Shows a text popup regardless of if text is specified.
	- `"BuildIndoorFarmAndHouse"` - If this goal is active on the first scenario in the game and 0 normal houses have been built, the normal house cost is reduced to 2 wood and 2 stone.
	- `"Start"` - Is checked in the code, does nothing.
	- `"BuildStoneMine"` - Is checked in the code, does nothing.
	- `"GatherWoodAndStone"` - Is checked in the code, does nothing.
	- `"SpawnMorePeople"` - Is checked in the code, does nothing.
	- `"StoneMineUpgrade"` - Is checked in the code, does nothing.
	- `"Happiness"` - Is checked in the code, does nothing.
	- `"GetMinHappiness"` - Is checked in the code, does nothing.

Additionally, the following keys for a goal are optional:

- `flags` (object of flags) - A list of flags to set, which control different things about how the scenario runs. The following flags are available:
	- `disableDying` (boolean) - Citizens will not die if this flag is enabled.
	- `disableDestroy` (boolean) - You will not be able to destroy any buildings if this is enabled.
	- `happinessEnthusiasmLevel` (number) - <red>Undocumented</red>
	- `hiddenBoost` (boolean) - Gives your citizens a hidden boost in production if this is enabled.
	- `disableRewardedAd` (boolean) - Disables viewing ads to gain boosts if enabled, does nothing on the steam version.
	- `setBuildableAliens` (boolean) - Sets whether or not the "strange force" preventing you from building on certain islands in Hacking Alien Tech is enabled or not.
	- `unlockAchievementWithStoryPrefix` (string) - Unlocks a steam achievement.
	- `ruleset` (string) - <red>Undocumented</red>
	- `disableRocket` (boolean) - Disables building the rocket.
- `text` (string) - The description to use when showing goal text. If provided, will show a text popup upon this goal being activated. Can have a command at the start of it.
- `tldr` (string) - The TL;DR to use for a goal. If provided, the text popup for a goal will have a button to toggle the TL;DR, which shows this text in place of `text`.
- `title` (string) - The title to use when showing goal text. If provided, will show a text popup upon this goal being activated.
- `unlocks` (array of strings) - A list of classNames of buildings to unlock when this goal is activated. Prefixing a className with `buildingUpgrades.` instead unlocks the building upgrade specified, and prefixing it with `worldResources.` unlocks the buildable world resource specified. A string in this array can also be one of the following:
	- `"decorations"` - Unlocks the decorations tab.
	- `"buildingModes"` - Unlocks the building modes tab.
	- `"managementOptions"` - Unlocks management options like following citizens, and the commute explorer.
	- `"customHouses"` - Unlocks custom houses.
- `templocks` (array of strings) - A list of classNames of buildings to lock when this goal is activated. Unlike `unlocks`, this only works with building classNames and `"customHouses"`.
- `researches` (array of strings) - A list of classNames of buildings to research when this goal is activated, removing the initial knowledge cost. Unlike `unlocks`, this only works with building classNames.
- `planning` (array of plans) - <red>Undocumented</red>
- `showTutorial` (number) - Shows tutorial arrows based on the number provided. If not specified, removes the tutorial arrows. Potential values are:
	- `1` - Shows the tutorial arrows for building the woodcutting center.
	- `101` - Shows the tutorial arrows for getting 4 wood and building a stone mine.
	- `2` - Shows the tutorial arrows for reassigning your citizens' jobs and gathering 6 wood and 4 stone.
	- `3` - Shows the tutorial arrows for pointing out the help button, and the highlights for the farm and house.
	- `4` - Shows tutorial arrows for the game speed button.
	- `4001` - Shows tutorial arrows for the invite citizens button.
	- `4002` - Shows the tutorial arrows for the boost button, which isn't shown on the steam version.
- `nextGoal` (string) - The ID of the goal to start after completing the current goal.
- `nextStory` (string) - The ID of the scenario as specified in stories.json to load when the button on the win popup is pressed. Only shows if the goal name is `Win`.
- `subGoals` (array of subgoals) - <red>Undocumented</red>