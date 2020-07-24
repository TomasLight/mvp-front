import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { DataActions } from "@admin/Data/redux";
import { State } from "@AdminState";
import {
    DataPage,
    IDataPageProps,
    IDataPageCallProps,
} from "./DataPage";

const mapStateToProps = (state: State): IDataPageProps => ({
    initialValues: state.data.initialValues,
});

const mapDispatchToProps = (dispatch: Dispatch): IDataPageCallProps => ({
    submitSettings: (formValues: any) => dispatch(DataActions.submitSettings({ formValues })),
});

const DataPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(DataPage);

export { DataPageContainer };
export default DataPageContainer;
