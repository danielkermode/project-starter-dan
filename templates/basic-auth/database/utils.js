function db(knex) {
  return {
    add: function(table, obj, callback) {
      knex(table).returning('id').insert(obj)
        .then((res) => {
          callback(null, res[0])
        })
        .catch((err) => {
          callback(err, null)
        });
    },

    findOne: function(table, params, callback) {
      knex(table).where(params)
        .then((resp) => {
          callback(null, resp[0]);
        })
        .catch((err) => {
          callback(err, null);
        });
    },
  };
};

module.exports = db;
