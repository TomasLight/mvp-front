import { ApiResponse } from "@utils/api";
import { ActionProcessing } from "@utils/data/ActionProcessing";
import { DataFailed } from "@utils/data/DataFailed";

export abstract class DataServiceBase {
    constructor() {
        this.failed = this.failed.bind(this);
    }

    protected failed(response: ApiResponse): DataFailed {
        const actionProcessing = new ActionProcessing("display");
        if (response.hasClientError()) {
            actionProcessing.addWarning();
        }
        else {
            actionProcessing.addError();
        }

        return new DataFailed({
            actionProcessing,
            message: response.error,
        });
    }
}
