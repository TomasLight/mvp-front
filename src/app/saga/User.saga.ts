import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { SagaBase } from "@config/saga/SagaBase";

import { UserActions, UserStore, ISetUserData } from "../redux";

export class UserSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<UserStore>) {
        yield put(UserActions.updateStore(partialStore));
    }

    static* setUser(action: AppAction<ISetUserData>) {
        const { user } = action.payload;

        yield UserSaga.updateStore({
            authorizedUser: user,
        });
    }
}
