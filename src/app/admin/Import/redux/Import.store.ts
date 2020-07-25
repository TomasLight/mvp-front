import { IImportSettingsFormValues } from "@admin/Import/models";

export class ImportStore {
    dataIsLoading: boolean;
    initialValues: IImportSettingsFormValues;
    settingsAreSending: boolean;

    constructor() {
        this.dataIsLoading = false;
        this.initialValues = {
            archive: null,
        };
        this.settingsAreSending = false;
    }
}
