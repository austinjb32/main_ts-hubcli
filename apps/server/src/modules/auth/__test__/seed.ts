import mongoose, { Types } from "mongoose";

export const rawAuthData = [
  {
    _id: new Types.ObjectId("651121012bbe50d6d06a14f2"),
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "uIh64VDWZD",
    refreshToken: "CnF9LlSwrG",
    userId: "cTKDols7RY",
  },
  {
    _id: new Types.ObjectId("651121012bbe50d6d06a14f3"),
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "XyiUfMHjhM",
    refreshToken: "iQComrhNy7",
    userId: "rgj11G1ziK",
  },
  {
    _id: new Types.ObjectId("651121012bbe50d6d06a14f4"),
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "HXsPZNbyPN",
    refreshToken: "RYFLugveTB",
    userId: "5sqRSFUE75",
  },
  {
    _id: new Types.ObjectId("651121012bbe50d6d06a14f5"),
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "w4FAgiJCFS",
    refreshToken: "eBuYfJVE2e",
    userId: "JOErNyT05x",
  },
  {
    _id: new Types.ObjectId("651121012bbe50d6d06a14f6"),
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "hkUXdBJRX0",
    refreshToken: "L3JU71IrJE",
    userId: "eTnDypldY8",
  },
];

export const seedAuth = async () => {
  const { collections } = mongoose.connection;
  const authCollection = collections["auths"];
  console.log(
    "Inserted Doc Ids: ",
    await authCollection.insertMany(rawAuthData)
  );
};
