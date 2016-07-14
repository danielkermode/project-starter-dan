const test = require('tape');
const dircompare = require('dir-compare');
const lib = require('../lib/utils');
const tmp = require('tmp');
const path = require('path');
const fs = require('fs-extra');

tmp.setGracefulCleanup();

test('getDirectories', (t) => {
  const dummy = tmp.dirSync({
    dir: __dirname
  });
  let dirs = [];
  for(let i = 0; i < 3; i++) {
    dirs.push(tmp.dirSync({
      dir: dummy.name
    }));
  }
  const expected = dirs.map(each => path.basename(each.name));
  const result = lib.getDirectories(dummy.name);
  result.forEach(res => {
    t.ok(expected.includes(res), 'directory name is correct');
  })
  t.equal(result.length, expected.length, 'returns an array with correct number of directories');
  t.end();
});

test('copyTemplate', (t) => {
  const dummy = tmp.dirSync({
    dir: __dirname,
    unsafeCleanup: true
  });

  const dummyFile = tmp.fileSync({
    dir: dummy.name,
    unsafeCleanup: true
  });

  const dummyIgnore = path.join(dummy.name, '.npmignore');
  const dummyPackage = path.join(dummy.name, 'package.json');
  fs.writeFileSync(dummyIgnore, 'dummydata', 'utf8');

  fs.writeFileSync(dummyPackage, JSON.stringify({}), 'utf8');

  const dest = tmp.dirSync({
    dir: __dirname,
    unsafeCleanup: true
  });

  const dummyJson = { author: 'dank' };

  lib.copyTemplate(dummy.name, dest.name, dummyJson, (err) => {
    if(err) return console.error(err);
    const packageJson = require(path.join(dest.name, 'package.json'));
    t.deepEqual(packageJson, dummyJson, 'package.json is updated correctly');
    t.throws(() => fs.statSync(path.join(dest.name, '.npmignore')), 'trying to get .npmignore in new dir should throw');
    t.ok(fs.statSync(path.join(dest.name, '.gitignore')).isFile(), '.gitignore file should now exist in new dir');
    dircompare.compare(dummy.name, dest.name)
      .then((res) => {
        t.ok(res.equal, 'copies a directory into correct directory');
        t.end();
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

test('checkIsDir', (t) => {
  const dummy = tmp.dirSync({
    dir: __dirname,
    unsafeCleanup: true
  });

  t.ok(lib.checkIsDir(dummy.name), 'identifies a directory correctly');

  const notDir = tmp.dirSync({
    dir: __dirname,
    unsafeCleanup: true
  });

  fs.removeSync(notDir.name);
  t.notOk(lib.checkIsDir(notDir.name), 'gives false for non-existent dirs');
  t.notOk(lib.checkIsDir(path.join(__dirname, 'package.json')), 'doesn\'t give a false positive for files');
  t.end();
});

test('saveTemplate', (t) => {
  const dummy = tmp.dirSync({
    dir: __dirname,
    unsafeCleanup: true
  });

  fs.mkdirSync(path.join(dummy.name, 'templates'));

  const dummyTemplate = tmp.dirSync({
    dir: path.join(dummy.name),
    unsafeCleanup: true
  });

  const dummyFile = tmp.fileSync({
    dir: dummyTemplate.name,
    unsafeCleanup: true
  });

  fs.mkdirSync(path.join(dummyTemplate.name, 'node_modules'));

  const dummyNodeModule = tmp.fileSync({
    dir: path.join(dummyTemplate.name, 'node_modules'),
    unsafeCleanup: true
  });

  const newTemplate = path.join(dummy.name, 'templates', path.basename(dummyTemplate.name));

  lib.saveTemplate(dummyTemplate.name, dummy.name, dummy.name, (err) => {
    if(err) return console.error(err);
    t.throws(() => fs.statSync(path.join(newTemplate, 'node_modules')),
      'trying to get node_modules in new dir should throw');
    dircompare.compare(dummyTemplate.name, newTemplate)
      .then((res) => {
        t.ok(res.equal, 'copies a directory into correct directory');
        t.end();
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
