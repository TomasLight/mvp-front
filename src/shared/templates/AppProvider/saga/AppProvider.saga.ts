import { PosActions } from "@pos/redux";
import { AppAction } from "app-redux-utils";
import { all, put } from "@redux-saga/core/effects";

import { UserApi } from "@api";
import { AuthorizedUser } from "@models";
import { AppProviderSelectors } from "@selectors";
import { ApiResponse } from "@utils";
import { SagaBase } from "@utils/saga";

import { AppProviderActions, AppProviderStore } from "../redux";

export class AppProviderSaga extends SagaBase {
    private static* updateStore(store: Partial<AppProviderStore>) {
        yield put(AppProviderActions.updateStore(store));
    }

    public static* initializeMainApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;
        const initializedActions = [
            put(AppProviderActions.getAuthorizedUser()(callbackAction)),
        ];

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedActions.length,
        });
        yield all(initializedActions);
    }

    public static* initializePosApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;
        const initializedActions = [
            put(AppProviderActions.getAuthorizedUser()(callbackAction)),
            put(PosActions.loadPage()(callbackAction)),
        ];

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedActions.length,
        });
        yield all(initializedActions);
    }

    public static* initializedWorkspaceApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;
        const initializedActions = [
            put(AppProviderActions.getAuthorizedUser()(callbackAction)),
        ];

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedActions.length,
        });
        yield all(initializedActions);
    }

    public static* getAuthorizedUser(action: AppAction) {
        const response: ApiResponse<AuthorizedUser> = yield UserApi.getAuthorizedUser();
        if (response.hasError()) {
            AppProviderSaga.displayClientError(response);
            return;
        }

        if (!response.data || !response.data.id) {
            const currentUrl = window.location.href;
            window.location.href = `${process.env.AUTHORIZE_URL}?returnUrl=${currentUrl}`;
        }
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
