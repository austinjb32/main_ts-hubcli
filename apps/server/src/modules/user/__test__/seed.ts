import mongoose, { Types } from "mongoose";

export const rawUserData = [
  {
    _id: new Types.ObjectId("65111ea91a341f53186815fc"),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "yvPYAb4GAs",
    email: "fFAtRl3gQJ",
    password: "XkpYZNQoTP",
    bio: "UpNsGhvdqR",
    status: "WWxJid6Msi",
    imageUrl: "6YfcFjR1v8",
    isAdmin: true,
  },
  {
    _id: new Types.ObjectId("65111ea91a341f53186815fd"),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "jFXCO4J8Hr",
    email: "0B252O1ZEZ",
    password: "mgCMmIRrvk",
    bio: "0iGD44FwrF",
    status: "H7D0ExC2ct",
    imageUrl: "eR7hPnvMwG",
    isAdmin: true,
  },
  {
    _id: new Types.ObjectId("65111ea91a341f53186815fe"),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "abjKWl7P5N",
    email: "Y9lpZ1UHDB",
    password: "AnGM4FWmy1",
    bio: "m5a65uUstj",
    status: "H44eurrl6a",
    imageUrl: "705psS9dAx",
    isAdmin: true,
  },
  {
    _id: new Types.ObjectId("65111ea91a341f53186815ff"),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "3G9FsUFrX9",
    email: "bQuT6FLvTE",
    password: "bwH1xy0ex7",
    bio: "AhrpgLa7dV",
    status: "oto6oGeHIh",
    imageUrl: "dXyiU6VHhL",
    isAdmin: true,
  },
  {
    _id: new Types.ObjectId("65111ea91a341f5318681600"),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "W8ZRIAszxU",
    email: "6jx7l2dqI4",
    password: "XcvP5zSG16",
    bio: "DOpnEGPXNa",
    status: "0JGfNyhYpD",
    imageUrl: "1JYLI4rGqY",
    isAdmin: true,
  },
];

export const seedUser = async () => {
  const { collections } = mongoose.connection;
  const userCollection = collections["users"];
  console.log(
    "Inserted Doc Ids: ",
    await userCollection.insertMany(rawUserData)
  );
};
