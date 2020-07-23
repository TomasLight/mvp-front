import { NotFound } from "@app/404";
import React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

import { LayoutContainer } from "@main/Layout";
import { NotifierContainer } from "@app/Notifier";
import { HelloPageContainer } from "../Hello";
import { SitePageContainer } from "../Site";
import { DataPageContainer } from "@main/Data";
import { ContentPageContainer } from "../Content";

import { mainUrls } from "./mainUrls";

interface IPageComponentRouterProps {
    hasWorkspace: boolean;
}

type Props = IPageComponentRouterProps & RouteComponentProps;

const PageComponentRouter = (props: Props) => {
    const { location, hasWorkspace } = props;

    if (location.pathname === mainUrls.main) {
        return <Redirect push to={mainUrls.siteSettings}/>;
    }

    if (!hasWorkspace && location.pathname !== mainUrls.siteSettings) {
        return <Redirect push to={mainUrls.siteSettings}/>;
    }

    return (
        <LayoutContainer>
            <Switch>
                {/*<Route
                    exact
                    path={mainUrls.root}
                    component={HelloPageContainer}
                />*/}
                <Route
                    exact
                    path={mainUrls.siteSettings}
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
