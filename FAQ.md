# FAQ

## Is this official?

> No. This documentation is created and maintained by community members. As such it may contain inaccuracies. If you find something that isn't correct, feel free to submit an issue or a pull request on the [GitHub repository](https://github.com/tfe2-modding/tfe2-modding.github.io) for this site. An official guide written by the developer himself can be found [here](https://florianvanstrien.nl/TheFinalEarth2/modding.php).

## Do I need to know how to code to make a mod?

> This depends on the type of mod you are making, but most likely the answer is yes. Mods for the game are written in JavaScript, and you will need to know how the game works as well as how to program in JavaScript in order to do anything remotely complex. You can find the game's files by going to the Steam library page, clicking on the settings icon, clicking Manage, and hitting browse local files, or by going to `C:\Program Files (x86)\Steam\steamapps\common\The_Final_Earth_2` in the file explorer. All the important code can be found in the `game` folder.

## Where is the code for the mod I installed via the Steam Workshop?

> `C:\Program Files (x86)\Steam\steamapps\workshop\content\1180130\`

## Is it possible to mod the mobile version of the game.

> No.

## How do I open the developer console?

> Press Ctrl + F12. You can also quick reload the game by pressing Ctrl + F5, ~~and you will activate infinite resources by pressing Alt + F4~~.

## The game froze and nothing is happening.

> Open the developer console and check for error messages. Make sure you have the console tabs selected.

## I created a mod but now it won't start the game...

> ### It freezes on the loading screen.

>> Check the formatting of your JSON files. You may have a misplaced comma, a missing quote, or some other syntax error.

> ### It freezes on a black screen with stars in the corner.

>> If you have city creation code, wrap any code you have written to start on city create in a try-catch, and have the catch log the error. Currently if your code errors during the initial title screen process, the game will not output the error message unless you explicitly tell it to.

>> If you made a custom building, check that the `className` matches up with what you put in [buildinginfo.json](DataFiles/buildinginfo.json.html).

> ### It freezes on a city that doesn't have an island.

>> Similar case to the previous one, except this one is on city update code. This *should* be outputting an error message, but sometimes it still won't, so do the same thing.

> ### The window stops responding and my computer's fans start spinning a bunch.

>> You have an infinite loop somewhere. Check to make sure that your for-loops are using the correct variable names, that your while-loops are ending at some point, and that you haven't accidentally caused infinite recursion.

## I got an error complaining about an unknown variable `city`

> `city` is not a global variable, you can obtain it from callbacks in `onCityUpdate`, `onCityCreate`, `onLoadStart`, and others.

## I got an error complaining about an unknown variable `game`

> Same deal, `game` is not a global variable. If you really need it, you can get it from doing `city.game` or from the callback in `onModsLoaded`.

## My audio files won't load

> By default the game does not support loading audio files. You will need to rely on another mod to do it for you, or you will need to do it yourself.

## What do I do if I have a question I think should be on this page?

> If it's rather specific or situational, join the official [Florian's Games Discord server](https://discord.gg/r4H25JM) and ask in the #modding channel. Otherwise, create an issue on the [GitHub repository](https://github.com/tfe2-modding/tfe2-modding.github.io) about it (or add it yourself in a pull request).