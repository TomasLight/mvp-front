import { INotification } from "../Notification";

export class NotifierStore {
    notifications: INotification[];

    constructor() {
        this.notifications = [];
    }
}
