#!/bin/bash

echo 'Removing ./dist'
rm -rf build/

echo 'Building...'
npm run build

echo 'Done'
