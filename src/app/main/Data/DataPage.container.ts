import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { DataActions } from "@main/Data/redux";
import { State } from "@MainState";
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
