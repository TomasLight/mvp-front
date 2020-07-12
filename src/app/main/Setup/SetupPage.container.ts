import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { push } from "connected-react-router";

import { State } from "@MainState";
import { mainUrls } from "@main/routing";
import { ISiteSettingsFormValues } from "@main/Setup/models";
import { SetupActions } from "@main/Setup/redux";
import {
    SetupPage,
    ISetupPageProps,
    ISetupPageCallProps,
} from "./SetupPage";

const mapStateToProps = (state: State): ISetupPageProps => ({
    setupStep: state.setup.setupStep,
    initialValues: state.setup.initialValues,
});

const mapDispatchToProps = (dispatch: Dispatch): ISetupPageCallProps => ({
    redirectToBack: () => dispatch(push(mainUrls.hello)),
    goToStepTwo: (formValues: ISiteSettingsFormValues) => dispatch(SetupActions.goToStepTwo({ formValues })),
    goToStepThree: (formValues: any) => dispatch(SetupActions.goToStepThree({ formValues })),
});

const SetupPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPage);

export { SetupPageContainer };
