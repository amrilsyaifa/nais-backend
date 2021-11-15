import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { connect } from 'mongoose';

// Schema
import AuthenticationSchema from '../graphql/schemas/AuthenticationSchema';
import UserSchema from '../graphql/schemas/UserSchema';
import RoleSchema from '../graphql/schemas/RoleSchema';
import PermissionSchema from '../graphql/schemas/PermissionSchema';
import ProfileSchema from '../graphql/schemas/ProfileSchema';

// Resolver
import AuthResolver from '../graphql/resolvers/Authentications/AuthenticationResolver';
import UsersResolver from '../graphql/resolvers/Users/UsersResolver';
import RoleResolver from '../graphql/resolvers/Roles/RoleResolver';
import PermissionsResolver from '../graphql/resolvers/Permissions/PermissionsResolver';
import ProfilesResolver from '../graphql/resolvers/Profiles/ProfilesResolver';

// Utils
import Authentication from '../utils/Authentication';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const StartServer = async (App: any, PORT: string | number): Promise<void> => {
    const app = new App().app;

    const httpServer = http.createServer(app);

    // Mongoose
    const mongoose = await connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
    await mongoose.connection;
    if (mongoose.connection.readyState === 1) {
        // eslint-disable-next-line no-console
        console.log('connected mongodb');
    }

    // Graphql
    const server = new ApolloServer({
        typeDefs: [AuthenticationSchema, PermissionSchema, RoleSchema, UserSchema, ProfileSchema],
        resolvers: [AuthResolver, PermissionsResolver, RoleResolver, UsersResolver, ProfilesResolver],
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: async ({ req }) => {
            const tokenWithBearer = req.headers.authorization || '';
            const token = tokenWithBearer.split(' ')[1];
            const user = await Authentication.getUser(token);
            return { user };
        }
    });

    // Start
    await server.start();
    server.applyMiddleware({ app });

    await new Promise((resolve: any) => httpServer.listen({ port: PORT }, resolve(true)));
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
};

export default StartServer;
