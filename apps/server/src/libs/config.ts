import DataLoader from "dataloader";
import { AuthByIdBatchFunc } from "../modules/auth/auth.loader";
import { UserByIdBatchFunc } from "../modules/user/user.loader";
import { PostByIdBatchFunc } from "../modules/post/post.loader";

export function getLoaders() {
  return {
    authLoader: new DataLoader(AuthByIdBatchFunc),
    userLoader: new DataLoader(UserByIdBatchFunc),
    postLoader: new DataLoader(PostByIdBatchFunc),
  };
}
