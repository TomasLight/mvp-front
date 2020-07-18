import { AppAction } from "app-redux-utils";
import { all, put } from "@redux-saga/core/effects";

import { UserApi } from "@api";
import { UserActions } from "@app/redux";
import { AuthorizedUser } from "@models/user";
import { MainActions } from "@main/redux";
import { AppProviderSelectors } from "@selectors";
import { WorkspaceActions } from "@ws/redux";
import { ApiResponse, ApiResponseStatus } from "@utils/api";
import { SagaBase } from "@config/saga/SagaBase";

import { AppProviderActions, AppProviderStore, IGetAuthorizedUserData } from "../redux";

export class AppProviderSaga extends SagaBase {
    private static* updateStore(store: Partial<AppProviderStore>) {
        yield put(AppProviderActions.updateStore(store));
    }

    static* initializeMainApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;

        const landingAction = MainActions.loadLandingConfig();
        landingAction.callbackAction = callbackAction;

        const workspaceAction = MainActions.loadWorkspaces();
        workspaceAction.callbackAction = callbackAction;

        const initializedAction = AppProviderActions.getAuthorizedUser();
        initializedAction.actions.push(landingAction);
        initializedAction.actions.push(workspaceAction);

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedAction.actions.length,
        });
        yield put(initializedAction);
    }

    static* initializePosApp(action: AppAction) {
        // const callbackAction = AppProviderActions.incrementInitializedActions;
        // const initializedActions = [
        //     put(AppProviderActions.getAuthorizedUserWithCallback()(callbackAction)),
        // ];
        //
        yield AppProviderSaga.updateStore({
            initialized: true,
            // targetActionsAmount: initializedActions.length,
        });
        // yield all(initializedActions);
    }

    static* initializedWorkspaceApp(action: AppAction) {
        const callbackAction = AppProviderActions.incrementInitializedActions;
        const loadWorkspacesActionCallback = () => WorkspaceActions.loadWorkspaces()(callbackAction);

        const initializedActions = [
            put(AppProviderActions.getAuthorizedUserWithCallback()(loadWorkspacesActionCallback)),
        ];

        yield AppProviderSaga.updateStore({
            targetActionsAmount: initializedActions.length,
        });
        yield all(initializedActions);
    }

    static* getAuthorizedUser(action: AppAction<IGetAuthorizedUserData>) {
        const response: ApiResponse<AuthorizedUser> = yield UserApi.getAuthorizedUser();
        if (response.hasError()) {
            action.stop();

            if (response.statusCode === ApiResponseStatus.Unauthorized) {
                const currentUrl = window.location.href;
                window.location.href = `${process.env.AUTHORIZE_URL}?returnUrl=${currentUrl}`;
                return;
            }

            AppProviderSaga.displayClientError(response);
            return;
        }

        yield put(UserActions.setUser({ user: response.data }));
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
