import {
  composeResolvers,
  ResolversComposerMapping,
} from "@graphql-tools/resolvers-composition";

// Import your resolvers and other relevant dependencies here
import { Resolvers } from "../types";

// Import your authentication functions
import { isAuthenticated, isAdmin } from "../auth/auth-middleware";
import postResolvers from "../../modules/post/post.resolver";
import userResolvers from "../../modules/user/user.resolver";

// Define your resolvers composition
const userResolversComposition: ResolversComposerMapping<Resolvers> = {
  Query: {
    viewUserById: [isAuthenticated()],
    getUserById: [isAuthenticated()],
    user: [isAuthenticated()],
    countUsers: [isAuthenticated()],
  },
  Mutation: {
    updateUser: [isAuthenticated(), isAdmin()],
    deleteUser: [isAuthenticated(), isAdmin()],
  },
};

const postResolversComposition: ResolversComposerMapping<Resolvers> = {
  Query: {
    viewPost: [isAuthenticated()],
    posts: [isAuthenticated()],
    post: [isAuthenticated()],
    countPosts: [isAuthenticated()],
  },
  Mutation: {
    createPost: [isAuthenticated()],
    updatePost: [isAuthenticated(), isAdmin()],
    deletePost: [isAuthenticated(), isAdmin()],
  },
};

// Compose your resolvers
const userComposedResolvers = composeResolvers(
  userResolvers,
  userResolversComposition
);
const postComposedResolvers = composeResolvers(
  postResolvers,
  postResolversComposition
);

export { userComposedResolvers, postComposedResolvers };
