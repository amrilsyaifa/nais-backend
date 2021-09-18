'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      id: "f64dd087-a0f2-452d-91ae-98985bfcb39f",
      role_id: 'fa88ba47-5946-467e-8ac1-c06689c59db1',
      profile_id: "094d6634-348a-4415-ba60-eb5975039b24",
      email: "nais@nais.com",
      username: "hellonais",
      password: await bcrypt.hash('Am12il1991!', 10),
      registered_at: new Date(),
      last_login: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
