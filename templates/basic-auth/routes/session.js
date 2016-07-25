const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
  res.render('login', req.flash());
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Unable to authenticate.'
}), (req, res, next) => {
  res.redirect('/user/' + req.user.id);
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.get('/logout', (req, res, next) => {
  res.redirect('/');
});

router.post('/logout', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
