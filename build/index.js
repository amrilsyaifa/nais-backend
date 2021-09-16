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
/* eslint-disable no-console */
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const typeDefs = `
    type Query{
        totalPosts: Int!
    }
`;
const resolvers = {
    Query: {
        totalPosts: () => 100
    }
};
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('jalan');
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
        });
        yield server.start();
        server.applyMiddleware({ app });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve(true)));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
startApolloServer(typeDefs, resolvers);
