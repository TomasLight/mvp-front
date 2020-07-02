import { ComponentType } from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import { State } from "@State";
import {
    AppProvider,
    IAppProviderCallProps,
    IAppProviderProps,
    AppProviderActions,
} from "@shared/templates/AppProvider";

const mapStateToProps = (state: State): IAppProviderProps => {
    return {
        appIsInitialized: state.appProviderStore.initialized,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IAppProviderCallProps => {
    return {
        initialize: () => dispatch(AppProviderActions.initializedApp()),
    };
};

const AppProviderContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppProvider);

export { AppProviderContainer };
