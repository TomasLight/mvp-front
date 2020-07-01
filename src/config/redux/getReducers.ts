import { connectRouter } from "connected-react-router";
import { History } from "history";
import { ReducersMapObject } from "redux";

import { State } from "@State";
import { NotifierReducer } from "@app/Notifier/redux/Notifier.reducer";
import { AppProviderReducer } from "@shared/templates/AppProvider/redux/AppProvider.reducer";

export function getReducers(history: History): ReducersMapObject<State, any> {
    return {
        router: connectRouter(history),
        appProviderStore: AppProviderReducer,
        notifierStore: NotifierReducer,
    };
}
