'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'roles',
            [
                {
                    id: 'fa88ba47-5946-467e-8ac1-c06689c59db1',
                    title: 'admin',
                    slug: 'admin',
                    description: 'administrator',
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 'cd67467d-4e4b-42c0-a9d9-a07eb58565d1',
                    title: 'user',
                    slug: 'user',
                    description: 'default user',
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
