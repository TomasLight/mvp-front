import { RouterState } from "connected-react-router";

import { NotifierStore } from "@shared/templates/Notifier/redux";
import { AppProviderStore } from "@shared/templates/AppProvider/redux";
import { ICommonState } from "@utils/redux";

export class CommonState implements ICommonState {
    router: RouterState;
    appProvider: AppProviderStore;
    notifier: NotifierStore;
}
