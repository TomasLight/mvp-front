import { AppAction } from "app-redux-utils";
import { all, call, put } from "@redux-saga/core/effects";

import { DataFailed, DataService } from "@data";
import { UserActions } from "@app/redux";
import { AuthorizedUser } from "@models/user";
import { MainActions } from "@admin/redux";
import { AppProviderSelectors } from "@selectors";
import { WorkspaceActions } from "@ws/redux";
import { SagaBase } from "@config/saga/SagaBase";

import { AppProviderActions, AppProviderStore, IGetAuthorizedUserData } from "../redux";

export class AppProviderSaga extends SagaBase {
    private static* updateStore(store: Partial<AppProviderStore>) {
        yield put(AppProviderActions.updateStore(store));
    }

    static* initializeMainApp(action: AppAction) {
        const initializedAction = AppProviderActions.getAuthorizedUser();

        const workspaceAction = MainActions.checkWorkspace();
        workspaceAction.callbackAction = AppProviderActions.incrementInitializedActions;

        initializedAction.actions.push(workspaceAction);

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedAction.actions.length,
        });
        yield put(initializedAction);
    }

    static* getAuthorizedUser(action: AppAction<IGetAuthorizedUserData>) {
        const user: DataFailed | AuthorizedUser = yield call(DataService.user.authorizedUserAsync);
        if (user instanceof DataFailed) {
            action.stop();

            if (user.actionProcessing.isRedirect()) {
                const currentUrl = window.location.href;
                window.location.href = `${process.env.AUTHORIZE_URL}?returnUrl=${currentUrl}`;
                return;
            }

            AppProviderSaga.displayClientError(user);
            return;
        }

        yield put(UserActions.setUser({ user }));
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
