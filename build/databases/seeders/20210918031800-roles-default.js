'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('roles', [
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
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('roles', null, {});
    })
};