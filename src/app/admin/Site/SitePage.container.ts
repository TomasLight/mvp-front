import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@AdminState";
import { ISiteSettingsFormValues } from "@admin/Site/models";
import { SiteActions } from "@admin/Site/redux";
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
export default SitePageContainer;
