import { RootSaga } from "app-saga-utils";

export class RootSagaBase extends RootSaga {
    constructor() {
        super();

        this.addWatchers([
        ]);
    }
}
