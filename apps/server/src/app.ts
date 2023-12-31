require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { CacheService, responseCachePlugin } from "@hubspire/cache-directive";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import expressWinston from "express-winston";
import http from "http";
import mongoose from "mongoose";
import winston from "winston";
import { AuthVerify, ServiceVerify } from "./libs/auth/token-verify";
import { getLoaders } from "./libs/config";
import { ServerContext } from "./libs/types";
import { Modules } from "./modules";

(async function ApolloServerInit() {
  const app = express();
  if (process.env.NODE_ENV === "production") {
    app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.json(),
        colorize: false,
      })
    );
  }
  const httpServer = http.createServer(app);
  const server = new ApolloServer<ServerContext>({
    schema: Modules.schemas,
    csrfPrevention: true,
    plugins: [
      // responseCachePluginpmn<ServerContext>(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginInlineTraceDisabled(),
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: false,
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      responseCachePlugin<ServerContext>(),
    ],
    introspection: process.env.APOLLO_INTROSPECTION === "true",
    // formatError: (error) => {
    //   return {
    //     ...error,
    //     extensions: {
    //       ...omit(get(error, "extensions"), "stacktrace"),
    //     },
    //   };
    // },
  });

  const cache = await CacheService.start({
    cache_prefix: "Server",
    redis_host: String(process.env.REDIS_HOST),
    redis_port: Number(process.env.REDIS_PORT),
  });
  await mongoose.connect(String(process.env.DB_URL), {});
  await server.start();

  app.get("/server/health", (req, res) => {
    res.send({ status: "ok" });
  });
  app.use(
    "/server",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async (payload) => {
        const isMHAdmin = ServiceVerify(payload.req);
        const isAuth = AuthVerify(payload.req);
        const sessionId = isMHAdmin
          ? (payload.req?.headers?.["mh-token"] as string)
          : payload.req?.headers?.authorization?.split(" ")[1] || null;

        return {
          accessToken: payload.req?.headers?.authorization,
          isMHAdmin,
          isAuth,
          dataSources: Modules.dataSources,
          cacheContext: {
            cache,
            sessionId,
          },
          loaders: getLoaders(),
        };
      },
    })
  );

  const port = process.env.PORT || 4040;
  httpServer.listen(port, () => {
    console.log(
      "\x1b[33m",
      `Server ready at http://localhost:${port}/server`,
      "\x1b[0m"
    );
  });
})();
