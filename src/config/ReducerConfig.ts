import { createReducers } from "app-redux-utils";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { ReducersMapObject, Reducer } from "redux";

import { NotifierReducer } from "@shared/templates/Notifier";
import { AppProviderReducer } from "@shared/templates/AppProvider";

export class ReducerConfig<TState = any> {
    private readonly stateReducers: ReducersMapObject<TState, any>;

    constructor(stateReducers: ReducersMapObject<TState, any>) {
        this.stateReducers = stateReducers;
    }

    public reducer(history: History): Reducer {
        return createReducers(() => ({
            router: connectRouter(history),
            appProvider: AppProviderReducer,
            notifier: NotifierReducer,
            ...this.stateReducers,
        }));
    }
}
