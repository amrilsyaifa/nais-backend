import { config as dotenv } from "dotenv";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import express, { Application, Request, Response } from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";

// Schema
import AuthenticationSchema from './graphql/schemas/AuthenticationSchema';
import UserSchema from './graphql/schemas/UserSchema';
import RoleSchema from './graphql/schemas/RoleSchema';
import PermissionSchema from './graphql/schemas/PermissionSchema';
import ProfileSchema from './graphql/schemas/ProfileSchema';

// Resolver
import AuthResolver from './graphql/resolvers/Authentications/AuthenticationResolver';
import UsersResolver from './graphql/resolvers/Users/UsersResolver';
import RoleResolver from './graphql/resolvers/Roles/RoleResolver';
import PermissionsResolver from './graphql/resolvers/Permissions/PermissionsResolver';
import ProfilesResolver from './graphql/resolvers/Profiles/ProfilesResolver';

// Utils
import Authentication from './utils/Authentication';

// Routes
import WhatsAppRoutes from './routers/WhatsAppRoutes'


const PORT = process.env.PORT || 4000;

import SyncDatabase from './databases';

class App {
    public app: Application;

    constructor() {
        this.app = express()
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("This App for super human, :D");
        });

        this.app.use("/api/v1/whatsapp", WhatsAppRoutes);
    }
}

const StartApolloServer = async (): Promise<void> => {
    const app = new App().app;

    const httpServer = http.createServer(app);

    // Graphql
    const server = new ApolloServer({
        typeDefs: [AuthenticationSchema, UserSchema, ProfileSchema, RoleSchema, PermissionSchema],
        resolvers: [AuthResolver, UsersResolver, ProfilesResolver, RoleResolver, PermissionsResolver],
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

SyncDatabase();
StartApolloServer();
