'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'permissions',
            [
                {
                    id: 'b7dd8b42-2aba-4870-b546-7f0ff7003890',
                    title: 'admin',
                    slug: 'admin',
                    description: 'permission administrator',
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 'b36c5ece-e6a6-45c0-9a98-820eb41fbaa7',
                    title: 'user',
                    slug: 'user',
                    description: 'permission default user',
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('permissions', null, {});
    }
};
