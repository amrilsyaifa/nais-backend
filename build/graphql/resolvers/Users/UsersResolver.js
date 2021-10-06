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
const { user } = require('../../../databases/models');
const Resolvers = {
    Query: {
        getUsers: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = yield user.findAll();
            return response;
        })
    },
    Mutation: {
        changePassword: (_parent, { old_password, password, confirm_password }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const userRes = yield user.findOne({ where: { id: context.user.id } });
            // check match password
            const compare = yield Authentication_1.default.passwordCompare(old_password, userRes.password);
            if (!compare) {
                throw new Error('Old password not match');
            }
            // check same password
            if (password !== confirm_password) {
                throw new Error('Password not match');
            }
            try {
                const passwordHash = yield Authentication_1.default.passwordHash(password);
                const result = yield user.update({ password: passwordHash }, { where: { id: context.user.id } });
                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            }
            catch (error) {
                throw new Error('Error change password');
            }
        }),
    }
};
exports.default = Resolvers;
