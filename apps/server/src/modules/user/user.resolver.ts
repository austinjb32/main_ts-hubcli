import { Resolvers } from "../../libs/types";
import { PostModel } from "../post/post.model";

export default {
  Query: {
    getUserById: (parent, args, context, info) =>
      context.dataSources.userDataSource.getUserById(String(args._id)),
    getAllUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.getAllUser(args),
    getOneUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.getOneUser(args),
    getAllUserCount: (parent, args, context, info) =>
      context.dataSources.userDataSource.getAllUserCount(args),
  },
  Mutation: {
    createUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.createUser(args.data),
    createManyUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.createManyUser(args.datas),
    updateUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.updateUser(args.data),
    updateManyUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.updateManyUser(args.datas),
    deleteUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.deleteUser(String(args._id)),
    deleteManyUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.deleteManyUser(args),
  },
  User: {
    __resolveReference: async (ref, context, info) => {
      return ref._id ? context.loaders.userLoader.load(ref._id) : null;
    },
    Posts: async (parent, context, info) => {
      console.log("post");
      const post = await PostModel.find({ creator: parent._id });
      return post;
    },
  },
} as Resolvers;
