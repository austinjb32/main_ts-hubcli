import { Document, Model, Schema, model, Types } from "mongoose";

type IAuth = {
  token: string;
  refreshToken: string;
  userId: string;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IAuthDocument extends IAuth, Document {}

export interface IAuthModel extends Model<IAuthDocument> {}

const AuthSchema = new Schema<IAuthDocument, IAuthModel>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AuthModel = model<IAuthDocument, IAuthModel>("auths", AuthSchema);
