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
Object.defineProperty(exports, "__esModule", { value: true });
const { permission } = require('../../../databases/models');
const Resolvers = {
    Query: {
        getPermissions: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = yield permission.findAll();
            return response;
        }),
        getPermission: (_parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = yield permission.findOne({
                where: { id }
            });
            return response;
        })
    },
    Mutation: {
        addPermission: (_parent, { id, title, slug, description, active }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const permissionResult = yield permission.create({ id, title, slug, description, active });
            return permissionResult;
        }),
        updatePermission: (_parent, { id, title, slug, description, active }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            try {
                let options = {};
                if (title) {
                    options = Object.assign(Object.assign({}, options), { title });
                }
                if (slug) {
                    options = Object.assign(Object.assign({}, options), { slug });
                }
                if (description) {
                    options = Object.assign(Object.assign({}, options), { description });
                }
                if (active) {
                    options = Object.assign(Object.assign({}, options), { active });
                }
                const result = yield permission.update(options, { where: { id } });
                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            }
            catch (err) {
                throw new Error('Error update permission');
            }
        }),
        deletePermission: (_parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const result = yield permission.destroy({ where: { id } });
            if (result) {
                return 'Success';
            }
            return 'Something when wrong';
        })
    }
};
exports.default = Resolvers;
