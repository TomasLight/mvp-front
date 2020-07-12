import React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

import { LayoutContainer } from "@main/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { workspaceUrls } from "@ws/routing";
import { HelloPageContainer } from "../Hello";
import { SetupPageContainer } from "../Setup";
import { ContentPageContainer } from "../Content";

import { mainUrls } from "./mainUrls";

interface IPageComponentRouterProps {
    hasWorkspaces: boolean;
}

type Props = IPageComponentRouterProps & RouteComponentProps;

const PageComponentRouter = (props: Props) => {
    const { hasWorkspaces, location } = props;

    if (hasWorkspaces && location.pathname === mainUrls.hello) {
        return <Redirect push to={workspaceUrls.menu}/>;
    }

    return (
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path={mainUrls.hello}
                    component={HelloPageContainer}
                    // component={ContentPageContainer}
                />
                <Route
                    exact
                    path={mainUrls.setup}
                    component={SetupPageContainer}
                />
                <Route
                    exact
                    path={mainUrls.content}
                    component={ContentPageContainer}
                />
            </Switch>

            <NotifierContainer/>
        </LayoutContainer>
    );
};

const componentWithRouter = withRouter(PageComponentRouter);
export { componentWithRouter as PageComponentRouter, IPageComponentRouterProps };
