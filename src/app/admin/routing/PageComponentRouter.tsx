import React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import loadable from "@loadable/component";

import { LayoutContainer } from "@admin/Layout";
import { NotifierContainer } from "@app/Notifier";
import { NotFound } from "@app/404";
const SitePageContainer = loadable(() => import(/* webpackChunkName: "SitePage" */ "../Site/SitePage.container"));
const DataPageContainer = loadable(() => import(/* webpackChunkName: "DataPage" */ "../Data/DataPage.container"));
const ContentPageContainer = loadable(() => import(/* webpackChunkName: "ContentPage" */ "../Content/ContentPage.container"));

import { mainUrls } from "./mainUrls";

interface IPageComponentRouterProps {
    hasWorkspace: boolean;
}

type Props = IPageComponentRouterProps & RouteComponentProps;

const PageComponentRouter = (props: Props) => {
    const { location, hasWorkspace } = props;

    if (!hasWorkspace &&
        location.pathname !== mainUrls.root &&
        location.pathname !== mainUrls.siteSettings
    ) {
        return <Redirect push to={mainUrls.siteSettings}/>;
    }

    return (
        <LayoutContainer>
            <Switch>
                <Route
                    exact
                    path={[
                        mainUrls.root,
                        mainUrls.siteSettings,
                    ]}
                    component={SitePageContainer}
                />
                <Route
                    exact
                    path={mainUrls.dataSettings}
                    component={DataPageContainer}
                />
                <Route
                    exact
                    path={mainUrls.contentSettings}
                    component={ContentPageContainer}
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
