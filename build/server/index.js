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
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// Resolver
const AuthenticationResolver_1 = __importDefault(require("../graphql/resolvers/AuthenticationResolver"));
const UsersResolver_1 = __importDefault(require("../graphql/resolvers/UsersResolver"));
// Schema
const AuthenticationSchema_1 = __importDefault(require("../graphql/schemas/AuthenticationSchema"));
const UserSchema_1 = __importDefault(require("../graphql/schemas/UserSchema"));
const Authentication_1 = __importDefault(require("../utils/Authentication"));
const PORT = process.env.PORT || 4000;
const StartApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: [AuthenticationSchema_1.default, UserSchema_1.default],
        resolvers: [AuthenticationResolver_1.default, UsersResolver_1.default],
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const tokenWithBearer = req.headers.authorization || '';
            const token = tokenWithBearer.split(' ')[1];
            const user = yield Authentication_1.default.getUser(token);
            return { user };
        }),
    });
    yield server.start();
    server.applyMiddleware({ app });
    yield new Promise((resolve) => httpServer.listen({ port: PORT }, resolve(true)));
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
exports.default = StartApolloServer;
