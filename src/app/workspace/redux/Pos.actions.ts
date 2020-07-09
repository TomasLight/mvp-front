import { createAction, createActionWithCallback } from "app-redux-utils";

import { PosStore } from "./Pos.store";

export class PosActions {
    static readonly PREFIX = "POS_";
    static readonly UPDATE_STORE = PosActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_PAGE = PosActions.PREFIX + "LOAD_PAGE";

    static updateStore = (partialStore: Partial<PosStore>) =>
        createAction(PosActions.UPDATE_STORE, partialStore);

    static loadPage = () => createActionWithCallback(PosActions.LOAD_PAGE);
}
