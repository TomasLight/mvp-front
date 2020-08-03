import { Translate } from "@utils";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@AdminState";
import { IconVariant } from "@enums";
import { SiteActions } from "@admin/Site/redux";
import {
    SettingsForm,
    ISettingsFormProps,
    ISettingsFormCallProps
} from "./SettingsForm";

interface OwnProps {
    pristine: boolean;
    onSubmit: () => void;
}

const mapStateToProps = (state: State): Omit<ISettingsFormProps, "pristine"> => ({
    faviconOptions: state.site.faviconOptions,
    colorOptions: state.site.colorOptions,
    openGraphImageIsLoading: state.site.openGraphImageIsLoading,
    isSaving: state.site.settingsAreSending,
    domainIsReadonly: state.main.settingsMode === "update",
    buttonText: state.main.settingsMode === "create"
        ? Translate.getString("Дальше")
        : Translate.getString("Сохранить"),
    shouldDisplayStepperLabel: state.main.settingsMode === "create",
});

const mapDispatchToProps = (dispatch: Dispatch): Omit<ISettingsFormCallProps, "onSubmit"> => ({
    onChangeSiteName: (siteName: string) => dispatch(SiteActions.onChangeSiteName({ siteName })),
    onChangeDomain: (domain: string) => dispatch(SiteActions.onChangeDomain({ domain })),
    onChangeFavicon: (faviconVariant: IconVariant) =>
        dispatch(SiteActions.onChangeFavicon({ faviconVariant })),

    onChangeOpenGraphImage: (imageFile: File) =>
        dispatch(SiteActions.onChangeOpenGraphImage({ imageFile, dispatch })),

    onChangeOpenGraphTitle: (title: string) =>
        dispatch(SiteActions.onChangeOpenGraphTitle({ title })),

    onChangeColor: (color: string) => dispatch(SiteActions.onChangeColor({ color })),
});

const SettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsForm);

export { SettingsFormContainer };
