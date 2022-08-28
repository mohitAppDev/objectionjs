exports.up = function (knex) {
  return knex.schema
    .createTable('profile', (table) => {
      table.increments('id').primary();
      table.integer('userId').notNullable();
      table.string('address');
      table.integer('age');
      table.integer('gender');
      table.string('workExperience');
      table.string('presentCompany').notNullable();
      table.double('ctc').notNullable();
      table.boolean('employmentStatus').notNullable().defaultTo(0);
      table.boolean('isAvailableToHire').notNullable().defaultTo(0);
      table.boolean('isAvailableToFreelance').notNullable().defaultTo(0);
      table.string('companyAppliedFor');
      table.timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user')
};
