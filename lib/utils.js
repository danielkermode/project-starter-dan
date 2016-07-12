const file = require('file');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

module.exports = {
  getDirectories,
  copyTemplate,
  saveTemplate,
  checkIsDir
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter((file) => {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function copyTemplate(templateDir, destDir, callback) {
  const adjIgnores = (start) => {
    // because npm changes all gitignores to npm ignores when publishing modules, change these back on copy
    file.walkSync(start, (dirPath, dirs, files) => {
      if(files.includes('.npmignore')) {
        fs.renameSync(path.join(dirPath, '.npmignore'), path.join(dirPath, '.gitignore'));
      }
    })
  };

  fs.copy(templateDir, destDir, (err) => {
    if(err) {
      callback && callback(err);
      return console.error(err);
    }
    adjIgnores(destDir);
    const name = path.basename(templateDir);
    const dest = path.basename(destDir);
    console.log(chalk.green(`Copied template ${chalk.white(name)} into ./${dest}.`));
    callback && callback();
  });
}

function saveTemplate(src, cwd, dirname, callback) {
  const addTemplate = (dirPath) => {
    const destName = path.basename(dirPath);
    const templateDir = path.join(dirname, 'templates', destName);
    const options = {
      //filter out node_modules from the template.
      filter: (name) => {
        return path.basename(name) != 'node_modules';
      }
    };
    fs.copy(dirPath, templateDir, options, (err) => {
      if(err) {
        callback && callback(err);
        return console.error(err);
      }
      console.log(chalk.green(`Added template ${chalk.white(destName)} to usable templates.`));
      callback && callback();
    });
  }

  if(path.isAbsolute(src) && checkIsDir(src)) {
    addTemplate(src);
  } else if(checkIsDir(path.join(cwd, src))) {
    addTemplate(path.join(cwd, src));
  } else {
    console.log(chalk.yellow('Error saving template. Make sure path exists and is a directory.'));
  }
}


function checkIsDir(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
}