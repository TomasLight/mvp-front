import { ContentWatcher } from "@main/Content/saga";
import { DataWatcher } from "@main/Data/saga";
import { MainWatcher } from "@main/saga";
import { SiteWatcher } from "@main/Site/saga";
import { AppProviderWatcher } from "@shared/templates/AppProvider/saga";
import { RootSagaBase } from "@utils/saga";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),
            new SiteWatcher(),
            new DataWatcher(),
            new ContentWatcher(),
            new MainWatcher(),
        ]);
    }
}
