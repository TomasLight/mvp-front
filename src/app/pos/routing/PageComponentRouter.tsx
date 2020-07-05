import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { Layout } from "@pos/Layout/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { MenuPageContainer } from "@pos/Menu";

import { appUrls } from "./appUrls";

const PageComponentRouter: FunctionComponent = () => {
    return (
        <Layout>
            <Switch>
                <Route
                    // exact
                    path={appUrls.menu}
                    component={MenuPageContainer}
                />
            </Switch>

            <NotifierContainer/>
        </Layout>
    );
};

export { PageComponentRouter };
