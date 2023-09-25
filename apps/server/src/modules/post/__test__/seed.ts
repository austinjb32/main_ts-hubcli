import mongoose, { Types } from "mongoose";

export const rawPostData = [
  {
    _id: new Types.ObjectId("65112b68f039f81d56a17230"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "QBQYqnYNFy",
    content: "faHLNVBQ8t",
    imageUrl: "4kL24N7g9A",
    creator: new Types.ObjectId("65112b68f039f81d56a17231"),
    isLiked: true,
  },
  {
    _id: new Types.ObjectId("65112b68f039f81d56a17232"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "TkK0aZUjEZ",
    content: "LGfIubWGMH",
    imageUrl: "9y8dqNV2Bo",
    creator: new Types.ObjectId("65112b68f039f81d56a17233"),
    isLiked: true,
  },
  {
    _id: new Types.ObjectId("65112b68f039f81d56a17234"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "tJLF8PIok0",
    content: "k178YjDFwU",
    imageUrl: "lEf7teqiTe",
    creator: new Types.ObjectId("65112b68f039f81d56a17235"),
    isLiked: true,
  },
  {
    _id: new Types.ObjectId("65112b68f039f81d56a17236"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "nLLuwLKpKf",
    content: "vPXVbW4eh6",
    imageUrl: "nxRvNUgNKo",
    creator: new Types.ObjectId("65112b68f039f81d56a17237"),
    isLiked: true,
  },
  {
    _id: new Types.ObjectId("65112b68f039f81d56a17238"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "OprFrUi9dE",
    content: "H6fqSMRJYh",
    imageUrl: "DcwDqOdoQs",
    creator: new Types.ObjectId("65112b68f039f81d56a17239"),
    isLiked: true,
  },
];

export const seedPost = async () => {
  const { collections } = mongoose.connection;
  const postCollection = collections["posts"];
  console.log(
    "Inserted Doc Ids: ",
    await postCollection.insertMany(rawPostData)
  );
};
