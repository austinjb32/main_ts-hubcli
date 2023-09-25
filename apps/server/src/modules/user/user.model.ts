import { Document, Model, Schema, model, Types } from "mongoose";
import isEmail from "validator/es/lib/isEmail";
type IUser = {
  name: string;
  email: string;
  password: string;
  bio: string;
  status: string;
  imageUrl: string;
  isAdmin: boolean;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: false,
      unique: false,
    },
    bio: {
      type: String,
      default: "No Bio",
      required: false,
      unique: false,
      minlength: 5,
    },
    status: {
      type: String,
      required: false,
      unique: false,
    },
    imageUrl: {
      type: String,
      required: false,
      default: null,
      unique: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      unique: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUserDocument, IUserModel>("users", UserSchema);
