import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@MainState";
import { ISiteSettingsFormValues } from "@main/Site/models";
import { SiteActions } from "@main/Site/redux";
import {
    SitePage,
    ISitePageProps,
    ISitePageCallProps,
} from "./SitePage";

const mapStateToProps = (state: State): ISitePageProps => ({
    initialValues: state.site.initialValues,
});

const mapDispatchToProps = (dispatch: Dispatch): ISitePageCallProps => ({
    loadData: () => dispatch(SiteActions.loadData()),
    submitSettings: (formValues: ISiteSettingsFormValues) => dispatch(SiteActions.submitSettings({ formValues })),
});

const SitePageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(SitePage);

export { SitePageContainer };
