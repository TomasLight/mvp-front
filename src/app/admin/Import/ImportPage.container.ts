import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ImportActions } from "@admin/Import/redux";
import { State } from "@AdminState";
import {
    ImportPage,
    IDataPageProps,
    IDataPageCallProps,
} from "./ImportPage";

const mapStateToProps = (state: State): IDataPageProps => ({
    initialValues: state.import.initialValues,
});

const mapDispatchToProps = (dispatch: Dispatch): IDataPageCallProps => ({
    submitSettings: (formValues: any) => dispatch(ImportActions.submitSettings({ formValues })),
    skipImport: () => dispatch(ImportActions.skipImport()),
});

const ImportPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImportPage);

export { ImportPageContainer };
export default ImportPageContainer;
