import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React, { FC, useMemo } from "react";
import { Provider } from "react-redux";

import { configureApp } from "@config";
import { configureMapper, MainReducerConfig, RootSaga } from "@main/config";
import { AppProviderContainer } from "./AppProvider.container";
import { PageComponentRouter } from "./routing";

configureMapper();

interface IAppProps {
    history: History;
}

type Props = IAppProps;

const App: FC<Props> = (props) => {
    const { history } = props;

    const store = useMemo(() => configureApp(
        history,
        new MainReducerConfig(),
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
