import { IconVariant } from "@enums";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonState } from "@config";
import {
    SetupPage,
    ISetupPageProps,
    ISetupPageCallProps,
} from "./SetupPage";

const mapStateToProps = (state: CommonState): ISetupPageProps => {
    return {
        initialValues: {
            favicon: IconVariant.Coffee,
        },
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ISetupPageCallProps => {
    return {
        next: (formValues: any) => undefined,
    };
};

const SetupPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPage);

export { SetupPageContainer };
