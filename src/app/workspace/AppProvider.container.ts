import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonState } from "@CommonState";
import { State } from "@WsState";
import { WorkspaceActions } from "@ws/redux";
import {
    AppProvider,
    IAppProviderCallProps,
    IAppProviderProps,
} from "@app/AppProvider";

const mapStateToProps = (state: CommonState & State): IAppProviderProps => {
    return {
        appIsInitialized: state.workspace.appIsInitialized,
        themeSettings: state.workspace.site.color,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IAppProviderCallProps => {
    return {
        initialize: () => dispatch(WorkspaceActions.loadSettings()),
    };
};

const AppProviderContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppProvider);

export { AppProviderContainer };
