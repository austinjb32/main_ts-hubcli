import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createPostOperation,
  createManyPostOperation,
  deletePostOperation,
  deleteManyPostOperation,
  getAllPostCountOperation,
  getAllPostOperation,
  getPostByIdOperation,
  getOnePostOperation,
  updatePostOperation,
  updateManyPostOperation,
} from "./__test__/operations";
import { rawPostData, seedPost } from "./__test__/seed";

describe("Post Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedPost();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST POST BY ID", async () => {
    await getPostByIdOperation(String(rawPostData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST POSTS", async () => {
    await getAllPostOperation(String(rawPostData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE POST", async () => {
    await getOnePostOperation(String(rawPostData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT POSTS", async () => {
    await getAllPostCountOperation(server);
  });

  it("Positive - MUTATION: CREATE POST", async () => {
    await createPostOperation(
      {
        title: "t3ahtgePuE",
        content: "89vWbr2ww6",
        imageUrl: "xlJ54fo479",
        creator: "65112b68f039f81d56a1722a",
        isLiked: true,
      },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY POSTS", async () => {
    const newUsers = await createManyPostOperation(
      [
        {
          title: "rnPMyvyDhH",
          content: "BENwG2sfur",
          imageUrl: "qQj2E18Onr",
          creator: "65112b68f039f81d56a1722b",
          isLiked: true,
        },
        {
          title: "BiE3DJewmI",
          content: "47lDIVfLpO",
          imageUrl: "HLKgvO40LK",
          creator: "65112b68f039f81d56a1722c",
          isLiked: true,
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE POST ", async () => {
    await updatePostOperation(
      {
        _id: updateUserIdOne,
        title: "TnvAjVmtmx",
        content: "DCrjdkb3ua",
        imageUrl: "XAbSXr2s4F",
        creator: "65112b68f039f81d56a1722d",
        isLiked: true,
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY POSTS", async () => {
    await updateManyPostOperation(
      [
        {
          _id: updateUserIdOne,
          title: "2EaWrKGxjR",
          content: "01MldnOImZ",
          imageUrl: "FB0pHPU23J",
          creator: "65112b68f039f81d56a1722e",
          isLiked: true,
        },
        {
          _id: updateUserIdTwo,
          title: "TVEwSd9mQz",
          content: "SsfgdcUfDx",
          imageUrl: "d9kganZbw2",
          creator: "65112b68f039f81d56a1722f",
          isLiked: true,
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE POST", async () => {
    await deletePostOperation(String(rawPostData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE POST BY FILTER", async () => {
    await deleteManyPostOperation(String(rawPostData[4]._id.valueOf()), server);
  });
});
