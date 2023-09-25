import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import { getLoaders } from "../config";
import UserDataSource from "../../modules/user/user.datasource";
import AuthDataSource from "../../modules/auth/auth.datasource";
import PostDataSource from "../../modules/post/post.datasource";
import mongoose from "mongoose";
export * from "./generated/base-types";

export interface ServerContext {
  accessToken?: string;
  isMHAdmin: boolean;
  dataSources: TDataSourceContext;
  refreshToken?: string;
  userId?: mongoose.Types.ObjectId;
  // cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
}

export type TDataSourceContext = {
  userDataSource: UserDataSource;
  authDataSource: AuthDataSource;
  postDataSource: PostDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
