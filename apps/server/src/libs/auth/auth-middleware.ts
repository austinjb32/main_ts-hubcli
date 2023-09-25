import jwt from "jsonwebtoken";
import { User } from "../types";
import { UserModel } from "../../modules/user/user.model";

interface JWTPayload {
  userId: string;
  email: string;
}

import { GraphQLError } from "graphql";

export const isAuthenticated =
  () =>
  (next: (root: any, args: any, context: any, info: any) => any) =>
  async (
    root: any,
    args: any,
    context: { accessToken: string; userId: string; refreshToken: string },
    info: any
  ) => {
    const token = context.accessToken;

    if (!token) {
      throw new Error("No Token found");
    }

    const decodedToken = jwt.verify(
      context.accessToken,
      "somesupersecretsecret"
    ) as JWTPayload;

    const foundUser = await UserModel.findById(decodedToken.userId);

    if (!foundUser) {
      throw new Error("No users found");
    }

    const formattedUser: User = {
      ...foundUser,
      _id: foundUser?._id.toString(),
    };

    context.userId = formattedUser._id;

    return next(root, args, context, info);
  };

export const isAdmin =
  () =>
  (next: (root: any, args: any, context: any, info: any) => any) =>
  async (
    root: any,
    args: any,
    context: { accessToken: string; userId: string },
    info: any
  ) => {
    if (!context.accessToken) {
      throw new GraphQLError("You are not authorized to perform this action.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const decodedToken = jwt.verify(
      context.accessToken,
      "somesupersecretsecret"
    ) as JWTPayload;

    const foundUser = await UserModel.findById(decodedToken.userId);

    if (!foundUser) {
      throw new Error("No User Found");
    }

    if (!(foundUser.isAdmin || args.dataID !== foundUser._id.toString())) {
      throw new GraphQLError("You are not authorized to perform this action.", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }

    return next(root, args, context, info);
  };
