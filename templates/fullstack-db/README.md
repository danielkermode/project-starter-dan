#fullstack-db

A full stack application using react, redux, express and knex.

Since this is a full stack with a database and server, some setup is required to get it running locally.

First, you will need a database (the current configuration expects postgres but this can be changed) running. Postgres setup guide: https://wiki.postgresql.org/wiki/Detailed_installation_guides

Then, you will need a .env file in the root directory to store database credentials. Example .env file:
```
DB_USER=admin
DB_PASS=password
DB_NAME=dbname
DB_HOST=127.0.0.1
```

Now, if the database is set up correctly you should run ```npm run database``` which runs the knex migrations. Knex docs: http://knexjs.org/

```npm start``` to run the express server on localhost:3000.

```npm run server:watch``` to watch and restart the server on file changes with nodemon.

```npm test``` to run the Tape/Enzyme tests for react components and redux reducers, that also uses ```babel-tape-runner``` for es6.

```npm run stest``` to run serverside database tests.

```npm run build``` to build the bundle.js that lies in /public, using webpack.

```npm run build:watch``` to watch and rebuild on file changes.

```npm run dev``` to serve a hot-reloading webpack dev server on port 8080.

Note that this is a very opinionated, 'batteries included' template, so only use it if you feel happy and comfortable with the technologies used.
