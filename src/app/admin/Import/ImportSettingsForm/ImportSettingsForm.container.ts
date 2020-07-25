import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@AdminState";
import {
    ImportSettingsForm,
    IImportSettingsFormProps,
    IImportSettingsFormCallProps
} from "./ImportSettingsForm";

interface OwnProps {
    onSubmit: () => void;
}

const mapStateToProps = (state: State): IImportSettingsFormProps => ({
    isSaving: state.import.settingsAreSending,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): IImportSettingsFormCallProps => ({
        onSubmit: () => ownProps.onSubmit(),
    });

const ImportSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImportSettingsForm);

export { ImportSettingsFormContainer };
