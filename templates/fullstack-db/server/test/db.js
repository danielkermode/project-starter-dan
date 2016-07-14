const test = require('tape');
const knex = require('../database/config').db;
const db = require('../database/utils')(knex);

test('getAll', (t) => {
  const expected = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' }
  ];

  knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.seed.run('dummy');
    })
    .then(() => {
      db.getAll('users', (err, data) => {
        t.deepEqual(data, expected, 'gets all data from users table');
        t.end();
        knex.destroy();
      })
    })
    .catch(err => {
      console.log(err);
    })
});

