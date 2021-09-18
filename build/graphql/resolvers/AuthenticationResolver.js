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
const Authentication_1 = __importDefault(require("../../utils/Authentication"));
const { user } = require('../../databases/models');
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
                const token = yield Authentication_1.default.generateToken(user.id, username, response.password);
                const res = {
                    user: response,
                    token
                };
                return res;
            }
            throw new Error('Auth failed');
        })
    }
};
exports.default = Resolvers;
