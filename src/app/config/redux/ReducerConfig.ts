import { createReducers } from "app-redux-utils";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { ReducersMapObject, Reducer } from "redux";

import { NotifierReducer } from "@app/Notifier";
import { AppProviderReducer } from "@app/AppProvider";
import { UserReducer } from "@app/redux";

export class ReducerConfig<TState = any> {
    private readonly stateReducers: ReducersMapObject<TState, any>;

    constructor(stateReducers: ReducersMapObject<TState, any>) {
        this.stateReducers = stateReducers;
    }

    reducer(history: History): Reducer {
        return createReducers(() => ({
            router: connectRouter(history),
            appProvider: AppProviderReducer,
            notifier: NotifierReducer,
            user: UserReducer,
            ...this.stateReducers,
        }));
    }
}
