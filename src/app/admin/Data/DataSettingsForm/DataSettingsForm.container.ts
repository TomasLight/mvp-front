import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@AdminState";
import {
    DataSettingsForm,
    IDataSettingsFormProps,
    IDataSettingsFormCallProps
} from "./DataSettingsForm";

interface OwnProps {
    onSubmit: () => void;
}

const mapStateToProps = (state: State): IDataSettingsFormProps => ({
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): IDataSettingsFormCallProps => ({
        onSubmit: () => ownProps.onSubmit(),
    });

const DataSettingsFormContainer: ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSettingsForm);

export { DataSettingsFormContainer };
