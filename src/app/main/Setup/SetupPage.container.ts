import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { push } from "connected-react-router";

import { State } from "@MainState";
import { mainUrls } from "@main/routing";
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
        next: (formValues: any) => undefined,
    };
};

const SetupPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPage);

export { SetupPageContainer };
