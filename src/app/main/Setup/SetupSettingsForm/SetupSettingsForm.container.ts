import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@MainState";
import { IconVariant } from "@enums";
import { SetupActions } from "@main/Setup/redux";
import {
    SetupSettingsForm,
    ISetupSettingsFormProps,
    ISetupSettingsFormCallProps
} from "./SetupSettingsForm";

interface OwnProps {
    onSubmit: () => void;
}

const mapStateToProps = (state: State): ISetupSettingsFormProps => ({
    faviconOptions: state.setup.faviconOptions,
    colorOptions: state.setup.colorOptions,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): ISetupSettingsFormCallProps => {
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

const SetupSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupSettingsForm);

export { SetupSettingsFormContainer };
