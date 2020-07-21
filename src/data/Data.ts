import { DataFailed } from "./DataFailed";

export type Data<TModel> = Promise<DataFailed | TModel>;
