import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { IUserWorkspaceDto } from "@api/models/workspace/responses";
import { WorkspaceApi } from "@api/WorkspaceApi";
import { ApiResponse, ApiResponseStatus, SagaBase } from "@utils";

import { ISetLandingConfigIdData, ISetWorkspaceIdData, MainActions, MainStore, } from "../redux";

export class MainSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<MainStore>) {
        yield put(MainActions.updateStore(partialStore));
    }

    static* loadWorkspaces(action: AppAction) {
        yield MainSaga.updateStore({
            workspacesAreLoading: true,
        });

        const response: ApiResponse<IUserWorkspaceDto[]> = yield WorkspaceApi.get();
        if (response.hasError()) {
            yield MainSaga.updateStore({
                workspacesAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        let settingsMode: "create" | "update" = "update";
        if (response.statusCode === ApiResponseStatus.Forbidden) {
            settingsMode = "create";
        }

        yield MainSaga.updateStore({
            workspacesAreLoading: false,
            settingsMode,
        });
    }

    static* setWorkspaceId(action: AppAction<ISetWorkspaceIdData>) {
        yield MainSaga.updateStore({
            workspaceId: action.payload.workspaceId,
        });
    }

    static* setLandingConfigId(action: AppAction<ISetLandingConfigIdData>) {
        yield MainSaga.updateStore({
            landingConfigId: action.payload.landingConfigId,
        });
    }
}
