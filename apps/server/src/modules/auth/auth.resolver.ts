import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getAuthById: (parent, args, context, info) =>
      context.dataSources.authDataSource.getAuthById(String(args._id)),
    getAllAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.getAllAuth(args),
    getOneAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.getOneAuth(args),
    getAllAuthCount: (parent, args, context, info) =>
      context.dataSources.authDataSource.getAllAuthCount(args),
  },
  Mutation: {
    createAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.createAuth(args.data),
    deleteAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.deleteAuth(String(args._id)),
  },
  Auth: {
    __resolveReference: async (ref, context, info) =>
      ref._id ? context.loaders.authLoader.load(ref._id) : null,
  },
} as Resolvers;
