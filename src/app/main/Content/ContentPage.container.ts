import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@MainState";
import { IContactSettingsFormValues } from "./models";
import { ContentActions } from "./redux";
import {
    ContentPage,
    ISetupPageProps,
    ISetupPageCallProps,
} from "./ContentPage";

const mapStateToProps = (state: State): ISetupPageProps => {
    return {
        initialValues: state.content.initialValues,
        showPublishDialog: state.content.showPublishDialog,
        siteUrl: state.site.siteUrl,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ISetupPageCallProps => {
    return {
        loadData: () => dispatch(ContentActions.loadData()),
        submit: (formValues: IContactSettingsFormValues) =>
            dispatch(ContentActions.submitSettings({ formValues })),
        closePublishDialog: () => dispatch(ContentActions.closePublishDialog()),
        redirectToSite: () => dispatch(ContentActions.redirectToSite()),
    };
};

const ContentPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentPage);

export { ContentPageContainer };
