import { History } from "history";
import React from "react";
import { Route, Switch, Router } from "react-router-dom";

import { App as MainApp } from "@main/App";
import { App as PosApp } from "@ws/App";
import { App as WorkspaceApp } from "@ws/App";
import { NotFound } from "./404";

const appUrls = {
    root: "/",
    main: "/main",
    pos: "/pos",
    workspace: "/workspace",
};

interface IAppRouterProps {
    history: History;
}

type Props = IAppRouterProps;

const AppRouter = (props: Props) => {
    const { history } = props;

    return (
        <Router history={history}>
            <Switch>
                <Route
                    path={appUrls.main}
                    render={() => <MainApp history={history} />}
                />
                <Route
                    path={appUrls.pos}
                    render={() => <PosApp history={history} />}
                />
                <Route
                    path={appUrls.workspace}
                    render={() => <WorkspaceApp history={history} />}
                />

                <Route
                    exact
                    path={appUrls.root}
                    render={() => <MainApp history={history} />}
                    // render={() => <WorkspaceApp history={history} />}
                />
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export { AppRouter };
