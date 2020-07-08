import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { LayoutContainer } from "@pos/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { MenuPageContainer } from "@pos/Menu";

import { posUrls } from "./posUrls";

const PageComponentRouter: FC = () => {
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
