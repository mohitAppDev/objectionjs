// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'demo',
      user: 'postgres',
      password: '1234',
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
  production: {
    client: 'pg',
    connection: process.env.CLIENT,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    ...knexSnakeCaseMappers(),
  },
};
