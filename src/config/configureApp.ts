import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { applyMiddleware, compose, createStore, Reducer, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import { RootSagaBase } from "@utils/saga";
import { configureMapper } from "./mapper";

export function configureApp<TReducers>(
    makeReducer: (history: History) => Reducer<TReducers>,
    rootSaga: RootSagaBase
): {
    store: Store<TReducers>,
    history: History
} {
    const history: History = createBrowserHistory();

    const composeEnhancer = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
    const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
    );

    const reducer = makeReducer(history);
    const enhancer = composeEnhancer(middleware);
    const store: Store<TReducers> = createStore(reducer, enhancer);

    rootSaga.run(sagaMiddleware);

    configureMapper();

    return { store, history };
}
