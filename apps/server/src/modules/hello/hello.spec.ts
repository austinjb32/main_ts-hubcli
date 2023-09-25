import { get } from "lodash";
import {
  ContextValueType,
  MockContextValue,
} from "../../__test__/context-mock";
import TestApolloServer from "../../__test__/test-server";

const helloQuery = {
  query: `query{
    serverHello
  }`,
};

describe("Test Hello World", () => {
  const server = new TestApolloServer();

  beforeAll(async () => {
    await server.start();
  });

  it("hello query testing...", async () => {
    const response = await server.apollo.executeOperation(helloQuery, {
      contextValue: MockContextValue(
        ContextValueType.unAuthenticated,
        server.redisClient
      ),
    });
    expect(get(response, "body.singleResult.data.serverHello")).toBe(
      "Hello World from server"
    );
  });

  afterAll(async () => {
    await server.stop();
  });
});
