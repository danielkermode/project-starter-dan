
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').then(() => {
    //console.log('users table was dropped');
  });
};
