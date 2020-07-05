import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { LayoutContainer } from "@main/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { SetupPage } from "@main/Setup/SetupPage";

import { mainUrls } from "./mainUrls";

const PageComponentRouter: FunctionComponent = () => {
    return (
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path={mainUrls.setup}
                    component={SetupPage}
                />
            </Switch>

            <NotifierContainer/>
        </LayoutContainer>
    );
};

export { PageComponentRouter };
