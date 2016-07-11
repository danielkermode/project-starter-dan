#!/usr/bin/env node

const ncp = require('ncp').ncp;

ncp.limit = 16;

function copyTemplate(name, dest) {
  ncp(__dirname + '/templates/' + name, process.cwd() + '/' + dest, (err) => {
    if(err) {
      return console.error(err);
    }
    console.log('done!');
  });
}

const args = process.argv;

if(!args[2] || !args[3]) {
  console.log('   usage:\n');
  console.log('     project-starter <template> <yourdirname>');
} else {
  copyTemplate(args[2], args[3]);
}
