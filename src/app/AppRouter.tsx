import React, { FunctionComponent } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { App as MainApp } from "@main/App";
import { App as PosApp } from "@pos/App";
import { App as WorkspaceApp } from "@ws/App";
import { NotFound } from "./404";

const appUrls = {
    root: "/",
    main: "/main",
    pos: "/pos",
    workspace: "/workspace",
};

const AppRouter: FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path={appUrls.main}
                    component={MainApp}
                />
                <Route
                    path={appUrls.pos}
                    component={PosApp}
                />
                <Route
                    path={appUrls.workspace}
                    component={WorkspaceApp}
                />

                <Route
                    exact
                    path={appUrls.root}
                    component={MainApp}
                />
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export { AppRouter };
