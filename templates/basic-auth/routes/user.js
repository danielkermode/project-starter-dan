const express = require('express');
const router = express.Router();
const knex = require('../database/config');
const db = require('../database/utils')(knex);
const bcrypt = require('bcryptjs');

router.post('/', (req, res, next) => {
  //create a new user
  const data = req.body;
  bcrypt.hash(data.password, 10, (err, hash) => {
    data.password = hash;
    db.add('users', data, (err, resp) => {
      if(err) {
        console.error(err);
      } else {
        //307 redirects with same method and body, ie. posts to /login
        res.redirect(307, '/login');
      }
    });
  })
})

router.get('/:id', isAuthenticated, (req, res, next) => {
  //get a user by id
  const id = req.params.id;
  db.findOne('users', { id }, (err, resp) => {
    if(resp) {
      res.render('profile', { username: resp.username });
    } else {
      res.sendStatus(404);
    }
  });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.id === parseInt(req.params.id)) {
    return next();
  }
  res.sendStatus(403);
}

module.exports = router;
