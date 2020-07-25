import { RouterState } from "connected-react-router";

import { NotifierStore } from "@app/Notifier/redux";

export interface ICommonState {
    router: RouterState;
    notifier: NotifierStore;
}

export class CommonState implements ICommonState {
    router: RouterState;
    notifier: NotifierStore;
}
