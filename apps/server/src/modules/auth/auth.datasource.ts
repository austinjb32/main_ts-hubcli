import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, omit, set, size, map, isEmpty } from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PipelineStage } from "mongoose";
import {
  CreateAuthInput,
  QueryGetOneAuthArgs,
  ServerContext,
  QueryUserLoginArgs,
  Auth,
} from "../../libs/types";
import { AuthModel } from "./auth.model";
import { UserModel } from "../user/user.model";
import { loginValidation } from "../../libs/validation/validation";

export default class AuthDataSource {
  private readonly model = AuthModel;

  async userLogin(args: QueryUserLoginArgs, context: ServerContext) {
    const user = await UserModel.findOne({ email: args.email }).exec();
    if (!user) {
      const error = new Error("No User Found");
      throw error;
    }

    const validLogin = loginValidation(args);

    if (validLogin.error) {
      throw new Error(`${validLogin.error.name}${validLogin.error.message}`);
    }

    const hashedPassword = bcrypt.compareSync(args.password, user.password);
    if (!hashedPassword) {
      throw new Error("Wrong Password");
    }

    //////////////////{User Token}/////////////////////

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    context.accessToken = token;
    //////////////////{Refresh Token}/////////////////////
    const refreshToken = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "30d" }
    );
    context.refreshToken = refreshToken;
    context.userId = user._id;

    const authData = new AuthModel({
      accessToken: token,
      refreshToken: refreshToken,
      userId: user._id,
    });

    await authData.save();

    return authData;
  }

  async getAuthById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneAuth(args: QueryGetOneAuthArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createAuth(data: CreateAuthInput) {
    const auth = new this.model({ ...data });
    return auth.save();
  }

  async deleteAuth(_id: string) {
    const auth = await this.model.findById(_id);
    if (!auth) throw new GraphQLError("auth not found");

    await this.model.deleteOne({ _id });
    return auth;
  }
}
