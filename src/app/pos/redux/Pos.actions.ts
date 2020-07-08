import { createAction, createActionWithCallback } from "app-redux-utils";

import { PosStore } from "./Pos.store";

export class PosActions {
    public static readonly PREFIX = "POS_";
    public static readonly UPDATE_STORE = PosActions.PREFIX + "UPDATE_STORE";

    public static readonly LOAD_PAGE = PosActions.PREFIX + "LOAD_PAGE";

    public static updateStore = (partialStore: Partial<PosStore>) =>
        createAction(PosActions.UPDATE_STORE, partialStore);

    public static loadPage = () => createActionWithCallback(PosActions.LOAD_PAGE);
}
