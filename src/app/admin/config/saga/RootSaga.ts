import { ContentWatcher } from "@admin/Content/saga";
import { ImportWatcher } from "@admin/Import/saga";
import { MainWatcher } from "@admin/saga";
import { SiteWatcher } from "@admin/Site/saga";
import { RootSagaBase } from "@config/saga";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new SiteWatcher(),
            new ImportWatcher(),
            new ContentWatcher(),
            new MainWatcher(),
        ]);
    }
}
