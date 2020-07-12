import { Reducer } from "app-redux-utils";

import { ContentActions } from "./Content.actions";
import { ContentStore } from "./Content.store";

export const ContentReducer = Reducer(new ContentStore(), ContentActions.UPDATE_STORE);
