import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CommonState } from "@config";
import { State } from "@PosState";
import {
    AppProvider,
    IAppProviderCallProps,
    IAppProviderProps,
    AppProviderActions,
} from "@shared/templates/AppProvider";

const mapStateToProps = (state: CommonState & State): IAppProviderProps => {
    return {
        appIsInitialized: state.appProvider.initialized,
        themeSettings: state.pos.page.blocks.site.styleColor,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IAppProviderCallProps => {
    return {
        initialize: () => dispatch(AppProviderActions.initializedPosApp()),
    };
};

const AppProviderContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppProvider);

export { AppProviderContainer };
