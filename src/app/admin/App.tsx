import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import React, { useMemo } from "react";
import { Provider } from "react-redux";

import { configureApp } from "@config/configureApp";
import { configureMapper, MainReducerConfig, RootSaga } from "@admin/config";
import { AppProviderContainer } from "./AppProvider.container";
import { PageComponentRouterContainer } from "./routing";

const history: History = createBrowserHistory();
configureMapper();

const App = () => {

    const store = useMemo(() => configureApp(
        history,
        new MainReducerConfig(),
        new RootSaga()
    ), []);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppProviderContainer>
                    <PageComponentRouterContainer/>
                </AppProviderContainer>
            </ConnectedRouter>
        </Provider>
    );
};

export { App };
export default App;
