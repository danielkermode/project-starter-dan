const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const indexRoute = require('../routes/index');
const userRoutes = require('../routes/user');
const sessionRoutes = require('../routes/session');
const setupPassport = require('./auth');
const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
setupPassport();

app.use('/', indexRoute);
app.use('/', sessionRoutes);
app.use('/user', userRoutes);

module.exports = app;