import Joi from "joi";
import {
  CreatePostInput,
  CreateUserInput,
  MutationCreatePostArgs,
  MutationCreateUserArgs,
  MutationUpdatePostArgs,
  QueryUserLoginArgs,
  UpdatePostInput,
} from "../types";

export const loginValidation = (login: QueryUserLoginArgs) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  });

  return loginSchema.validate(login);
};

export const userCreationValidation = (user: CreateUserInput) => {
  const userCreateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
      .min(8)
      .max(30)
      .required(),
    confirmPassword: Joi.ref("password"),
    name: Joi.string().min(3).required(),
  });

  return userCreateSchema.validate(user);
};

export const postCreationValidation = (post: CreatePostInput) => {
  const postCreateSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(8).max(30).required(),
    imageUrl: Joi.string().min(3),
  });

  return postCreateSchema.validate(post);
};
export const postUpdationValidation = (postEdit: UpdatePostInput) => {
  const postUpdateSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(8).max(30).required(),
    imageUrl: Joi.string().min(3),
  });

  return postUpdateSchema.validate(postEdit);
};
