import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@MainState";
import { ContentActions } from "@main/Content/redux";
import {
    ContactSettingsForm,
    IContactSettingsFormProps,
    IContactSettingsFormCallProps
} from "./ContactSettingsForm";

interface OwnProps {
    onSubmit: () => void;
}

const mapStateToProps = (state: State): IContactSettingsFormProps => ({
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): IContactSettingsFormCallProps => ({
    onChangeAddress: (address: string) =>
        dispatch(ContentActions.onChangeAddress({ address })),

    onChangeDeliveryLocationLink: (link: string) =>
        dispatch(ContentActions.onChangeDeliveryLocationLink({ link })),

    onChangeDeliveryTime: (time: string) =>
        dispatch(ContentActions.onChangeDeliveryTime({ time })),

    onChangeFirstBlockText: (text: string) =>
        dispatch(ContentActions.onChangeFirstBlockText({ text })),

    onChangePhone: (phone: string) =>
        dispatch(ContentActions.onChangePhone({ phone })),

    onChangePhoto: (photoFile: File) =>
        dispatch(ContentActions.onChangePhoto({ photoFile, dispatch })),

    onSubmit: () => ownProps.onSubmit(),
});

const ContactSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactSettingsForm);

export { ContactSettingsFormContainer };
