#!/usr/bin/env node

const ncp = require('ncp').ncp;
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

ncp.limit = 16;

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter((file) => {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function copyTemplate(name, dest) {
  ncp(__dirname + '/templates/' + name, process.cwd() + '/' + dest, (err) => {
    if(err) {
      return console.error(err);
    }
    console.log(chalk.green(`Copied template ${chalk.white(name)} into ./${dest}.`));
  });
}

function argHandler(templates, args) {
  if(!templates.includes(args[2])) {
    switch(args[2]) {
      default:
        console.log();
        console.log(chalk.green('   usage: project-starter [template] [yourdirname]'));
        console.log();
        console.log(chalk.yellow('   Without any arguments, project-starter will prompt for a template to use.'));
        console.log(chalk.yellow('   With [template], project-starter will copy the template into the current dir.'));
        console.log(chalk.yellow('   With [yourdirname], project-starter will give the new folder the specified name.'));
        console.log();
        break;
    }
  } else {
    // template requested exists, copy template into either given name or default name
    args[3] ? copyTemplate(args[2], args[3]) : copyTemplate(args[2], args[2]);
  }
}

const args = process.argv;

const templates = getDirectories(__dirname + '/templates');

if(!args[2] && !args[3]) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Pick a template.',
      choices: templates
    },
    {
      type: 'input',
      name: 'projName',
      message: 'What\'s your project called?'
    }
  ]).then((answers) => {
    //console.log(JSON.stringify(answers, null, '  '));
    copyTemplate(answers.template, answers.projName);
  });

} else {
  argHandler(templates, args);
}



