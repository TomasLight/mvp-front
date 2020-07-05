import { RouterState } from "connected-react-router";

import { NotifierStore } from "@shared/templates/Notifier/redux";

export interface ICommonState {
    router: RouterState;
    notifier: NotifierStore;
}
