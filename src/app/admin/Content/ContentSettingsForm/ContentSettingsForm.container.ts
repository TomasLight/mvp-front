import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@AdminState";
import { ContentActions } from "@admin/Content/redux";
import { Translate } from "@utils";
import {
    ContentSettingsForm,
    IContentSettingsFormProps,
    IContentSettingsFormCallProps
} from "./ContentSettingsForm";

interface OwnProps {
    pristine: boolean;
    onSubmit: () => void;
}

const mapStateToProps = (state: State): Omit<IContentSettingsFormProps, "pristine"> => ({
    buttonText: state.main.settingsMode === "create"
        ? Translate.getString("Опубликовать сайт")
        : Translate.getString("Сохранить"),
    photoIsLoading: state.content.photoIsLoading,
    isSaving: state.content.contentIsSaving,
});

const mapDispatchToProps = (dispatch: Dispatch): Omit<IContentSettingsFormCallProps, "onSubmit"> => ({
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
});

const ContentSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentSettingsForm);

export { ContentSettingsFormContainer };
