import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

// Resolver
import AuthResolver from '../graphql/resolvers/Authentications/AuthenticationResolver';
import UsersResolver from '../graphql/resolvers/Users/UsersResolver';
import RoleResolver from '../graphql/resolvers/Roles/RoleResolver';

// Schema
import AuthenticationSchema from '../graphql/schemas/AuthenticationSchema';
import UserSchema from '../graphql/schemas/UserSchema';
import RoleSchema from '../graphql/schemas/RoleSchema';

import Authentication from '../utils/Authentication';

const PORT = process.env.PORT || 4000;

const StartApolloServer = async (): Promise<void> => {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: [AuthenticationSchema, UserSchema, RoleSchema],
        resolvers: [AuthResolver, UsersResolver, RoleResolver],
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: async ({ req }) => {
            const tokenWithBearer = req.headers.authorization || '';
            const token = tokenWithBearer.split(' ')[1];
            const user = await Authentication.getUser(token);
            return {user}
        },
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve: any) => httpServer.listen({ port: PORT }, resolve(true)));
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
};

export default StartApolloServer;