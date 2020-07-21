import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";

import { DataFailed, DataService } from "@data";
import { MainSelectors } from "@selectors";
import { LandingConfig, UserWorkspace } from "@app/models";
import { SagaBase } from "@config/saga";
import { ApiResponse } from "@utils";

import { ISetLandingConfigIdData, ISetWorkspaceIdData, MainActions, MainStore, } from "../redux";

export class MainSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<MainStore>) {
        yield put(MainActions.updateStore(partialStore));
    }

    static* loadWorkspaces(action: AppAction) {
        yield MainSaga.updateStore({
            workspacesAreLoading: true,
        });

        const workspaces: DataFailed | UserWorkspace[] = yield call(DataService.workspace.listAsync);
        if (workspaces instanceof DataFailed && !workspaces.actionProcessing.isRedirect()) {
            yield MainSaga.updateStore({
                workspacesAreLoading: false,
            });
            yield SagaBase.displayClientError(workspaces);
            return;
        }

        let settingsMode: "create" | "update" = "update";
        if (workspaces instanceof DataFailed || workspaces.length === 0) {
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

        const landingConfig: DataFailed | LandingConfig = yield call(DataService.workspace.landingConfigAsync);
        if (landingConfig instanceof DataFailed) {
            yield MainSaga.updateStore({
                landingConfigIsLoading: false,
            });
            yield SagaBase.displayClientError(landingConfig);
            return;
        }

        const partialStore: Partial<MainStore> = {
            landingConfigIsLoading: false,
        };

        if (!landingConfig) {
            partialStore.hasWorkspace = false;
        }
        else {
            partialStore.hasWorkspace = true;
            partialStore.landingConfig = landingConfig;
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
