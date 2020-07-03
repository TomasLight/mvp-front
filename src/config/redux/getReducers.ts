import { connectRouter } from "connected-react-router";
import { History } from "history";
import { ReducersMapObject } from "redux";

import { MenuReducer } from "@app/Menu/redux";
import { NotifierReducer } from "@app/Notifier/redux";
import { AppProviderReducer } from "@shared/templates/AppProvider/redux";
import { State } from "@State";

export function getReducers(history: History): ReducersMapObject<State, any> {
    return {
        router: connectRouter(history),
        appProvider: AppProviderReducer,
        notifier: NotifierReducer,

        menu: MenuReducer,
    };
}
