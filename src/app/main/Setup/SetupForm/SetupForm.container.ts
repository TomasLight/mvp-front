import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonState } from "@config";
import { IconVariant } from "@enums";
import { IconSelectFieldOption } from "@select/types";

import {
    SetupForm,
    ISetupFormProps,
    ISetupFormCallProps
} from "./SetupForm";

interface OwnProps {
    onSubmit: () => void;
}

const mapStateToProps = (state: CommonState): ISetupFormProps => {
    return {
        faviconOptions: [
            new IconSelectFieldOption({ id: IconVariant.Coffee, title: "" }),
            new IconSelectFieldOption({ id: IconVariant.PepperHot, title: "" }),
            new IconSelectFieldOption({ id: IconVariant.PizzaSlice, title: "" }),
        ],
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): ISetupFormCallProps => {
    return {
        onSubmit: () => ownProps.onSubmit(),
    };
};

const SetupFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupForm);

export { SetupFormContainer };
