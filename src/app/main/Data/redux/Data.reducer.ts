import { Reducer } from "app-redux-utils";

import { DataActions } from "./Data.actions";
import { DataStore } from "./Data.store";

export const DataReducer = Reducer(new DataStore(), DataActions.UPDATE_STORE);
