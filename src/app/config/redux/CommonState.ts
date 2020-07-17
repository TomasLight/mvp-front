import { RouterState } from "connected-react-router";

import { AppProviderStore } from "@app/AppProvider/redux";
import { NotifierStore } from "@app/Notifier/redux";
import { UserStore } from "@app/redux";

export interface ICommonState {
    router: RouterState;
    notifier: NotifierStore;
}

export class CommonState implements ICommonState {
    router: RouterState;
    appProvider: AppProviderStore;
    notifier: NotifierStore;
    user: UserStore;
}
