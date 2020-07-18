import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { MainSelectors } from "@selectors";
import { LandingConfig, UserWorkspace } from "@app/models";
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

        const response: ApiResponse<UserWorkspace[]> = yield WorkspaceApi.getWorkspaces();
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

        const partialStore: Partial<MainStore> = {
            landingConfigIsLoading: false,
        };

        const hasNoLandingConfig = !response.data;
        if (hasNoLandingConfig) {
            partialStore.hasWorkspace = false;
        }
        else {
            partialStore.hasWorkspace = true;
            partialStore.landingConfig = response.data;
        }

        yield MainSaga.updateStore(partialStore);
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
