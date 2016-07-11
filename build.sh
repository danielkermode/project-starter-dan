#!/bin/bash
git add .
git commit -m "$1"
npm version patch
npm publish
git push
