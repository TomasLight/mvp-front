import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { LayoutContainer } from "@main/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { SetupPageContainer } from "@main/Setup";

import { mainUrls } from "./mainUrls";

const PageComponentRouter: FC = () => {
    return (
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path={mainUrls.setup}
                    component={SetupPageContainer}
                />
            </Switch>

            <NotifierContainer/>
        </LayoutContainer>
    );
};

export { PageComponentRouter };
