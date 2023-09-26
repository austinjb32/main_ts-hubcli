import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import jwt from "jsonwebtoken";
import { UserModel } from "../../modules/user/user.model";
import { User } from "../types";

// Define the JWT payload interface
interface JWTPayload {
  userId: string;
  email: string;
}

// Create a map to store isMHAdmin directives
const isMHAdminDirectiveArgumentMaps: Record<string, any> = {};

// Transform schema for isMHAdmin directive
export const mhAdminDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      // Check if the type has the isMHAdmin directive
      const isMHAdminDirective = getDirective(schema, type, "isMHAdmin")?.[0];
      if (isMHAdminDirective) {
        isMHAdminDirectiveArgumentMaps[type.name] = isMHAdminDirective;
      }
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      // Check if the field has the isMHAdmin directive
      const isMHAdminDirective =
        getDirective(schema, fieldConfig, "isMHAdmin")?.[0] ??
        isMHAdminDirectiveArgumentMaps[typeName];
      if (isMHAdminDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = function (source, args, context, info) {
          if (context.isMHAdmin) {
            return resolve(source, args, context, info);
          }
          throw new GraphQLError("Invalid service token");
        };
        return fieldConfig;
      }
    },
  });

// Create a map to store isAuth directives
const isAuthDirectiveArgumentMaps: Record<string, any> = {};

// Transform schema for isAuth directive
export const authDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      // Check if the type has the isMHAdmin directive
      const isAdminDirective = getDirective(schema, type, "isAuth")?.[0];
      if (isAdminDirective) {
        isAuthDirectiveArgumentMaps[type.name] = isAdminDirective;
        console.log(getDirective(schema, type, "isAuth"));
      }
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      // Check if the field has the isAuth directive

      const Token =
        getDirective(schema, fieldConfig, "isAuth")?.[0] ??
        isAuthDirectiveArgumentMaps[typeName];
      if (Token) {
        // Get the field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that first verifies the token
        fieldConfig.resolve = async function (source, args, context, info) {
          const decodedToken = jwt.verify(
            context.accessToken,
            "somesupersecretsecret"
          ) as JWTPayload;

          const foundUser = await UserModel.findById(decodedToken.userId);

          if (!foundUser) {
            throw new GraphQLError("Not Authenticated");
          }

          const formattedUser: User = {
            ...foundUser,
            _id: foundUser?._id.toString(),
          };

          context.userId = formattedUser._id;

          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });

const isCheckDirectiveArgumentMaps: Record<string, any> = {};

// Transform schema for the 'upper' directive
export const checkDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      // Check if the type has the isMHAdmin directive
      const isCheckDirective = getDirective(schema, type, "upper")?.[0];
      if (isCheckDirective) {
        isCheckDirectiveArgumentMaps[type.name] = isCheckDirective;
      }
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check if the field has the 'upper' directive
      console.log(getDirective(schema, fieldConfig, "upper"));
      const upperDirective = getDirective(schema, fieldConfig, "upper")?.[0];
      if (upperDirective) {
        // Get the field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that converts the result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);

          console.log("hello");
          if (typeof result === "string") {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
