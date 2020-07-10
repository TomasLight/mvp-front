import React from "react";
import { Route, Switch } from "react-router-dom";

import { LayoutContainer } from "@ws/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { MenuPageContainer } from "@ws/Menu";

import { posUrls } from "./posUrls";

const PageComponentRouter = () => {
    return (
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path={posUrls.menu}
                    component={MenuPageContainer}
                />
            </Switch>

            <NotifierContainer/>
        </LayoutContainer>
    );
};

export { PageComponentRouter };
