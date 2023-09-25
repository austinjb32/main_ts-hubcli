import mongoose, { Document, Model, Schema, model, Types } from "mongoose";

type IAuth = {
  accessToken: string;
  refreshToken: string;
  userId: Types.ObjectId;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IAuthDocument extends IAuth, Document {}

export interface IAuthModel extends Model<IAuthDocument> {}

const AuthSchema = new Schema<IAuthDocument, IAuthModel>(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

export const AuthModel = model<IAuthDocument, IAuthModel>("auths", AuthSchema);
