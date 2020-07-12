import { select } from "redux-saga/effects";

import { State } from "@WsState";

export class WorkspaceSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.workspace;
    }
}
