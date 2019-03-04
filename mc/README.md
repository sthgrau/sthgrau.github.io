On Imgur, I saw a post suggesting to start up Map Crunch, select a random place and try to find the airport.

I wanted to be able to map my progress to see afterwards how good/bad I did. This is the result of that.

There are just a couple features:
* it automatically hides the location
* keeps track of coordinates in localstorage
* has a convenient button to copy location information to clipboard

One limitation is a single trip only. When you click the "Go" button, it reinitializes the localstorage, so any existing trip information is deleted.

The path information was set to match the requirements for GPS Visualizer (http://www.gpsvisualizer.com/map_input), just copy the trip information into the "paste your data here" textarea on the right side, the click the "Draw the map" button.


Installation:
Install a user-script add-on, if necessary (ie Greasemonkey for Firefox or Tampermonkey for Chrome)
Go to: https://sthgrau.github.io/mc/track.user.js
This should prompt to install the script.
