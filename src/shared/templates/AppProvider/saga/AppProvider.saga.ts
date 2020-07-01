import { AppAction } from "app-redux-utils";
import { all, put } from "@redux-saga/core/effects";

import { AppProviderSelectors } from "@selectors/AppProvider.store.selectors";
import { SagaBase } from "@utils/saga/SagaBase";

import { AppProviderActions } from "../redux/AppProvider.actions";
import { AppProviderStore } from "../redux/AppProvider.store";

export class AppProviderSaga extends SagaBase {
    private static* updateStore(store: Partial<AppProviderStore>) {
        yield put(AppProviderActions.updateStore(store));
    }

    public static* initializeApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;
        const initializedActions = [
            // put(UsersActions.loadCurrentUser()(callbackAction)),
            // put(UsersActions.loadUsers()(callbackAction)),
        ];

        yield AppProviderSaga.updateStore({
            // targetActionsAmount: initializedActions.length,
            initialized: true,
        });
        yield all(initializedActions);
    }

    public static* incrementInitializedActions(action: AppAction) {
        const store: AppProviderStore = yield AppProviderSelectors.getStore();

        const newAmount = store.initializedActionsAmount + 1;
        const updatedStore: Partial<AppProviderStore> = {
            initializedActionsAmount: newAmount,
        };

        if (newAmount >= store.targetActionsAmount) {
            updatedStore.initialized = true;
        }

        yield AppProviderSaga.updateStore(updatedStore);
    }
}
