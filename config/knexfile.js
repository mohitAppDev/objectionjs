// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config();

module.exports = {
  development: {
    client:  process.env.CLIENT,
    connection: {
      database: process.env.DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    // seeds: {
    //   directory: './seeds',
    // },
    // automatically convert camelCase to snake case
    // so table names are in snake case
    // but we can use camelCase fields per default
    ...knexSnakeCaseMappers(),
  },
};
