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
}

const mapStateToProps = (state: State): Omit<IImportSettingsFormProps, "pristine"> => ({
    isSaving: state.import.settingsAreSending,
    buttonText: state.main.settingsMode === "create"
        ? Translate.getString("Дальше")
        : Translate.getString("Импортировать"),
    shouldDisplayStepperLabel: state.main.settingsMode === "create",
});

const ImportSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps
)(ImportSettingsForm);

export { ImportSettingsFormContainer };
