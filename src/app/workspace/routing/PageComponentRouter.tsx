import React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

import { NotFound } from "@app/404";
import { mainUrls } from "@admin/routing/mainUrls";
import { LayoutContainer } from "@ws/Layout";
import { NotifierContainer } from "@app/Notifier";
import { MenuPageContainer } from "@ws/Menu";

import { workspaceUrls } from "./workspaceUrls";

interface IPageComponentRouterProps {
    // hasWorkspace: boolean;
}

type Props = IPageComponentRouterProps & RouteComponentProps;

const PageComponentRouter = (props: Props) => {
    const { location/*, hasWorkspace*/ } = props;

    // if (!hasWorkspace) {
    //     return <Redirect push to={mainUrls.siteSettings}/>;
    // }

    if (location.pathname === workspaceUrls.workspace) {
        return <Redirect push to={workspaceUrls.menu}/>;
    }

    return (
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path={workspaceUrls.menu}
                    component={MenuPageContainer}
                />

                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>

            <NotifierContainer/>
        </LayoutContainer>
    );
};

const componentWithRouter = withRouter(PageComponentRouter);
export { componentWithRouter as PageComponentRouter, IPageComponentRouterProps };
