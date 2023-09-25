import { get } from "lodash";
import {
  ContextValueType,
  MockContextValue,
} from "../../../__test__/context-mock";
import TestApolloServer from "../../../__test__/test-server";
import { CreateAuthInput, UpdateAuthInput } from "../../../libs/types";
import {
  createAuth,
  createManyAuth,
  deleteAuth,
  deleteManyAuth,
  getAllAuth,
  getAllAuthCount,
  getOneAuth,
  getAuthById,
  updateAuth,
  updateManyAuth,
} from "./queries";

export const getAuthByIdOperation = async (
  authId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(getAuthById(authId), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.getAuthById");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(authId);
};

export const getAllAuthOperation = async (
  authId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    getAllAuth("", { _id: { $eq: authId } }, { createdAt: 1 }, 10, 0),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.getAllAuth");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(authId);
};

export const getOneAuthOperation = async (
  authId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    getOneAuth({ _id: { $eq: authId } }, { createdAt: 1 }),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.getOneAuth");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(authId);
};

export const getAllAuthCountOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllAuthCount("", {}), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllAuthCount");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(5);
};

export const createAuthOperation = async (
  data: CreateAuthInput,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(createAuth(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.createAuth");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const createManyAuthOperation = async (
  datas: CreateAuthInput[],
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(createManyAuth(datas), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult: any = get(
    result,
    "body.singleResult.data.createManyAuth"
  );
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([expect.objectContaining(datas[0])])
  );
  return refinedResult;
};

export const updateAuthOperation = async (
  data: UpdateAuthInput,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(updateAuth(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.updateAuth");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const updateManyAuthOperation = async (
  datas: UpdateAuthInput[],
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(updateManyAuth(datas), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.updateManyAuth");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([expect.objectContaining(datas[0])])
  );
};

export const deleteAuthOperation = async (
  authId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(deleteAuth(authId), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteAuth");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(authId);
};

export const deleteManyAuthOperation = async (
  authId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    deleteManyAuth({ _id: { $eq: authId } }),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.deleteManyAuth");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(authId);
};
