exports.seed = async function (knex) {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "user" CASCADE');

  await knex('user').insert([
    {
      id: 1,
      name: 'user1',
      email: 'user1@test.com',
    },
    {
      id: 2,
      name: 'user2',
      email: 'user2@test.com',
    },
    {
      id: 3,
      name: 'user2',
      email: 'user3@test.com',
    },
  ]);
};
