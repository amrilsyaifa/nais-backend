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
        yield queryInterface.bulkInsert('permissions', [
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
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('permissions', null, {});
    })
};
