import { Resolvers } from "../../libs/types";

export default {
  Query: {
    serverHello: (parent, args, context, info) =>
      context.dataSources.helloDataSource.sayHello(),
  },
} as Resolvers;
