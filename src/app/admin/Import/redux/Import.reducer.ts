import { Reducer } from "app-redux-utils";

import { ImportActions } from "./Import.actions";
import { ImportStore } from "./Import.store";

export const ImportReducer = Reducer(new ImportStore(), ImportActions.UPDATE_STORE);
