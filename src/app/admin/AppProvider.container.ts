import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@AdminState";
import { MainActions } from "@admin/redux";
import {
    AppProvider,
    IAppProviderCallProps,
    IAppProviderProps,
} from "@app/AppProvider";

const mapStateToProps = (state: State): IAppProviderProps => {
    return {
        appIsInitialized: state.main.appIsInitialized,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IAppProviderCallProps => {
    return {
        initialize: () => {
            const action = MainActions.checkUserAuthorization();
            action.actions.push(MainActions.checkWorkspace());
            dispatch(action);
        },
    };
};

const AppProviderContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppProvider);

export { AppProviderContainer };
