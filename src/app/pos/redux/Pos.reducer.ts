import { Reducer } from "app-redux-utils";

import { PosActions } from "./Pos.actions";
import { PosStore } from "./Pos.store";

export const PosReducer = Reducer(new PosStore(), PosActions.UPDATE_STORE);
