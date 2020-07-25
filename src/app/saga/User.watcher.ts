import { Watcher } from "app-saga-utils";

import { UserActions } from "../redux";
import { UserSaga } from "./User.saga";

export class UserWatcher extends Watcher {
    constructor() {
        super();
        const saga = new UserSaga();

        this.watchLatest(
            UserActions.SET_USER,
            saga.setUser
        );
    }
}
