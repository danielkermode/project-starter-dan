const test = require('tape');
const knex = require('../database/config')
const db = require('../database/utils')(knex);

//Only call this in the LAST test, to stop tests hanging and reset db
function cleanUp() {
  knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      knex.destroy();
    })
}

test('add', (t) => {
  const toAdd = { username: 'another', password:'password'};

  knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.seed.run('users');
    })
    .then(() => {
      db.add('users', toAdd, (err, id) => {
        db.findOne('users', { id }, (err, data) => {
          toAdd.id = id;
          t.deepEqual(data, toAdd, 'adds a new user correctly');
          t.end();
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

test('findOne', (t) => {
  const expected = { id: 1, username: 'one', password:'password' };

  knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.seed.run('users');
    })
    .then(() => {
      db.findOne('users', { username: expected.username }, (err, data) => {
        t.deepEqual(data, expected, 'finds a user correctly');
        t.end();
        //Only call this in the LAST test, to stop tests hanging and reset db
        cleanUp();
      });
    })
    .catch(err => {
      console.log(err);
    });
});
