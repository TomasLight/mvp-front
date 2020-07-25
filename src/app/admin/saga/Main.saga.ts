import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";

import { AuthorizedUser } from "../models";
import { DataFailed } from "@utils/data";
import { DataService } from "@admin/data";
import { SagaBase } from "@config/saga";
import { MainActions, MainStore, } from "../redux";

function * updateStore(partialStore: Partial<MainStore>) {
    yield put(MainActions.updateStore(partialStore));
}

export class MainSaga extends SagaBase {
    * checkUserAuthorization(action: AppAction) {
        const user: DataFailed | AuthorizedUser = yield call(DataService.user.authorizedUserAsync);
        if (user instanceof DataFailed) {
            action.stop();

            if (user.actionProcessing.isRedirect()) {
                const currentUrl = window.location.href;
                window.location.href = `${process.env.AUTHORIZE_URL}?returnUrl=${currentUrl}`;
                return;
            }

            this.displayClientError(user);
            return;
        }

        yield updateStore({
            authorizedUser: user,
        });
    }

    * checkWorkspace(action: AppAction) {
        yield updateStore({
            workspacesAreLoading: true,
        });

        let hasWorkspace: DataFailed | boolean = yield call(DataService.workspace.hasWorkspaceAsync);
        if (hasWorkspace instanceof DataFailed && !hasWorkspace.actionProcessing.isRedirect()) {
            yield updateStore({
                workspacesAreLoading: false,
            });
            yield this.displayClientError(hasWorkspace);
            return;
        }

        if (hasWorkspace instanceof DataFailed) {
            hasWorkspace = false;
        }

        const settingsMode = hasWorkspace ? "update" : "create";

        yield updateStore({
            appIsInitialized: true,
            workspacesAreLoading: false,
            settingsMode,
            hasWorkspace,
        });
    }

    * workspaceWasCreated(action: AppAction) {
        yield updateStore({
            hasWorkspace: true,
        });
    }
}
