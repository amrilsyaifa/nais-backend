'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'role_permission',
            [
                {
                    role_id: 'fa88ba47-5946-467e-8ac1-c06689c59db1',
                    permission_id: 'b7dd8b42-2aba-4870-b546-7f0ff7003890'
                },
                {
                    role_id: 'cd67467d-4e4b-42c0-a9d9-a07eb58565d1',
                    permission_id: 'b36c5ece-e6a6-45c0-9a98-820eb41fbaa7'
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('role_permission', null, {});
    }
};
