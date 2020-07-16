import { History } from "history";
import React from "react";
import {
    Route,
    Switch,
    Router,
    Redirect,
    withRouter,
} from "react-router-dom";
// import loadable from "@loadable/component";

// const MainApp = loadable(() => import(/* webpackChunkName: "MainApp" */ "@main/App"));
// const PosApp = loadable(() => import(/* webpackChunkName: "PosApp" */ "@pos/App"));
// const WorkspaceApp = loadable(() => import(/* webpackChunkName: "WsApp" */ "@ws/App"));
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
                    render={() => <MainApp history={history}/>}
                />
                <Route
                    path={appUrls.pos}
                    render={() => <PosApp history={history}/>}
                />
                <Route
                    path={appUrls.workspace}
                    render={() => <WorkspaceApp history={history}/>}
                />

                <Route path="*">
                    <DefaultRouteResolver/>
                </Route>
            </Switch>
        </Router>
    );
};

const DefaultRouteResolver = withRouter(({ location }) => {
    if (location.pathname === appUrls.root) {
        return <Redirect push to={appUrls.workspace}/>;
    }

    return (
        <NotFound/>
    );
});

export { AppRouter };
