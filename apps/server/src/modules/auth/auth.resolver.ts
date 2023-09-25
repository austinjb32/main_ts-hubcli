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
    createManyAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.createManyAuth(args.datas),
    updateAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.updateAuth(args.data),
    updateManyAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.updateManyAuth(args.datas),
    deleteAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.deleteAuth(String(args._id)),
    deleteManyAuth: (parent, args, context, info) =>
      context.dataSources.authDataSource.deleteManyAuth(args),
  },
  Auth: {
    __resolveReference: async (ref, context, info) =>
      ref._id ? context.loaders.authByIdLoader.load(ref._id) : null,
  },
} as Resolvers;
