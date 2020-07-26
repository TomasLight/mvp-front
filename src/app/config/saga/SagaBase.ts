import { put } from "@redux-saga/core/effects";

import { INotification, Notification, NotificationOptions } from "@app/Notifier";
import { NotifierActions } from "@app/Notifier/redux";
import { ApiResponse } from "@utils/api";
import { DataFailed } from "@utils/data/DataFailed";

export abstract class SagaBase {
    protected * displayNotification(notification: INotification) {
        yield put(NotifierActions.enqueueSnackbar(notification));
    }

    protected displaySuccessMessage(message: string) {
        return this.displayMessage(message, { variant: "success" });
    }

    protected displayInfoMessage(message: string) {
        return this.displayMessage(message, { variant: "info" });
    }

    protected displayWarningMessage(message: string) {
        return this.displayMessage(message, { variant: "warning" });
    }

    protected displayClientError(error: ApiResponse | DataFailed) {
        const notification = new Notification(error);
        return this.displayNotification(notification);
    }

    protected displayMessage(message: string, options: NotificationOptions) {
        const notification = new Notification(message, options);
        return this.displayNotification(notification);
    }
}
