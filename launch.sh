#!/bin/bash

gnome-terminal -- bash -c "gnome-terminal --tab -- bash -c 'tsc --watch; bash';gnome-terminal --tab -- bash -c 'watchify ./js/src/API/snakes/main.js -o ./js/src/API/snakes/bundle.js; bash' && exit; bash"
kill -9 $PPID

# gnome-terminal -- bash -c "<my command or script>; bash"

# tsc --watch
# watchify ./src/public/main.js -o dist/bundle.js