import { RouterState } from "connected-react-router";

import { NotifierStore } from "@shared/templates/Notifier/redux";
import { AppProviderStore } from "@shared/templates/AppProvider/redux";
import { ICommonState } from "@utils/redux";

export class CommonState implements ICommonState {
    public router: RouterState;
    public appProvider: AppProviderStore;
    public notifier: NotifierStore;
}
