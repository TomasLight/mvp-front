import { ApiResponse } from "@utils";
import { ActionProcessing } from "./ActionProcessing";
import { DataFailed } from "./DataFailed";

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
