import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@MainState";
import { IconVariant } from "@enums";
import { SiteActions } from "@main/Site/redux";
import {
    SiteSettingsForm,
    ISiteSettingsFormProps,
    ISiteSettingsFormCallProps
} from "./SiteSettingsForm";

interface OwnProps {
    onSubmit: () => void;
}

const mapStateToProps = (state: State): ISiteSettingsFormProps => ({
    faviconOptions: state.site.faviconOptions,
    colorOptions: state.site.colorOptions,
    domainIsReadonly: state.main.settingsMode === "update",
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): ISiteSettingsFormCallProps => ({
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

const SiteSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteSettingsForm);

export { SiteSettingsFormContainer };
