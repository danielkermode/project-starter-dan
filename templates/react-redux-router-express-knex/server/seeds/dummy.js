
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({ name: 'a' }),
        knex('users').insert({ name: 'b' }),
        knex('users').insert({ name: 'c' })
      ]);
    });
};
