import { Reducer } from "app-redux-utils";

import { SiteActions } from "./Site.actions";
import { SiteStore } from "./Site.store";

export const SiteReducer = Reducer(new SiteStore(), SiteActions.UPDATE_STORE);
