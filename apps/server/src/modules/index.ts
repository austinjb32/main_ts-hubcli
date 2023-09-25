import { buildSubgraphSchema } from "@apollo/subgraph";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { cacheDirectiveTransformer } from "@hubspire/cache-directive";
import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLJSON,
} from "graphql-scalars";
import path from "path";
import { authDirectiveTransformer } from "../libs/directives/auth.directive";
import { TModule } from "../libs/types";
import AuthDataSource from "./auth/auth.datasource";
import UserDataSource from "./user/user.datasource";
import PostDataSource from "./post/post.datasource";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.resolve(__dirname + "/**/*.graphql"), {
    extensions: ["graphql"],
  })
);
const resolvers = mergeResolvers(
  loadFilesSync(path.resolve(__dirname + "/**/*.resolver.{ts,js}"), {
    extensions: ["ts", "js"],
  })
);

export const Modules: TModule = {
  dataSources: {
    authDataSource: new AuthDataSource(),
    userDataSource: new UserDataSource(),
    postDataSource: new PostDataSource(),
  },
  schemas: cacheDirectiveTransformer(
    authDirectiveTransformer(
      buildSubgraphSchema({
        typeDefs: typeDefs,
        resolvers: {
          ...resolvers,
          ...{ JSON: GraphQLJSON },
          ...{ DateTime: GraphQLDateTime },
          ...{ EmailAddress: GraphQLEmailAddress },
        },
      })
    )
  ),
};
