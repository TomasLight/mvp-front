import { Reducer } from "app-redux-utils";

import { MainActions } from "./Main.actions";
import { MainStore } from "./Main.store";

export const MainReducer = Reducer(new MainStore(), MainActions.UPDATE_STORE);
