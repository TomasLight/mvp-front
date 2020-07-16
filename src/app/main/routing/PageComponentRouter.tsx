import { NotFound } from "@app/404";
import React from "react";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

import { LayoutContainer } from "@main/Layout";
import { NotifierContainer } from "@shared/templates/Notifier";
import { HelloPageContainer } from "../Hello";
import { SitePageContainer } from "../Site";
import { DataPageContainer } from "@main/Data";
import { ContentPageContainer } from "../Content";

import { mainUrls } from "./mainUrls";

type Props = RouteComponentProps;

const PageComponentRouter = (props: Props) => {
    const { location } = props;

    if (location.pathname === mainUrls.main) {
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
export { componentWithRouter as PageComponentRouter };
