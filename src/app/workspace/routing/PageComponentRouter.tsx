import React from "react";
import { Route, Switch } from "react-router-dom";

import { LayoutContainer } from "@ws/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { MenuPageContainer } from "@ws/Menu";

import { workspaceUrls } from "./workspaceUrls";

const PageComponentRouter = () => {
    return (
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path={workspaceUrls.menu}
                    component={MenuPageContainer}
                />
            </Switch>

            <NotifierContainer/>
        </LayoutContainer>
    );
};

export { PageComponentRouter };
