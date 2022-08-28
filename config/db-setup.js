// npx knex migrate:make init --migrations-directory db/migrations
const knex = require('knex');
const knexfile = require('./knexfile');
const { Model } = require('objection');
require('dotenv').config();

function setupDb() {
  let db;
  if(process.env.DB_ENV == 'development') {
    db = knex(knexfile.development);
  } else {
    db = knex(knexfile.production);
  }

  // plug db config into objection
  Model.knex(db);
}

module.exports = setupDb;
