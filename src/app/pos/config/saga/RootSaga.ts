import { MenuWatcher } from "@pos/Menu/saga";
import { PosWatcher } from "@pos/saga";
import { AppProviderWatcher } from "@shared/templates/AppProvider/saga";
import { RootSagaBase } from "@utils/saga";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),
            new PosWatcher(),
            new MenuWatcher(),
        ]);
    }
}
