import { RouterState } from "connected-react-router";

import { IAppState } from "@utils/redux/IAppState";
import { NotifierStore } from "@app/Notifier/redux/Notifier.store";
import { AppProviderStore } from "@shared/templates/AppProvider/redux/AppProvider.store";

export class State implements IAppState {
    public router: RouterState;
    public appProviderStore: AppProviderStore;
    public notifierStore: NotifierStore;
}
