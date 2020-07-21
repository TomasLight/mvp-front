import { createAction } from "app-redux-utils";

import { ISetUserData } from "./User.actions.dataTypes";
import { UserStore } from "./User.store";

export class UserActions {
    static readonly PREFIX = "USER_";
    static readonly UPDATE_STORE = UserActions.PREFIX + "UPDATE_STORE";

    static readonly SET_USER = UserActions.PREFIX + "SET_USER";

    static updateStore = (partialStore: Partial<UserStore>) =>
        createAction(UserActions.UPDATE_STORE, partialStore);

    static setUser = (data: ISetUserData) =>
        createAction(UserActions.SET_USER, data);
}
