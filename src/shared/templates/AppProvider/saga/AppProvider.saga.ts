import { AppAction } from "app-redux-utils";
import { all, put } from "@redux-saga/core/effects";

import { UserApi } from "@api";
import { SetupActions } from "@main/Setup/redux";
import { AuthorizedUser } from "@models";
import { AppProviderSelectors } from "@selectors";
import { ApiResponse, ApiResponseStatus } from "@utils";
import { SagaBase } from "@utils/saga";
import { PageActions } from "@app/redux";

import { AppProviderActions, AppProviderStore, IGetAuthorizedUserData } from "../redux";

export class AppProviderSaga extends SagaBase {
    private static* updateStore(store: Partial<AppProviderStore>) {
        yield put(AppProviderActions.updateStore(store));
    }

    static* initializeMainApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;

        const initializedActions = [
            put(
                AppProviderActions.getAuthorizedUser({
                    callbackAction: () => PageActions.loadPage()(callbackAction),
                })
            ),
        ];

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedActions.length,
        });
        yield all(initializedActions);
    }

    static* initializePosApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;
        const initializedActions = [
            put(AppProviderActions.getAuthorizedUserWithCallback()(callbackAction)),
        ];

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedActions.length,
        });
        yield all(initializedActions);
    }

    static* initializedWorkspaceApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;

        const initializedActions = [
            put(
                AppProviderActions.getAuthorizedUser({
                    callbackAction: () => PageActions.loadPage()(callbackAction),
                })
            ),
        ];

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedActions.length,
        });
        yield all(initializedActions);
    }

    static* getAuthorizedUser(action: AppAction<IGetAuthorizedUserData>) {
        const response: ApiResponse<AuthorizedUser> = yield UserApi.getAuthorizedUser();
        if (response.statusCode === ApiResponseStatus.Unauthorized) {
            const currentUrl = window.location.href;
            window.location.href = `${process.env.AUTHORIZE_URL}?returnUrl=${currentUrl}`;
            return;
        }

        if (response.hasError()) {
            AppProviderSaga.displayClientError(response);
            return;
        }

        const { firstName, lastName } = response.data;

        const userName = `${firstName} ${lastName}`;
        yield put(SetupActions.setUserName({ userName }));

        if (typeof action.payload.callbackAction === "function") {
            yield put(action.payload.callbackAction());
        }
    }

    static* incrementInitializedActions(action: AppAction) {
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
