import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { MainSelectors } from "@selectors";
import { LandingConfig } from "@app/models";
import { IUserWorkspaceDto } from "@api/models/workspace/responses";
import { WorkspaceApi } from "@api/WorkspaceApi";
import { SagaBase } from "@config/saga";
import { ApiResponse, ApiResponseStatus } from "@utils";

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

    static* loadLandingConfig(action: AppAction) {
        yield MainSaga.updateStore({
            landingConfigIsLoading: true,
        });

        const response: ApiResponse<LandingConfig> = yield WorkspaceApi.getLandingConfig();
        if (response.hasError()) {
            yield MainSaga.updateStore({
                landingConfigIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield MainSaga.updateStore({
            landingConfig: response.data,
            landingConfigIsLoading: false,
        });
    }

    static* setWorkspaceId(action: AppAction<ISetWorkspaceIdData>) {
        const landingConfig: LandingConfig = yield MainSelectors.getLandingConfig();
        landingConfig.workspaceId = action.payload.workspaceId;

        yield MainSaga.updateStore({
            landingConfig,
        });
    }

    static* setLandingConfigId(action: AppAction<ISetLandingConfigIdData>) {
        const landingConfig: LandingConfig = yield MainSelectors.getLandingConfig();
        landingConfig.id = action.payload.landingConfigId;

        yield MainSaga.updateStore({
            landingConfig,
        });
    }
}
