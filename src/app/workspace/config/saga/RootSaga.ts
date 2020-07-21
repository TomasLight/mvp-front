import { RootSagaBase } from "@config/saga";
import { MenuWatcher } from "@ws/Menu/saga";
import { WorkspaceWatcher } from "@ws/saga";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new WorkspaceWatcher(),
            new MenuWatcher(),
        ]);
    }
}
