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
    onSubmit: () => void;
}

const mapStateToProps = (state: State): ISettingsFormProps => ({
    faviconOptions: state.site.faviconOptions,
    colorOptions: state.site.colorOptions,
    domainIsReadonly: state.main.settingsMode === "update",
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): ISettingsFormCallProps => ({
    onChangeSiteName: (siteName: string) => dispatch(SiteActions.onChangeSiteName({ siteName })),
    onChangeDomain: (domain: string) => dispatch(SiteActions.onChangeDomain({ domain })),
    onChangeFavicon: (faviconVariant: IconVariant) =>
        dispatch(SiteActions.onChangeFavicon({ faviconVariant })),

    onChangeOpenGraphImage: (imageFile: File) =>
        dispatch(SiteActions.onChangeOpenGraphImage({ imageFile, dispatch })),

    onChangeOpenGraphTitle: (title: string) =>
        dispatch(SiteActions.onChangeOpenGraphTitle({ title })),

    onChangeColor: (color: string) => dispatch(SiteActions.onChangeColor({ color })),

    onSubmit: () => ownProps.onSubmit(),
});

const SettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsForm);

export { SettingsFormContainer };
