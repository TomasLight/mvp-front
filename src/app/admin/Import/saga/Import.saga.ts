import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";

import { DataFailed } from "@utils/data";
import { DataService } from "@admin/data";
import { WorkspaceDataSettings } from "@app/models";
import { IImportSettingsFormValues } from "@admin/Import/models";
import { mainUrls } from "@admin/routing";
import { Mapper, Translate } from "@utils";
import { SagaBase } from "@config/saga";

import {
    ISubmitSettingsData,
    ImportActions,
    ImportStore,
} from "../redux";

function* updateStore(partialStore: Partial<ImportStore>) {
    yield put(ImportActions.updateStore(partialStore));
}

export class ImportSaga extends SagaBase {
    constructor() {
        super();
        this.submitSettings = this.submitSettings.bind(this);
    }

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
            yield this.displayClientError(result);
            return;
        }

        yield updateStore({
            settingsAreSending: false,
        });

        yield this.displaySuccessMessage(Translate.getString("Меню импортировано"));
        yield put(push(mainUrls.contentSettings));
    }
}
