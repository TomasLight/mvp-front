import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonState } from "@config";
import {
    AppProvider,
    IAppProviderCallProps,
    IAppProviderProps,
    AppProviderActions,
} from "@shared/templates/AppProvider";

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
