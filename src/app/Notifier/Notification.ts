import { OptionsObject, VariantType } from "notistack";
import { ReactNode } from "react";

import { ApiResponse } from "@utils/api";
import { DataFailed } from "../../data/DataFailed";

export interface INotification {
    message: string | ReactNode;
    options?: OptionsObject;
    key?: string;
}

export class Notification implements INotification {
    message: string | ReactNode;
    options?: OptionsObject;
    key?: string;

    constructor(messageOrApiResponse: string | ApiResponse | DataFailed, options: OptionsObject = {}) {
        this.options = options;

        if (messageOrApiResponse instanceof ApiResponse) {
            this.message = messageOrApiResponse.error;
            // this.options.variant = this.chooseVariant(messageOrApiResponse);
            this.options.variant = messageOrApiResponse.hasClientError()
                ? "warning"
                : "error";
        }
        else if (messageOrApiResponse instanceof DataFailed) {
            this.message = messageOrApiResponse.message;
            this.options.variant = messageOrApiResponse.actionProcessing.isError()
                ? "error"
                : "warning";
        }
        else {
            this.message = messageOrApiResponse;
        }
    }
}
