import { RouterState } from "connected-react-router";

import { MenuStore } from "@app/Menu/redux";
import { NotifierStore } from "@app/Notifier/redux";
import { AppProviderStore } from "@shared/templates/AppProvider/redux";
import { IAppState } from "@utils/redux";

export class State implements IAppState {
    public router: RouterState;
    public appProvider: AppProviderStore;
    public notifier: NotifierStore;

    public menu: MenuStore;
}
