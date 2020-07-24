import { IDataSettingsFormValues } from "@admin/Data/models";

export class DataStore {
    dataIsLoading: boolean;
    initialValues: IDataSettingsFormValues;
    settingsAreSending: boolean;

    constructor() {
        this.dataIsLoading = false;
        this.initialValues = {
            archive: null,
        };
        this.settingsAreSending = false;
    }
}
