exports.up = function (knex) {
  return knex.schema
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').notNullable().unique();
      table.string('phoneNumber').notNullable().unique();
      table.integer('userType').notNullable().defaultTo(0);
      table.boolean('isEmailVerify').notNullable().defaultTo(0);
      table.boolean('isPhoneNoVerify').notNullable().defaultTo(0);
      table.timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user')
};
