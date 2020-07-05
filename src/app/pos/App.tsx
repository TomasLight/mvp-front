import { ConnectedRouter } from "connected-react-router";
import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";

import { configureApp } from "@config";
import { configureMapper, PosReducerConfig, RootSaga } from "@pos/config";
import { AppProviderContainer } from "./AppProvider.container";
import { PageComponentRouter } from "./routing/PageComponentRouter";

export const { store, history } = configureApp(
    new PosReducerConfig(),
    new RootSaga(),
    configureMapper
);

const App: FunctionComponent = () => {
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
