import { IAuthDocument, AuthModel } from "./auth.model";

export async function AuthByIdBatchFunc(ids: readonly string[]) {
  const auths = await AuthModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) =>
    auths.find((auth: IAuthDocument) => String(auth._id.valueOf()) === id)
  );
}
