import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { push } from "connected-react-router";

import { State } from "@MainState";
import { mainUrls } from "@main/routing";
import { ISetupFormValues } from "@main/Setup/models";
import { SetupActions } from "@main/Setup/redux";
import {
    SetupPage,
    ISetupPageProps,
    ISetupPageCallProps,
} from "./SetupPage";

const mapStateToProps = (state: State): ISetupPageProps => {
    return {
        initialValues: state.setup.initialValues,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ISetupPageCallProps => {
    return {
        redirectToBack: () => dispatch(push(mainUrls.hello)),
        next: (formValues: ISetupFormValues) => dispatch(SetupActions.goToStepTwo({ formValues })),
    };
};

const SetupPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPage);

export { SetupPageContainer };
