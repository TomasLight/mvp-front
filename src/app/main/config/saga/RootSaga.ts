import { PageWatcher } from "@app/saga";
import { ContentWatcher } from "@main/Content/saga";
import { SetupWatcher } from "@main/Setup/saga";
import { AppProviderWatcher } from "@shared/templates/AppProvider/saga";
import { RootSagaBase } from "@utils/saga";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),
            new SetupWatcher(),
            new ContentWatcher(),
            new PageWatcher(),
        ]);
    }
}
