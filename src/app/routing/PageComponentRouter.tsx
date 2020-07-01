import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";

import { Layout } from "@app/Layout/Layout";
import { NotifierContainer } from "@app/Notifier/Notifier.container";
import { MenuPage } from "@app/Menu/MenuPage";

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
                    component={MenuPage}
                />
            </Switch>

            <NotifierContainer/>
        </Layout>
    );
};

export { PageComponentRouter };
