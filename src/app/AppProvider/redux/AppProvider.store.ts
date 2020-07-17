export class AppProviderStore {
    initialized: boolean;

    targetActionsAmount: number;
    initializedActionsAmount: number;

    constructor() {
        this.initialized = false;

        this.initializedActionsAmount = 0;
        this.targetActionsAmount = 0;
    }
}
