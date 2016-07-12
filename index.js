#!/usr/bin/env node
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const lib = require('./lib/utils');

const args = process.argv;
const templates = lib.getDirectories(path.join(__dirname, 'templates'));

function argHandler(templates, args) {
  if(!templates.includes(args[2])) {
    switch(args[2]) {
      case 'add':
        if(args[3]) {
          lib.saveTemplate(args[3], process.cwd(), __dirname);
        } else {
          help();
        }
        break;
      default:
        help();
        break;
    }
  } else {
    // template requested exists, copy template into either given name or default name
    const templateDir = path.join(__dirname, 'templates', args[2]);
    const destDir = path.join(process.cwd(), args[3] ? args[3] : args[2]);
    lib.copyTemplate(templateDir, destDir);
  }
}

function help() {
  console.log();
  console.log(chalk.green('   usage: dank [template] [yourdirname]'));
  console.log(chalk.green('          dank add <yourdirname>'));
  console.log();
  console.log(chalk.yellow('   Without any arguments, dank will prompt for a template to use.'));
  console.log(chalk.yellow('   With [template], dank will copy the template into the current dir.'));
  console.log(chalk.yellow('   With [yourdirname], dank will give the new folder the specified name.'));
  console.log();
  console.log(chalk.yellow('   add <yourdirname> will add your (relative or absolute) dir to the usable templates.'));
  console.log();
}

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
    const templateDir = path.join(__dirname, 'templates', answers.template);
    const destDir = path.join(process.cwd(), answers.projName);
    lib.copyTemplate(templateDir, destDir);
  });

} else {
  argHandler(templates, args);
}
