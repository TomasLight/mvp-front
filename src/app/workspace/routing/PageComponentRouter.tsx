import { NotFound } from "@app/404";
import React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

import { LayoutContainer } from "@ws/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { MenuPageContainer } from "@ws/Menu";

import { workspaceUrls } from "./workspaceUrls";

type Props = RouteComponentProps;

const PageComponentRouter = (props: Props) => {
    const { location} = props;

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
export { componentWithRouter as PageComponentRouter };
