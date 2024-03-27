import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergeResolver from "./resolvers/index.js";
import mergeTypeDef from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergeTypeDef,
  resolvers: mergeResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const PORT = 4000;
await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
    // context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB()
console.log(`🚀 Server ready at ${PORT}`);
