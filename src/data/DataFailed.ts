import { ActionProcessing } from "./ActionProcessing";

interface IDateFailed {
    actionProcessing: ActionProcessing;
    message?: string;
}

export class DataFailed implements IDateFailed {
    actionProcessing: ActionProcessing;
    message?: string;

    constructor(failed: IDateFailed) {
        this.actionProcessing = failed.actionProcessing;
        this.message = failed.message;
    }

    shouldRedirect() {
        return this.actionProcessing.isRedirect();
    }
}
