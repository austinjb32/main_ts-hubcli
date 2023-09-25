import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createUserOperation,
  createManyUserOperation,
  deleteUserOperation,
  deleteManyUserOperation,
  getAllUserCountOperation,
  getAllUserOperation,
  getUserByIdOperation,
  getOneUserOperation,
  updateUserOperation,
  updateManyUserOperation,
} from "./__test__/operations";
import { rawUserData, seedUser } from "./__test__/seed";

describe("User Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedUser();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST USER BY ID", async () => {
    await getUserByIdOperation(String(rawUserData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST USERS", async () => {
    await getAllUserOperation(String(rawUserData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE USER", async () => {
    await getOneUserOperation(String(rawUserData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT USERS", async () => {
    await getAllUserCountOperation(server);
  });

  it("Positive - MUTATION: CREATE USER", async () => {
    await createUserOperation(
      {
        name: "49GpxfBlCN",
        email: "AaL6B8tADw",
        password: "xkHrlN1cIQ",
        bio: "MS7offvmwq",
        status: "e7CheATczd",
        imageUrl: "RfDSSb1n2y",
        isAdmin: true,
      },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY USERS", async () => {
    const newUsers = await createManyUserOperation(
      [
        {
          name: "Ujxg7cm7ss",
          email: "P3IbDnVXhU",
          password: "KI0YIoo7nq",
          bio: "fE4VyxDeTf",
          status: "mJKmbt2fhq",
          imageUrl: "7xUYZ1ap9p",
          isAdmin: true,
        },
        {
          name: "mEucCcstyE",
          email: "LL1gjqGuzg",
          password: "DGY6je2zRB",
          bio: "GCkS3qXmsT",
          status: "r6udAJy5Bq",
          imageUrl: "jLkjNRe8eg",
          isAdmin: true,
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE USER ", async () => {
    await updateUserOperation(
      {
        _id: updateUserIdOne,
        name: "YiU0Y1085y",
        email: "NV6TEzYmKe",
        password: "rekvHPgFUj",
        bio: "l2NQA50SDx",
        status: "3A4zgLKxvB",
        imageUrl: "Iaf4VRSKZW",
        isAdmin: true,
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY USERS", async () => {
    await updateManyUserOperation(
      [
        {
          _id: updateUserIdOne,
          name: "Y6C8qEP9BM",
          email: "GYG7RkWdLK",
          password: "2B69SaxYU2",
          bio: "UyRT2QButD",
          status: "wT30EpUgrP",
          imageUrl: "lV5LUVpvit",
          isAdmin: true,
        },
        {
          _id: updateUserIdTwo,
          name: "vjpgzYzAT9",
          email: "yfEoND2odx",
          password: "Q18tCbdUyj",
          bio: "iij46eq33W",
          status: "SnTg7sjfEP",
          imageUrl: "QnYw4iJY50",
          isAdmin: true,
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE USER", async () => {
    await deleteUserOperation(String(rawUserData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE USER BY FILTER", async () => {
    await deleteManyUserOperation(String(rawUserData[4]._id.valueOf()), server);
  });
});
