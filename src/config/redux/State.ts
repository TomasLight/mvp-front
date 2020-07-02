import { RouterState } from "connected-react-router";

import { IAppState } from "@utils/redux";
import { NotifierStore } from "@app/Notifier/redux";
import { AppProviderStore } from "@shared/templates/AppProvider/redux";

export class State implements IAppState {
    public router: RouterState;
    public appProviderStore: AppProviderStore;
    public notifierStore: NotifierStore;
}
