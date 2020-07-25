import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { SagaBase } from "@config/saga/SagaBase";
import { UserActions, UserStore, ISetUserData } from "../redux";

function * updateStore(partialStore: Partial<UserStore>) {
    yield put(UserActions.updateStore(partialStore));
}

export class UserSaga extends SagaBase {
    * setUser(action: AppAction<ISetUserData>) {
        const { user } = action.payload;

        yield updateStore({
            authorizedUser: user,
        });
    }
}
