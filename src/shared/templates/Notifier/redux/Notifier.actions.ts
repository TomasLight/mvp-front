import { createAction } from "app-redux-utils";

import { Guid } from "@utils/Guid";
import { INotification } from "../Notification";

export class NotifierActions {
    static readonly PREFIX = "NOTIFIER_";

    static readonly ENQUEUE_SNACKBAR = NotifierActions.PREFIX + "ENQUEUE_SNACKBAR";
    static readonly REMOVE_SNACKBAR = NotifierActions.PREFIX + "REMOVE_SNACKBAR";

    static enqueueSnackbar = (notification: INotification) =>
        createAction(NotifierActions.ENQUEUE_SNACKBAR, {
            ...notification,
            key: Guid.generate(),
        });

    static removeSnackbar = (key: string) =>
        createAction(NotifierActions.REMOVE_SNACKBAR, { key });
}
