import { Watcher } from "app-saga-utils";

import { UserActions } from "../redux";
import { UserSaga } from "./User.saga";

export class UserWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            UserActions.SET_USER,
            UserSaga.setUser
        );
    }
}
