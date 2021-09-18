'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permission', {
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'roles' },
          key: 'id',
        },
      },
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'permissions' },
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_permission');
  }
};