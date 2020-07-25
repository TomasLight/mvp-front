import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";

import { DataFailed } from "@utils/data";
import { DataService } from "@admin/data";
import { WorkspaceDataSettings } from "@app/models";
import { IImportSettingsFormValues } from "@admin/Import/models";
import { mainUrls } from "@admin/routing";
import { Mapper } from "@utils";
import { SagaBase } from "@config/saga";

import {
    ISubmitSettingsData,
    ImportActions,
    ImportStore,
} from "../redux";

function * updateStore(partialStore: Partial<ImportStore>) {
    yield put(ImportActions.updateStore(partialStore));
}

export class ImportSaga extends SagaBase {
    * submitSettings(action: AppAction<ISubmitSettingsData>) {
        const { formValues } = action.payload;

        const settings = Mapper.map<WorkspaceDataSettings>(
            nameof<IImportSettingsFormValues>(),
            nameof<WorkspaceDataSettings>(),
            formValues
        );

        yield updateStore({
            settingsAreSending: true,
        });

        const result: DataFailed | null = yield call(DataService.workspace.updateDataAsync, settings);
        if (result instanceof DataFailed) {
            yield updateStore({
                settingsAreSending: false,
            });
            yield SagaBase.displayClientError(result);
            return;
        }

        yield updateStore({
            settingsAreSending: false,
        });

        yield put(push(mainUrls.contentSettings));
    }
}
