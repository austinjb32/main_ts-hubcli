import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import mongoose from "mongoose";
import AuthDataSource from "../../modules/auth/auth.datasource";
import PostDataSource from "../../modules/post/post.datasource";
import UserDataSource from "../../modules/user/user.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

export interface ServerContext {
  accessToken?: string;
  isMHAdmin: boolean;
  dataSources: TDataSourceContext;
  refreshToken?: string;
  userId?: mongoose.Types.ObjectId;
  cacheContext: CacheContext;
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
