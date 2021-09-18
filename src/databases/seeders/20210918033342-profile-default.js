'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('profiles', [{
      id: "094d6634-348a-4415-ba60-eb5975039b24",
      first_name: 'administrator',
      phone_number: "082272271374",
      image: "default.jpg",
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('profiles', null, {});
  }
};
