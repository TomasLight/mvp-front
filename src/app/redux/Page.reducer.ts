import { Reducer } from "app-redux-utils";

import { PageActions } from "./Page.actions";
import { PageStore } from "./Page.store";

export const PageReducer = Reducer(new PageStore(), PageActions.UPDATE_STORE);
