'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'roles' },
          key: 'id',
        },
      },
      profile_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'profiles' },
          key: 'id',
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registered_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};