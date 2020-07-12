import { PageWatcher } from "@app/saga";
import { MenuWatcher } from "@ws/Menu/saga";
import { WorkspaceWatcher } from "@ws/saga";
import { AppProviderWatcher } from "@shared/templates/AppProvider/saga";
import { RootSagaBase } from "@utils/saga";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),
            new WorkspaceWatcher(),
            new MenuWatcher(),
            new PageWatcher(),
        ]);
    }
}
