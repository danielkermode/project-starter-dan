#!/bin/bash
npm version patch
git add .
git commit -m "$1"
git push
npm publish