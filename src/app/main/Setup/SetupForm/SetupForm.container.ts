import { colorsDictionary } from "@main/Setup/models";
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
            new ColorSelectFieldOption({ id: "color-1", color: colorsDictionary["1"] }),
            new ColorSelectFieldOption({ id: "color-2", color: colorsDictionary["2"] }),
            new ColorSelectFieldOption({ id: "color-3", color: colorsDictionary["3"] }),
            new ColorSelectFieldOption({ id: "color-4", color: colorsDictionary["4"] }),
            new ColorSelectFieldOption({ id: "color-5", color: colorsDictionary["5"] }),
            new ColorSelectFieldOption({ id: "color-6", color: colorsDictionary["6"] }),
            new ColorSelectFieldOption({ id: "color-7", color: colorsDictionary["7"] }),
            new ColorSelectFieldOption({ id: "color-8", color: colorsDictionary["8"] }),
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
