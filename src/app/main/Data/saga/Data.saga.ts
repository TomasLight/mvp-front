import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";

import { WorkspaceDataSettings } from "@app/models";
import { IDataSettingsFormValues } from "@main/Data/models";
import { MainSelectors } from "@selectors";
import { mainUrls } from "@main/routing";
import { WorkspaceApi } from "@api/WorkspaceApi";
import { ApiResponse, Mapper } from "@utils";
import { SagaBase } from "@utils/saga/SagaBase";

import {
    ISubmitSettingsData,
    DataActions,
    DataStore,
} from "../redux";

export class DataSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<DataStore>) {
        yield put(DataActions.updateStore(partialStore));
    }

    static* submitSettings(action: AppAction<ISubmitSettingsData>) {
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceDataSettings>(
            nameof<IDataSettingsFormValues>(),
            nameof<WorkspaceDataSettings>(),
            formValues
        );

        yield DataSaga.updateStore({
            settingsAreSending: true,
        });

        const workspaceId: string = yield MainSelectors.getWorkspaceId();
        const landingConfigId: string = yield MainSelectors.getLandingConfigId();

        const response: ApiResponse = yield WorkspaceApi.updateDataSettings(
            workspaceId,
            landingConfigId,
            settings
        );
        if (response.hasError()) {
            yield DataSaga.updateStore({
                settingsAreSending: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield DataSaga.updateStore({
            settingsAreSending: false,
        });

        yield put(push(mainUrls.contentSettings));
    }
}
