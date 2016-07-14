const express = require('express');
const path = require('path');
const knex = require('./database/config').db;
const db = require('./database/utils')(knex);

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const server = app.listen(process.env.PORT || 3000, () =>  {
  console.log(`Server ready on port ${server.address().port}`);
});

app.get('/users', function(req, res) {
  db.getAll('users', (err, data) => {
    if(err) return console.error(err);
    res.json(data);
  });
});