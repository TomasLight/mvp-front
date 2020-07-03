import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { Layout } from "@app/Layout/Layout";
import { NotifierContainer } from "@app/Notifier/Notifier.container";
import { MenuPage, MenuPageContainer } from "@app/Menu";

import { appUrls } from "./appUrls";

const PageComponentRouter: FunctionComponent = () => {
    return (
        <Layout>
            <Switch>
                <Route
                    exact
                    path={[
                        appUrls.rootPath,
                        appUrls.menu,
                    ]}
                    component={MenuPageContainer}
                />
            </Switch>

            <NotifierContainer/>
        </Layout>
    );
};

export { PageComponentRouter };
