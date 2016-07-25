// this is the config for connecting to the POSTGRES databse through knex
// if this file is required connection to Postgres will be open

require('dotenv').config();

const knex = require('knex');

const db = {
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
};

module.exports = knex(db);
