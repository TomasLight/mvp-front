import { ConnectedRouter } from "connected-react-router";
import { History, createBrowserHistory } from "history";
import React, { useMemo } from "react";
import { Provider } from "react-redux";

import { configureApp } from "@config/configureApp";
import { configureMapper, WorkspaceReducerConfig, RootSaga } from "@ws/config";
import { AppProviderContainer } from "./AppProvider.container";
import { PageComponentRouter } from "./routing";

const history: History = createBrowserHistory();
configureMapper();

const App = () => {
    const store = useMemo(() => configureApp(
        history,
        new WorkspaceReducerConfig(),
        new RootSaga()
    ), []);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppProviderContainer>
                    <PageComponentRouter/>
                </AppProviderContainer>
            </ConnectedRouter>
        </Provider>
    );
};

export { App };
