#!/bin/bash

set -e

start=$(pwd)

cd ../scratch-gui
npm run build

cd $start
mkdir -p in
cp -r ../scratch-gui/translations/messages/src/ in

node scripts/load-from-scratch-gui.js
