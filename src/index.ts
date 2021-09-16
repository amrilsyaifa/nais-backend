import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

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

dotenv.config();

const PORT =  process.env.PORT

async function startApolloServer(typeDefs: string, resolvers: { Query: { totalPosts: () => number } }) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });
    await server.start();
    server.applyMiddleware({ app });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await new Promise((resolve: any) => httpServer.listen({ port: PORT }, resolve(true)));
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
