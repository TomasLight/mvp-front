import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonState } from "@CommonState";
import {
    AppProvider,
    IAppProviderCallProps,
    IAppProviderProps,
    AppProviderActions,
} from "@app/AppProvider";

const mapStateToProps = (state: CommonState): IAppProviderProps => {
    return {
        appIsInitialized: state.appProvider.initialized,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IAppProviderCallProps => {
    return {
        initialize: () => dispatch(AppProviderActions.initializedMainApp()),
    };
};

const AppProviderContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppProvider);

export { AppProviderContainer };
