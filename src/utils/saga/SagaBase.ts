import { put } from "@redux-saga/core/effects";

import { INotification, Notification } from "@app/Notifier/Notification";
import { NotifierActions } from "@app/Notifier/redux";
import { ApiResponse } from "@utils/api";

export abstract class SagaBase {
    protected static* displayNotification(notification: INotification) {
        yield put(NotifierActions.enqueueSnackbar(notification));
    }

    protected static* displayClientError(response: ApiResponse) {
        const notification = new Notification(response);
        yield put(NotifierActions.enqueueSnackbar(notification));
    }
}
