"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = __importDefault(require("../../../utils/Authentication"));
const { user, profile, role } = require('../../../databases/models');
const sequelize = require('../../../databases/models').sequelize;
const Resolvers = {
    Mutation: {
        login: (_parent, { username, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield user.findOne({
                where: { username }
            });
            if (!response) {
                throw new Error('Auth failed');
            }
            // check password
            const compare = yield Authentication_1.default.passwordCompare(password, response.password);
            // generate token
            if (compare) {
                // update last login
                yield user.update({ last_login: new Date() }, {
                    where: { id: response.id }
                });
                const token = yield Authentication_1.default.generateToken(response.id, username);
                const res = {
                    user: response,
                    token
                };
                return res;
            }
            throw new Error('Auth failed');
        }),
        register: (_parent, payload) => __awaiter(void 0, void 0, void 0, function* () {
            const { first_name, middle_name, last_name, phone_number, email, username, password } = payload;
            try {
                const result = yield sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                    // Then, we do some calls passing this transaction as an option:
                    let optionsProfile = {};
                    if (first_name) {
                        optionsProfile = Object.assign(Object.assign({}, optionsProfile), { first_name });
                    }
                    if (middle_name) {
                        optionsProfile = Object.assign(Object.assign({}, optionsProfile), { middle_name });
                    }
                    if (last_name) {
                        optionsProfile = Object.assign(Object.assign({}, optionsProfile), { last_name });
                    }
                    if (phone_number) {
                        optionsProfile = Object.assign(Object.assign({}, optionsProfile), { phone_number });
                    }
                    const profileReturn = yield profile.create(optionsProfile, { transaction: t });
                    const responseRole = yield role.findOne({ where: { slug: 'user' } }, { transaction: t });
                    let optionsUser = {};
                    if (profileReturn) {
                        optionsUser = Object.assign(Object.assign({}, optionsUser), { profile_id: profileReturn.id });
                    }
                    if (responseRole) {
                        optionsUser = Object.assign(Object.assign({}, optionsUser), { role_id: responseRole.id });
                    }
                    if (email) {
                        optionsUser = Object.assign(Object.assign({}, optionsUser), { email });
                    }
                    if (username) {
                        optionsUser = Object.assign(Object.assign({}, optionsUser), { username });
                    }
                    if (password) {
                        optionsUser = Object.assign(Object.assign({}, optionsUser), { password });
                    }
                    optionsUser = Object.assign(Object.assign({}, optionsUser), { registered_at: new Date() });
                    optionsUser = Object.assign(Object.assign({}, optionsUser), { last_login: new Date() });
                    const responseUser = yield user.create(optionsUser, { transaction: t });
                    return responseUser;
                }));
                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
            }
            catch (error) {
                // If the execution reaches this line, an error occurred.
                // The transaction has already been rolled back automatically by Sequelize!
                throw new Error('Register failed');
            }
        })
    }
};
exports.default = Resolvers;
