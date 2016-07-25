exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({ username: 'one', password:'password' }),
        knex('users').insert({ username: 'two', password:'password' }),
        knex('users').insert({ username: 'three', password:'password' })
      ]);
    });
};
