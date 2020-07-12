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
        siteUrl: state.setup.siteUrl,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ISetupPageCallProps => {
    return {
        submit: (formValues: IContactSettingsFormValues) =>
            dispatch(ContentActions.submit({ formValues })),
        closePublishDialog: () => dispatch(ContentActions.closePublishDialog()),
        redirectToSite: () => dispatch(ContentActions.redirectToSite()),
    };
};

const ContentPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentPage);

export { ContentPageContainer };
