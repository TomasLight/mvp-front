import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";

import { DataService } from "@admin/data";
import { WorkspaceDataSettings } from "@app/models";
import { MainSelectors } from "@admin/redux";
import { mainUrls } from "@admin/routing";
import { DataFailed } from "@utils/data";
import { Mapper } from "@utils/mapping";
import { SagaBase } from "@config/saga";
import { Translate } from "@utils/translates";
import { IImportSettingsFormValues } from "../models";

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

        const settingsMode: "create" | "update" = yield MainSelectors.getSettingsMode();
        if (settingsMode === "create") {
            yield put(push(mainUrls.contentSettings));
        }
    }
}
