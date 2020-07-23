import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";

import { DataFailed, DataService } from "@data";
import { WorkspaceDataSettings } from "@app/models";
import { IDataSettingsFormValues } from "@main/Data/models";
import { mainUrls } from "@main/routing";
import { Mapper } from "@utils";
import { SagaBase } from "@config/saga";

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

        const result: DataFailed | null = yield call(DataService.workspace.updateDataAsync, settings);
        if (result instanceof DataFailed) {
            yield DataSaga.updateStore({
                settingsAreSending: false,
            });
            yield SagaBase.displayClientError(result);
            return;
        }

        yield DataSaga.updateStore({
            settingsAreSending: false,
        });

        yield put(push(mainUrls.contentSettings));
    }
}
