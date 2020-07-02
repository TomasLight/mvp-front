import { RouterState } from "connected-react-router";

import { NotifierStore } from "@app/Notifier/redux";

export interface IAppState {
    router: RouterState;
    notifierStore: NotifierStore;
}
