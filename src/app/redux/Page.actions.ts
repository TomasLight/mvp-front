import { createAction, createActionWithCallback } from "app-redux-utils";

import { PageStore } from "./Page.store";

export class PageActions {
    static readonly PREFIX = "WORKSPACE_";
    static readonly UPDATE_STORE = PageActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_PAGE = PageActions.PREFIX + "LOAD_PAGE";

    static updateStore = (partialStore: Partial<PageStore>) =>
        createAction(PageActions.UPDATE_STORE, partialStore);

    static loadPage = () => createActionWithCallback(PageActions.LOAD_PAGE);
}
