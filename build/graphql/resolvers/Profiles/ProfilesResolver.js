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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const { user, profile, role, permission } = require('../../../databases/models');
const Resolvers = {
    Query: {
        getMyProfiles: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = yield user.findOne({
                where: { id: context.user.id },
                include: [
                    {
                        model: profile
                    },
                    {
                        model: role,
                        include: [
                            {
                                model: permission,
                                as: 'permissions'
                            }
                        ]
                    }
                ]
            });
            return response;
        }),
        getProfiles: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = yield profile.findAll({});
            return response;
        }),
        getProfile: (_parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const response = yield profile.findOne({ where: { id } });
            return response;
        })
    },
    Mutation: {
        updateMyProfiles: (_parent, { first_name, middle_name, last_name, phone_number, address, zip_code, place_of_birth, birthday }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const userResponse = yield user.findOne({
                where: { id: context.user.id }
            });
            if (!userResponse) {
                throw new Error('Not authenticated');
            }
            try {
                let options = {};
                if (first_name) {
                    options = Object.assign(Object.assign({}, options), { first_name });
                }
                if (middle_name) {
                    options = Object.assign(Object.assign({}, options), { middle_name });
                }
                if (last_name) {
                    options = Object.assign(Object.assign({}, options), { last_name });
                }
                if (phone_number) {
                    options = Object.assign(Object.assign({}, options), { phone_number });
                }
                if (address) {
                    options = Object.assign(Object.assign({}, options), { address });
                }
                if (zip_code) {
                    options = Object.assign(Object.assign({}, options), { zip_code });
                }
                if (place_of_birth) {
                    options = Object.assign(Object.assign({}, options), { place_of_birth });
                }
                if (birthday) {
                    options = Object.assign(Object.assign({}, options), { birthday });
                }
                const result = yield profile.update(options, { where: { id: userResponse.profile_id } });
                if (result) {
                    return 'Success';
                }
                return 'Something when wrong';
            }
            catch (err) {
                throw new Error('Error update role');
            }
        }),
        updateImageProfile: (_parent, { file }, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            const PORT = process.env.PORT || 4000;
            const { createReadStream, filename } = yield file;
            const stream = createReadStream();
            const pathName = path_1.default.join(__dirname, `/public/images/${filename}`);
            yield stream.pipe(fs_1.default.createWriteStream(pathName));
            return { url: `http://localhost:${PORT}/images/${filename}` };
        })
    }
};
exports.default = Resolvers;
