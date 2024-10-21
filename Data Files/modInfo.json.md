# modInfo.json

The `modInfo.json` file is an optional file containing a bunch of keys to describe properties of your mod to control things such as js file load order, mod load priority, and general information. The following keys have functionality:

- `loadPriority` (number) - A number to determine the load priority this mod has. Mods with a higher loadPriority will have all their files loaded before mods with a lower loadPriority. You would generally only need to set this if you are making a mod that absolutely must be loaded before or after other mods. Default loadPriority is 0.
- `reverseJSLoadOrder` (boolean) - Whether or not to reverse the order the game loads JavaScript files in. By default, the game loads JavaScript files in alphabetical order, starting in the base directory and then loading the sub-directories. Enabling this reverses this behavior, making the files load in reverse-alphabetical order, starting in the sub-directories and then loading the base directory.

Additionally, you can add as many other keys as you want to this file to allow other mods such as mod menus to get information about yours, such as a version, name, or description.

Here's an example of a `modInfo.json` with the default values:

```json
{
	"loadPriority": 0,
	"reverseJSLoadOrder": false
}
```