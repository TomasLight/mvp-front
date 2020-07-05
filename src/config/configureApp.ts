import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { applyMiddleware, compose, createStore, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import { ReducerConfig } from "@config";
import { RootSagaBase } from "@utils/saga";

export function configureApp(
    routeConfig: ReducerConfig,
    rootSaga: RootSagaBase,
    configureMapper?: () => void
): {
    store: Store,
    history: History
} {
    const history: History = createBrowserHistory();

    const composeEnhancer = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
    const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
    );

    const reducer = routeConfig.reducer(history);
    const enhancer = composeEnhancer(middleware);
    const store: Store = createStore(reducer, enhancer);

    rootSaga.run(sagaMiddleware);

    if (typeof configureMapper === "function") {
        configureMapper();
    }

    return { store, history };
}
