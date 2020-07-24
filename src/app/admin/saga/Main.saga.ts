import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";

import { DataFailed, DataService } from "@data";
import { SagaBase } from "@config/saga";

import { MainActions, MainStore, } from "../redux";

export class MainSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<MainStore>) {
        yield put(MainActions.updateStore(partialStore));
    }

    static* checkWorkspace(action: AppAction) {
        yield MainSaga.updateStore({
            workspacesAreLoading: true,
        });

        let hasWorkspace: DataFailed | boolean = yield call(DataService.workspace.hasWorkspaceAsync);
        if (hasWorkspace instanceof DataFailed && !hasWorkspace.actionProcessing.isRedirect()) {
            yield MainSaga.updateStore({
                workspacesAreLoading: false,
            });
            yield SagaBase.displayClientError(hasWorkspace);
            return;
        }

        if (hasWorkspace instanceof DataFailed) {
            hasWorkspace = false;
        }

        const settingsMode = hasWorkspace ? "update" : "create";

        yield MainSaga.updateStore({
            workspacesAreLoading: false,
            settingsMode,
            hasWorkspace,
        });
    }

    static* workspaceWasCreated(action: AppAction) {
        yield MainSaga.updateStore({
            hasWorkspace: true,
        });
    }
}
