import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonState } from "@config";
import { IconVariant } from "@enums";
import { SetupActions } from "@main/Setup/redux";
import { ColorSelectFieldOption, IconSelectFieldOption } from "@select/types";
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
        colorOptions: [
            new ColorSelectFieldOption({ id: "color-1", color: "#ED6E33" }),
            new ColorSelectFieldOption({ id: "color-2", color: "#1EB980" }),
            new ColorSelectFieldOption({ id: "color-3", color: "#045D56" }),
            new ColorSelectFieldOption({ id: "color-4", color: "#5D1049" }),
            new ColorSelectFieldOption({ id: "color-5", color: "#03A9F4" }),
            new ColorSelectFieldOption({ id: "color-6", color: "#01579B" }),
            new ColorSelectFieldOption({ id: "color-7", color: "#43A047" }),
            new ColorSelectFieldOption({ id: "color-8", color: "#2979FF" }),
        ],
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): ISetupFormCallProps => {
    return {
        onChangeSiteName: (siteName: string) => dispatch(SetupActions.onChangeSiteName({ siteName })),
        onChangeDomain: (domain: string) => dispatch(SetupActions.onChangeDomain({ domain })),
        onChangeFavicon: (faviconVariant: IconVariant) =>
            dispatch(SetupActions.onChangeFavicon({ faviconVariant })),

        onChangeOpenGraphImage: (imageFile: File) =>
            dispatch(SetupActions.onChangeOpenGraphImage({ imageFile, dispatch })),

        onChangeOpenGraphTitle: (title: string) =>
            dispatch(SetupActions.onChangeOpenGraphTitle({ title })),

        onChangeColor: (color: string) => dispatch(SetupActions.onChangeColor({ color })),

        onSubmit: () => ownProps.onSubmit(),
    };
};

const SetupFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupForm);

export { SetupFormContainer };
