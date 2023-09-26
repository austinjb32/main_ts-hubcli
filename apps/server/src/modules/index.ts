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
import {
  postComposedResolvers,
  userComposedResolvers,
} from ".././libs/resolverComposition/resolverComposition";
import {
  authDirectiveTransformer,
  checkDirectiveTransformer,
  mhAdminDirectiveTransformer,
} from "../libs/directives/auth.directive";
import { TModule } from "../libs/types";
import AuthDataSource from "./auth/auth.datasource";
import authResolvers from "./auth/auth.resolver";
import PostDataSource from "./post/post.datasource";
import UserDataSource from "./user/user.datasource";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.resolve(__dirname + "/**/*.graphql"), {
    extensions: ["graphql"],
  })
);
// const resolvers = mergeResolvers(
//   loadFilesSync(path.resolve(__dirname + "/**/*.resolver.{ts,js}"), {
//     extensions: ["ts", "js"],
//   })
// );

const finalMergedResolvers = mergeResolvers([
  userComposedResolvers,
  postComposedResolvers,
  authResolvers,
]);

export const Modules: TModule = {
  dataSources: {
    authDataSource: new AuthDataSource(),
    userDataSource: new UserDataSource(),
    postDataSource: new PostDataSource(),
  },
  schemas: cacheDirectiveTransformer(
    mhAdminDirectiveTransformer(
      checkDirectiveTransformer(
        authDirectiveTransformer(
          buildSubgraphSchema({
            typeDefs: typeDefs,
            resolvers: {
              ...finalMergedResolvers,
              ...{ JSON: GraphQLJSON },
              ...{ DateTime: GraphQLDateTime },
              ...{ EmailAddress: GraphQLEmailAddress },
            },
          })
        )
      )
    )
  ),
};
