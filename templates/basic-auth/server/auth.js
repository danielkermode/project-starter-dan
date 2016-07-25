const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../database/config');
const db = require('../database/utils')(knex);
const bcrypt = require('bcryptjs');
require('dotenv').config();

function setup() {
  const strategy = new LocalStrategy((username, password, done) => {
    db.findOne('users', { username }, (err, user) => {
      if(!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, res) => {
        return done(null, res && user);
      });
    });
  });

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.findOne('users', { id }, (err, user) => {
      return done(null, user);
    });
  });
};

module.exports = setup;