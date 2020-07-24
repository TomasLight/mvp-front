import { ContentWatcher } from "@admin/Content/saga";
import { DataWatcher } from "@admin/Data/saga";
import { MainWatcher } from "@admin/saga";
import { SiteWatcher } from "@admin/Site/saga";
import { RootSagaBase } from "@config/saga";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new SiteWatcher(),
            new DataWatcher(),
            new ContentWatcher(),
            new MainWatcher(),
        ]);
    }
}
