import { RootSaga } from "app-saga-utils";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, compose, createStore, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import { ReducerConfig } from "./redux/ReducerConfig";

export function configureApp(
    history: History,
    reducerConfig: ReducerConfig,
    rootSaga: RootSaga
): Store {

    const composeEnhancer = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
    const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
    );

    const reducer = reducerConfig.reducer(history);
    const enhancer = composeEnhancer(middleware);
    const store: Store = createStore(reducer, enhancer);

    rootSaga.run(sagaMiddleware);

    return store;
}
