import { put } from "@redux-saga/core/effects";

import { INotification, Notification } from "@app/Notifier";
import { NotifierActions } from "@app/Notifier/redux";
import { ApiResponse } from "@utils/api";
import { DataFailed } from "@utils/data/DataFailed";

export abstract class SagaBase {
    protected static* displayNotification(notification: INotification) {
        yield put(NotifierActions.enqueueSnackbar(notification));
    }
    protected static* displayClientError(error: ApiResponse | DataFailed) {
        const notification = new Notification(error);
        yield put(NotifierActions.enqueueSnackbar(notification));
    }

    protected * displayNotification(notification: INotification) {
        yield put(NotifierActions.enqueueSnackbar(notification));
    }
    protected * displayClientError(error: ApiResponse | DataFailed) {
        const notification = new Notification(error);
        yield put(NotifierActions.enqueueSnackbar(notification));
    }
}
