import { ComponentType } from "react";
import { connect } from "react-redux";

import { State } from "@AdminState";
import { Translate } from "@utils/translates";
import {
    ImportSettingsForm,
    IImportSettingsFormProps,
} from "./ImportSettingsForm";

interface OwnProps {
    pristine: boolean;
    onSubmit: () => void;
    onSkip: () => void;
}

const mapStateToProps = (state: State): Omit<IImportSettingsFormProps, "pristine"> => ({
    isSaving: state.import.settingsAreSending,
    buttonText: Translate.getString("Импортировать"),
    isOptionalStep: state.main.settingsMode === "create",
});

const ImportSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps
)(ImportSettingsForm);

export { ImportSettingsFormContainer };
