# Group-Project

A full stack application using handlebars, express, passport and knex.

First, you will need a database (the current configuration expects postgres but this can be changed) running. Postgres setup guide: https://wiki.postgresql.org/wiki/Detailed_installation_guides

Then, you will need a .env file in the root directory to store database credentials. You will also need a key value pair for the session secret. Example .env file:
```
DB_USER=admin
DB_PASS=password
DB_NAME=dbname
DB_HOST=127.0.0.1
SESSION_SECRET=sessionsecret
```
The session secret is used by express-session for authenticating sessions. Docs: https://github.com/expressjs/session

Now, if the database is set up correctly (make sure it's an empty database) you should run ```npm run database``` which runs the knex migrations and seeds, essentially setting up the tables in your database for you. Knex docs: http://knexjs.org/

```npm start``` to run the express server on localhost:3000.

```npm run dev``` to run with nodemon.

```npm test``` to run tests with Tape.

## What it does:

A user can register. This will add the user to the database with a bcrypted password. Bcrypt is standard for password encryption at the time of this writing. Docs: https://www.npmjs.com/package/bcryptjs. Note that I chose the pure JS lib instead of the standard 'bcrypt' with c++ bindings. This means that the encryption is less efficient in terms of speed, however the tradeoff is that your environment will be pure Javascript and much less of a headache to deal with in production, and you don't need the ```node-gyp``` dependency. If you are very concerned about efficiency, https://www.npmjs.com/package/bcrypt.

A user can log in with their credentials. This will start a session that exits when the browser is closed.

The logged in user can see their own page displaying their username, but no other users' pages.

Passport is used in conjunction with a 'local' strategy. Docs: http://passportjs.org/

## Technologies

- Passport/Passport-local
- Bcrypt
- Express/Express-session
- Handlebars
- Knex/Postgres
- Tape/Tap-spec

Note that this is a very opinionated, 'batteries included' template, so only use it if you feel happy and comfortable with the technologies used.



