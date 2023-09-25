import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createAuthOperation,
  createManyAuthOperation,
  deleteAuthOperation,
  deleteManyAuthOperation,
  getAllAuthCountOperation,
  getAllAuthOperation,
  getAuthByIdOperation,
  getOneAuthOperation,
  updateAuthOperation,
  updateManyAuthOperation,
} from "./__test__/operations";
import { rawAuthData, seedAuth } from "./__test__/seed";

describe("Auth Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedAuth();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST AUTH BY ID", async () => {
    await getAuthByIdOperation(String(rawAuthData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST AUTHS", async () => {
    await getAllAuthOperation(String(rawAuthData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE AUTH", async () => {
    await getOneAuthOperation(String(rawAuthData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT AUTHS", async () => {
    await getAllAuthCountOperation(server);
  });

  it("Positive - MUTATION: CREATE AUTH", async () => {
    await createAuthOperation(
      { token: "n7dFrrFIrh", refreshToken: "Q0gttPmVAO", userId: "gsiJYreC0z" },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY AUTHS", async () => {
    const newUsers = await createManyAuthOperation(
      [
        {
          token: "k7RG2c7072",
          refreshToken: "4KpSlbneGa",
          userId: "ThdoIMQqQJ",
        },
        {
          token: "v3qBhBVRM3",
          refreshToken: "faGzlKR0eF",
          userId: "06sVy5vcY7",
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE AUTH ", async () => {
    await updateAuthOperation(
      {
        _id: updateUserIdOne,
        token: "gmLT8qqKdP",
        refreshToken: "hT4sgq6Xbn",
        userId: "Ck9jy94SGE",
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY AUTHS", async () => {
    await updateManyAuthOperation(
      [
        {
          _id: updateUserIdOne,
          token: "zcU6IfRmYX",
          refreshToken: "zWReStneln",
          userId: "qfQOl33wUT",
        },
        {
          _id: updateUserIdTwo,
          token: "qtrVUhihxm",
          refreshToken: "zpmw8YuhOT",
          userId: "JTYWGIW1MU",
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE AUTH", async () => {
    await deleteAuthOperation(String(rawAuthData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE AUTH BY FILTER", async () => {
    await deleteManyAuthOperation(String(rawAuthData[4]._id.valueOf()), server);
  });
});
