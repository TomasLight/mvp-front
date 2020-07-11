import { Reducer } from "app-redux-utils";

import { SetupActions } from "./Setup.actions";
import { SetupStore } from "./Setup.store";

export const SetupReducer = Reducer(new SetupStore(), SetupActions.UPDATE_STORE);
