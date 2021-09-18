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
const bcrypt = require("bcrypt");
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('users', [{
                id: "f64dd087-a0f2-452d-91ae-98985bfcb39f",
                role_id: 'fa88ba47-5946-467e-8ac1-c06689c59db1',
                profile_id: "094d6634-348a-4415-ba60-eb5975039b24",
                email: "nais@nais.com",
                username: "hellonais",
                password: yield bcrypt.hash('Am12il1991!', 10),
                registered_at: new Date(),
                last_login: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('users', null, {});
    })
};
