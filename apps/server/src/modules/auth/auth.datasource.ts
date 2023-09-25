import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, omit, set, size, map, isEmpty } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreateAuthInput,
  QueryGetAllAuthArgs,
  QueryGetOneAuthArgs,
  MutationDeleteManyAuthArgs,
  QueryGetAllAuthCountArgs,
  UpdateAuthInput,
} from "../../libs/types";
import { AuthModel } from "./auth.model";

export default class AuthDataSource {
  private readonly model = AuthModel;

  async getAllAuth(args: QueryGetAllAuthArgs) {
    const pipelines: PipelineStage[] = [];
    const limit = Number(args.limit) || 10;
    const offset = Number(args.offset) || 0;

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    size(args.search?.trim()) <= 2 &&
      pipelines.push({ $sort: args.sort || { createdAt: -1 } });
    pipelines.push({ $skip: offset });
    pipelines.push({ $limit: limit });

    return this.model.aggregate(pipelines);
  }

  async getAllAuthCount(args: QueryGetAllAuthCountArgs) {
    const pipelines: PipelineStage[] = [];

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    pipelines.push({ $count: "totalCount" });

    return (await this.model.aggregate(pipelines))[0]?.totalCount || 0;
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

  async createManyAuth(datas: CreateAuthInput[]) {
    const auths = datas.map((input: CreateAuthInput) => this.createAuth(input));
    return auths;
  }

  async updateAuth(data: UpdateAuthInput) {
    const auth = await this.model.findById(data._id);
    if (!auth) throw new GraphQLError("auth not found");

    for (const field in omit(data, "_id")) set(auth, field, get(data, field));

    return auth.save();
  }

  async updateManyAuth(datas: UpdateAuthInput[]) {
    const auths = datas.map((input: UpdateAuthInput) => this.updateAuth(input));
    return auths;
  }

  async deleteAuth(_id: string) {
    const auth = await this.model.findById(_id);
    if (!auth) throw new GraphQLError("auth not found");

    await this.model.deleteOne({ _id });
    return auth;
  }

  async deleteManyAuth(args: MutationDeleteManyAuthArgs) {
    const auths = await this.model.find(args.filter);
    if (isEmpty(auths)) throw new GraphQLError("auths not found");

    await this.model.deleteMany({ _id: { $in: map(auths, "_id") } });
    return auths;
  }
}
